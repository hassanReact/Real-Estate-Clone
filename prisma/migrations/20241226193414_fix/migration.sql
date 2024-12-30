/*
  Warnings:

  - You are about to drop the `PropertyFeatures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `Url` on the `PropertyImage` table. All the data in the column will be lost.
  - You are about to drop the column `PropertyId` on the `PropertyLocation` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - Added the required column `url` to the `PropertyImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `PropertyLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PropertyFeatures_propertyId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PropertyFeatures";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PropertyFeature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "parkingSpots" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "hasSwimmingPool" BOOLEAN NOT NULL,
    "hasGardenYard" BOOLEAN NOT NULL,
    "hasBalcony" BOOLEAN NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "PropertyFeature_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "Contact_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("email", "id", "name", "phone", "propertyId") SELECT "email", "id", "name", "phone", "propertyId" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE UNIQUE INDEX "Contact_propertyId_key" ON "Contact"("propertyId");
CREATE TABLE "new_PropertyImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "PropertyImage_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PropertyImage" ("id", "propertyId") SELECT "id", "propertyId" FROM "PropertyImage";
DROP TABLE "PropertyImage";
ALTER TABLE "new_PropertyImage" RENAME TO "PropertyImage";
CREATE TABLE "new_PropertyLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "landmark" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "PropertyLocation_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PropertyLocation" ("city", "id", "landmark", "region", "state", "streetAddress", "zip") SELECT "city", "id", "landmark", "region", "state", "streetAddress", "zip" FROM "PropertyLocation";
DROP TABLE "PropertyLocation";
ALTER TABLE "new_PropertyLocation" RENAME TO "PropertyLocation";
CREATE UNIQUE INDEX "PropertyLocation_propertyId_key" ON "PropertyLocation"("propertyId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("avatarUrl", "createdAt", "email", "id", "lastName") SELECT "avatarUrl", "createdAt", "email", "id", "lastName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "PropertyFeature_propertyId_key" ON "PropertyFeature"("propertyId");
