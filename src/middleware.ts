import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const verify = req.cookies.get("token");
  const url = req.url;

  if (!verify && (url.includes("/pregame") || url.includes("/game"))) {
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (verify && url === "http://localhost:3000/") {
    return NextResponse.redirect("http://localhost:3000/pregame");
  }
}
