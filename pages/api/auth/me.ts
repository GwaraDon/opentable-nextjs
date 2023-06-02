import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"];
  if (!bearerToken) {
    res.status(401).json({ errorMessage: "Unauthorized, No bearer token" });
    return;
  }
  const token = bearerToken.split(" ")[1];
  if (!token) {
    res.status(401).json({ errorMessage: "Unauthorized, No token" });
    return;
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    await jose.jwtVerify(token, secret);
  } catch (e) {
    res.status(401).json({ errorMessage: "Unauthorized, Invalid token" });
    return;
  }
  const decoded = jwt.decode(token);
  //   if (!decoded.email || decoded.email === null) {
  //     res.status(401).json({ errorMessage: "Unauthorized, email" });
  //     return;
  //   }
  if (decoded.email === null) {
    res.status(401).json({ errorMessage: "Unauthorized, null" });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      email: decoded.email,
    },
    select: {
      id: true,
      email: true,
      first_name: true,
      last_name: true,
      city: true,
      phone: true,
    },
  });

  res.json({ user });
}
