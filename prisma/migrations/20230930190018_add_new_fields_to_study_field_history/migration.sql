/*
  Warnings:

  - You are about to alter the column `score` on the `StudiesFieldScoresHistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `maxScore` on the `StudiesFieldScoresHistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `year` on the `StudiesFieldScoresHistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `peopleApplied` to the `StudiesFieldScoresHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peopleMax` to the `StudiesFieldScoresHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StudiesFieldScoresHistory` ADD COLUMN `peopleApplied` INTEGER NOT NULL,
    ADD COLUMN `peopleMax` INTEGER NOT NULL,
    MODIFY `score` DOUBLE NOT NULL,
    MODIFY `maxScore` DOUBLE NOT NULL,
    MODIFY `year` INTEGER NOT NULL;
