-- AlterTable
ALTER TABLE "filaments" ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6),
    "price" INTEGER NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items_categories" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50),

    CONSTRAINT "items_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items_filament" (
    "id" SERIAL NOT NULL,
    "filament_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "image_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "items_filament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items_images" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "image_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "items_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "items_categories_slug_key" ON "items_categories"("slug");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "type" FOREIGN KEY ("category_id") REFERENCES "items_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items_filament" ADD CONSTRAINT "type_filaments" FOREIGN KEY ("filament_id") REFERENCES "filaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items_filament" ADD CONSTRAINT "type_items" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items_images" ADD CONSTRAINT "type" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
