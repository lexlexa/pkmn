/*
  Warnings:

  - Made the column `name` on table `items_categories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "items_categories" ADD COLUMN     "category_parent_id" INTEGER,
ALTER COLUMN "name" SET NOT NULL;
