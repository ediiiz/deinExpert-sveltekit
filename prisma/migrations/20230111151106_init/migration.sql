-- CreateTable
CREATE TABLE "Product" (
    "articleId" TEXT NOT NULL PRIMARY KEY,
    "webcode" BIGINT NOT NULL,
    "product_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "priceHistoryId" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productArticleId" TEXT,
    CONSTRAINT "PriceHistory_productArticleId_fkey" FOREIGN KEY ("productArticleId") REFERENCES "Product" ("articleId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Price" (
    "priceId" TEXT NOT NULL PRIMARY KEY,
    "price" REAL NOT NULL,
    "branchName" TEXT NOT NULL,
    "branchId" INTEGER NOT NULL,
    "priceHistoryId" TEXT NOT NULL,
    CONSTRAINT "Price_priceHistoryId_fkey" FOREIGN KEY ("priceHistoryId") REFERENCES "PriceHistory" ("priceHistoryId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_articleId_key" ON "Product"("articleId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_webcode_key" ON "Product"("webcode");
