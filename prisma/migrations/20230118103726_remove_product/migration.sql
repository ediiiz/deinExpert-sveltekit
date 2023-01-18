/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `articleId` on the `Product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PriceHistory" (
    "priceHistoryId" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productArticleId" TEXT,
    CONSTRAINT "PriceHistory_productArticleId_fkey" FOREIGN KEY ("productArticleId") REFERENCES "Product" ("webcode") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PriceHistory" ("date", "priceHistoryId", "productArticleId") SELECT "date", "priceHistoryId", "productArticleId" FROM "PriceHistory";
DROP TABLE "PriceHistory";
ALTER TABLE "new_PriceHistory" RENAME TO "PriceHistory";
CREATE TABLE "new_Product" (
    "webcode" TEXT NOT NULL PRIMARY KEY,
    "productName" TEXT NOT NULL
);
INSERT INTO "new_Product" ("productName", "webcode") SELECT "productName", "webcode" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_webcode_key" ON "Product"("webcode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
