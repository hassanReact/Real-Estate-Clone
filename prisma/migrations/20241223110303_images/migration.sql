/*
  Warnings:

  - Added the required column `propertyId` to the `PropertyImage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PropertyImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Url" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "PropertyImage_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PropertyImage" ("Url", "id") SELECT "Url", "id" FROM "PropertyImage";
DROP TABLE "PropertyImage";
ALTER TABLE "new_PropertyImage" RENAME TO "PropertyImage";
CREATE UNIQUE INDEX "PropertyImage_propertyId_key" ON "PropertyImage"("propertyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
