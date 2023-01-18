/*
  Warnings:

  - You are about to drop the column `product_name` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "articleId" TEXT NOT NULL PRIMARY KEY,
    "webcode" TEXT NOT NULL,
    "productName" TEXT NOT NULL
);
INSERT INTO "new_Product" ("articleId", "webcode") SELECT "articleId", "webcode" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_articleId_key" ON "Product"("articleId");
CREATE UNIQUE INDEX "Product_webcode_key" ON "Product"("webcode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
