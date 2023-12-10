import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const verify = req.cookies.get("token");
  const url = req.url;

  if (!verify && (url.includes("/pregame") || url.includes("/game"))) {
    return NextResponse.redirect("http://10.13.2.8:3001/");
  }
  if (verify && url === "http://localhost:3001/") {
    return NextResponse.redirect("http://10.13.2.8:3001/pregame");
  }
}
