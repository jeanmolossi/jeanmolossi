-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "slug" TEXT NOT NULL,
    "cover" TEXT,
    "content" TEXT NOT NULL,
    "reading_time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(3),

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Article_slug_created_at_idx" ON "Article"("slug", "created_at" DESC);

-- CreateIndex
CREATE INDEX "Tag_slug_created_at_idx" ON "Tag"("slug", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
