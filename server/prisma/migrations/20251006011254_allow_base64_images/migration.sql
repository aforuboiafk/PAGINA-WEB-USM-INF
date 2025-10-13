/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Gallery` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."News" ALTER COLUMN "url" SET DEFAULT '',
ALTER COLUMN "date" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_url_key" ON "public"."Gallery"("url");
