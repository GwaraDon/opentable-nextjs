import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["Authorization"] as string;

  const token = bearerToken.split(" ")[1];

  const decoded = jwt.decode(token) as { email: string };
  if (!decoded.email) {
    res.status(401).json({ errorMessage: "Unauthorized, email" });
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
