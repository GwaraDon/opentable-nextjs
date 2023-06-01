import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, phoneNumber, city, password } =
      req.body;
    const validationSchema = [
      {
        valid: validator.isLength(firstName, { min: 1, max: 20 }),
        errorMessage: "First Name must be between 1 and 20 characters",
      },
      {
        valid: validator.isLength(lastName, { min: 1, max: 20 }),
        errorMessage: "Last Name must be between 1 and 20 characters",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Invalid Email",
      },

      {
        valid: validator.isMobilePhone(phoneNumber),
        errorMessage: "Invalid Phone Number",
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: "City is invalid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is invalid",
      },
    ];
    const errors: string[] = [];
    validationSchema.forEach((validation) => {
      if (!validation.valid) {
        errors.push(validation.errorMessage);
      }
    });
    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }
    const prisma = new PrismaClient();
    const userEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userEmail) {
      return res.status(400).json({ errorMessage: "Email already exists" });
    }
    res.status(200).json({ hello: "world" });
  }
}
