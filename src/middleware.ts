import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const verify = req.cookies.get("token");
  const url = req.url;

  if (!verify && (url.includes("/pregame") || url.includes("/game"))) {
    return NextResponse.redirect("http://10.13.10.14:3000/");
  }
  if (verify && url === "http://10.13.10.14:3000/") {
    return NextResponse.redirect("http://10.13.10.14:3000/pregame");
  }
}
