import React, { useEffect } from "react";
import * as PIXI from "pixi.js";
import io from "socket.io-client";
import { Press_Start_2P } from "next/font/google";
import { fetchCurrentUser } from "../(handlers)/requestHandler";
import Cookies from "js-cookie";

let p1score = 0;
let p2score = 0;
let gamestarted = false;

interface Game {
  gameId: string;
  ballSpeed: number;
  ballDirection: {
    x: number;
    y: number;
  };
  ballPosition: {
    x: number;
    y: number;
  };
  player1: {
    intraLogin: string;
    nickname: string;
    position: {
      x: number;
      y: number;
    };
    score: number;
  };
  player2: {
    intraLogin: string;
    nickname: string;
    position: {
      x: number;
      y: number;
    };
    score: number;
  };
  paddle: {
    width: number;
    height: number;
  };
  ball: {
    radius: number;
  };
  result: number;
  startedAt: Date;
  finishedAt: Date;
  status: string;
}

const Font = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

const textStyle = new PIXI.TextStyle({
  fontFamily: Font.style.fontFamily,
  fontSize: 50,
  fill: 0xdddddd,
  align: "center",
});

function initBall(app: PIXI.Application) {
  const ballgfx = new PIXI.Graphics();
  ballgfx.beginFill(0xdddddd);
  ballgfx.drawCircle(0, 0, 12);
  ballgfx.endFill();
  const texture = app.renderer.generateTexture(ballgfx);
  const ball = new PIXI.Sprite(texture);
  ballgfx.destroy();
  ball.anchor.set(0.5);
  ball.x = app.screen.width / 2;
  ball.y = app.screen.height / 2;
  ball.eventMode = "dynamic";
  return ball;
}

function initPaddle(app: PIXI.Application) {
  const paddlegfx = new PIXI.Graphics();
  paddlegfx.beginFill(0xdddddd);
  paddlegfx.drawRect(0, 0, 20, 125);
  paddlegfx.endFill();
  const texture = app.renderer.generateTexture(paddlegfx);
  const paddle = new PIXI.Sprite(texture);
  paddlegfx.destroy();
  paddle.anchor.set(0.5);
  paddle.eventMode = "dynamic";
  return paddle;
}

function initText(app: PIXI.Application, score: number) {
  const text = new PIXI.Text(score, {
    fontFamily: Font.style.fontFamily,
    fontSize: 50,
    fill: 0xdddddd,
    align: "center",
  });
  text.anchor.set(0.5);
  text.blendMode = PIXI.BLEND_MODES.MULTIPLY;
  return text;
}

function stageAssets(app: PIXI.Application, assets: any) {
  app.stage.addChild(assets.Ball);
  app.stage.addChild(assets.Paddle1);
  app.stage.addChild(assets.Paddle2);
  app.stage.addChild(assets.Score1);
  app.stage.addChild(assets.Score2);
  app.stage.addChild(assets.halfline);
}

function initAssets(app: PIXI.Application) {
  const halfline = new PIXI.Graphics();
  halfline.beginFill(0xdddddd);
  halfline.drawRect(0, 0, 5, app.screen.height);
  halfline.endFill();
  const ball = initBall(app);
  const paddle1 = initPaddle(app);
  const paddle2 = initPaddle(app);
  const score1 = initText(app, p1score);
  const score2 = initText(app, p2score);
  const Waiting = new PIXI.Text("Waiting for opponent", textStyle);
  Waiting.anchor.set(0.5);
  Waiting.x = app.screen.width / 2;
  Waiting.y = app.screen.height / 2;

  score1.x = app.screen.width / 4;
  score1.y = 50;
  score2.x = (app.screen.width / 4) * 3;
  score2.y = 50;

  paddle1.x = 50;
  paddle1.y = app.screen.height / 2;

  paddle2.x = app.screen.width - 50;
  paddle2.y = app.screen.height / 2;

  halfline.x = app.screen.width / 2 - 2.5;
  halfline.y = 0;
  halfline.alpha = 0.5;

  return {
    Ball: ball,
    Paddle1: paddle1,
    Paddle2: paddle2,
    Score1: score1,
    Score2: score2,
    halfline: halfline,
    Waiting: Waiting,
  };
}

function initPixi() {
  const app = new PIXI.Application({
    width: 1200,
    height: 800,
    backgroundColor: 0xf05454,
    antialias: true,
  });
  app.stage.hitArea = app.screen;
  app.stage.eventMode = "static";
  const pixiContainer = document.getElementById("pixi-container");
  pixiContainer?.appendChild(app.view as any);
  return {
    App: app,
    Container: pixiContainer,
  };
}

async function getUser() {
  const user = await fetchCurrentUser().then((res) => res);
  return user;
}

const runGame = async (isMounted: boolean) => {
  if (!isMounted) return;

  try {
    const pixi = initPixi();
    const assets = initAssets(pixi.App);
    const user = await getUser();
    let game: Game;
    const token = Cookies.get("token");

    const socket = io("http://localhost:3001/game", {
      query: { Username: user.intraLogin },
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on("WaitingForOpponent", (data) => {
      console.log("waiting for opponent");
      pixi.App.stage.addChild(assets.Waiting);
    });

    socket.on("gameReady", (data) => {
      console.log("game ready");
      gamestarted = true;
      game = data;
      pixi.App.stage.removeChild(assets.Waiting);
      stageAssets(pixi.App, assets);
    });
    socket.on("gameUpdate", (data) => {
      console.log("update received");
      game = data;
      assets.Ball.x = game.ballPosition.x;
      assets.Ball.y = game.ballPosition.y;
      assets.Paddle1.y = game.player1.position.y;
      assets.Paddle2.y = game.player2.position.y;
      assets.Score1.text = game.player1.score.toString();
      assets.Score2.text = game.player2.score.toString();
    });
    socket.on("gameWin", (data) => {
      if (data === user.intraLogin) {
        console.log("game win");
        gamestarted = false;
        assets.Score1.text = game.player1.score.toString();
        assets.Score2.text = game.player2.score.toString();
        const winText = new PIXI.Text("You win !", textStyle);
        winText.anchor.set(0.5);
        winText.x = pixi.App.screen.width / 2;
        winText.y = pixi.App.screen.height / 2;
        winText.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        pixi.App.stage.addChild(winText);
        pixi.App.stage.removeChild(assets.Ball);
        pixi.App.stage.removeChild(assets.halfline);
      } else {
        console.log("game lose");
        gamestarted = false;
        assets.Score1.text = game.player1.score.toString();
        assets.Score2.text = game.player2.score.toString();
        const loseText = new PIXI.Text("You lose !", textStyle);
        loseText.anchor.set(0.5);
        loseText.x = pixi.App.screen.width / 2;
        loseText.y = pixi.App.screen.height / 2;
        loseText.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        pixi.App.stage.addChild(loseText);
        pixi.App.stage.removeChild(assets.Ball);
        pixi.App.stage.removeChild(assets.halfline);
      }
    });
    socket.on("gameFinished", (data) => {
      console.log("game finish");
      gamestarted = false;
      socket.disconnect();
      pixi.App.destroy();
      window.location.replace("/pregame");
    });
    pixi.App.stage.on("pointermove", (e) => {
      if (!gamestarted) return;
      socket.emit("move", {
        gameId: game.gameId,
        username: user.intraLogin,
        position: {
          x: e.global.x,
          y: e.global.y,
        },
      });
    });
    pixi.App.ticker.add((delta) => {
      if (!gamestarted) return;
    });
    return () => {
      console.log("game unmounted");
      socket.disconnect();
      pixi.App.destroy();
    };
  } catch (error) {
    console.error("Error fetching user:", error);
  }
  return () => {};
};

const PixiComponent = () => {
  let isMounted = false;
  useEffect(() => {
    console.log("game mounted");
    let clean: (() => void) | undefined;
    runGame(isMounted).then((cleanFn) => {
      clean = cleanFn;
    });
    isMounted = true;
    return () => {
      if (clean) {
        clean();
      }
    };
  }, []);

  return <div id="pixi-container" className="box-shadow"></div>;
};

export default PixiComponent;
