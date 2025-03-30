-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "creatorId" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_creatorId_roomName_key" ON "Document"("creatorId", "roomName");
