-- CreateTable
CREATE TABLE "filament_brands" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "filament_brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filament_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "brand_id" INTEGER NOT NULL,

    CONSTRAINT "filament_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filaments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "code" VARCHAR(20),
    "color" VARCHAR(7),
    "type_id" INTEGER NOT NULL,

    CONSTRAINT "filaments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "filament_brand_name_key" ON "filament_brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "filament_types_name_key" ON "filament_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "filaments_name_key" ON "filaments"("name");

-- AddForeignKey
ALTER TABLE "filament_types" ADD CONSTRAINT "brand" FOREIGN KEY ("brand_id") REFERENCES "filament_brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "filaments" ADD CONSTRAINT "type" FOREIGN KEY ("type_id") REFERENCES "filament_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

