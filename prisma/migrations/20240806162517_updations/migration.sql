/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Column` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_columnId_fkey";

-- DropIndex
DROP INDEX "Column_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Column_id_key" ON "Column"("id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
