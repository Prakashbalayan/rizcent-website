/*
  Warnings:

  - Added the required column `services` to the `QuoteRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuoteRequest" ADD COLUMN     "services" TEXT NOT NULL;
