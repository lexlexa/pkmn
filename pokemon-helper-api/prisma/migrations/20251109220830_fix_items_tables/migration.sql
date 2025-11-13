/*
  Warnings:

  - You are about to drop the column `image_id` on the `items_filament` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "items_filament" DROP COLUMN "image_id",
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "items_images" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
