import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import * as jose from "jose";
import bcrypt from "bcrypt";
import validator from "validator";
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const errors: string[] = [];
    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Invalid email",
      },
      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: "Invalid password",
      },
    ];
    validationSchema.forEach((validation) => {
      if (!validation.valid) {
        errors.push(validation.errorMessage);
      }
    });
    if (errors.length) {
      return res.status(400).json({ errorMessages: errors[0] });
    }

    const checkUserWithEmail: any = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const isMatch = await bcrypt.compare(password, checkUserWithEmail.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "user , Email or password incorrect" });
    }
    if (!checkUserWithEmail) {
      return res.status(401).json({ message: "Email or password incorrect" });
    }
    const token = await new jose.SignJWT({ email: checkUserWithEmail.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    res.status(200).json({ hello: token });
  }

  return res.status(400).json({ message: "Bad request" });
}
