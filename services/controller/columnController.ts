import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import client from "../connection/db";
import { generateJwt } from "../services/generateJWT";
const prisma = new PrismaClient();

const columnController = {
  getAllColumns: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const columns = await prisma.column.findMany({
        where: { userId: parseInt(userId) },
        include: { tasks: true },
      });
      res.json(columns);
    } catch (error) {}
  },
  createColumn: async (req: Request, res: Response) => {
    try {
      const { id, title, userId } = req.body;
      console.log(req.body);

      const column = await prisma.column.create({
        data: { id, title, userId },
      });
      res.json(column);
    } catch (error) {}
  },
  editColumnName: async (req: Request, res: Response) => {
    try {
      const { columnId } = req.params;
      const { title } = req.body;
      const updatedColumn = await prisma.column.update({
        where: { id: parseInt(columnId) },
        data: { title },
      });
      console.log(updatedColumn);

      res.json(updatedColumn);
    } catch (error) {}
  },
};
export default columnController;
