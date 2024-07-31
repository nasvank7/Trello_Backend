import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import client from "../connection/db";
const prisma = new PrismaClient();
const userController = {
  PostLogin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
    } catch (error) {}
  },
  PostRegister: async (req: Request, res: Response): Promise<void> => {
    const { email, password, username } = req.body;
    console.log(req.body);

    try {
      // Check if email and password are provided
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required." });
        return;
      }

      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
};

export default userController;
