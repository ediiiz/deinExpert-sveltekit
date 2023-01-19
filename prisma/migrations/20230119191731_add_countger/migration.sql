-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "webcode" TEXT NOT NULL PRIMARY KEY,
    "productName" TEXT NOT NULL,
    "image" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Product" ("image", "productName", "webcode") SELECT "image", "productName", "webcode" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_webcode_key" ON "Product"("webcode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
