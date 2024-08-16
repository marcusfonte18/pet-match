/*
  Warnings:

  - Added the required column `specie` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pet" ADD COLUMN     "specie" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "preference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "breed" TEXT,
    "specie" TEXT,
    "ageMin" INTEGER,
    "ageMax" INTEGER,

    CONSTRAINT "preference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "preference_userId_key" ON "preference"("userId");

-- AddForeignKey
ALTER TABLE "preference" ADD CONSTRAINT "preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
