-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "articleId" TEXT NOT NULL PRIMARY KEY,
    "webcode" TEXT NOT NULL,
    "product_name" TEXT NOT NULL
);
INSERT INTO "new_Product" ("articleId", "product_name", "webcode") SELECT "articleId", "product_name", "webcode" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_articleId_key" ON "Product"("articleId");
CREATE UNIQUE INDEX "Product_webcode_key" ON "Product"("webcode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
