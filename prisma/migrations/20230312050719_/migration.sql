/*
  Warnings:

  - You are about to drop the column `creataTime` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `creataTime`,
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
