/*
  Warnings:

  - Added the required column `isAssistant` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ChatMessage` ADD COLUMN `isAssistant` BOOLEAN NOT NULL;
