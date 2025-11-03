/*
  Warnings:

  - Added the required column `images` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Gallery" ADD COLUMN     "images" TEXT NOT NULL;
