import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export default async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get("Authorization");
  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized, No bearer token" }),
      {
        status: 401,
      }
    );
  }
  const token = bearerToken.split(" ")[1];
  if (!token) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized, No token" }),
      {
        status: 401,
      }
    );
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    await jose.jwtVerify(token, secret);
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized, Invalid token" }),
      {
        status: 401,
      }
    );
  }
}

export const config = {
  matcher: ["/api/auth/me"],
};
