-- AlterTable
ALTER TABLE
    "filaments"
ADD
    COLUMN "in_stock" BOOLEAN NOT NULL DEFAULT false;