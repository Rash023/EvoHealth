-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "domain" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "tag" TEXT NOT NULL DEFAULT '';
