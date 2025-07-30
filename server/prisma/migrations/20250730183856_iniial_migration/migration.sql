-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Card" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Column" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "boardId" TEXT,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Board" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "public"."User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Card_name_key" ON "public"."Card"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Column_name_key" ON "public"."Column"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Board_title_key" ON "public"."Board"("title");

-- AddForeignKey
ALTER TABLE "public"."Card" ADD CONSTRAINT "Card_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "public"."Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Column" ADD CONSTRAINT "Column_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Board" ADD CONSTRAINT "Board_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
