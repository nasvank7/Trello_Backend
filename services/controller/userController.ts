import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import client from "../connection/db";
import { generateJwt } from "../services/generateJWT";
const prisma = new PrismaClient();
const userController = {
  PostLogin: async (req: Request, res: Response) => {
    try {
      const { email, password, username } = req.body;

      if (!email && !username) {
        return res.status(400).json({ message: "Username or Email is required" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email || '' },
            { username: username || '' }
          ]
        }
      });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateJwt(user.username || user.email)
      console.log(token);

      if (token) {
        res.cookie('jwt', token, {
          httpOnly: true, 
          secure: process.env.NODE_ENV === 'production', 
          sameSite: 'strict', // 'strict', 'lax', or 'none'
        });
      }

      res.status(200).json({ message: "Login successful", user,token:token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  PostRegister: async (req: Request, res: Response): Promise<void> => {
    const { email, password, confirmPassword, username } = req.body;
    console.log(req.body);

    try {
      // Check if email and password are provided
      if (!email || !password || !confirmPassword) {
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
          confirmPassword: hashedPassword
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
