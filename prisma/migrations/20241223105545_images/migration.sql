-- CreateTable
CREATE TABLE "PropertyFeatures" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "parkintSlots" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "hasSwimmingPool" BOOLEAN NOT NULL,
    "hasGardenYard" BOOLEAN NOT NULL,
    "hasBalcony" BOOLEAN NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "PropertyFeatures_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PropertyLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "landmark" TEXT NOT NULL,
    "PropertyId" INTEGER NOT NULL,
    CONSTRAINT "PropertyLocation_PropertyId_fkey" FOREIGN KEY ("PropertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PropertyImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyFeatures_propertyId_key" ON "PropertyFeatures"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyLocation_PropertyId_key" ON "PropertyLocation"("PropertyId");
