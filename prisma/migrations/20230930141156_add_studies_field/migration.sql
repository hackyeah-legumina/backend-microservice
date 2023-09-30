-- CreateTable
CREATE TABLE `StudiesField` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `universityId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudiesFieldScoresHistory` (
    `id` VARCHAR(191) NOT NULL,
    `score` VARCHAR(191) NOT NULL,
    `maxScore` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `studiesFieldId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudiesField` ADD CONSTRAINT `StudiesField_universityId_fkey` FOREIGN KEY (`universityId`) REFERENCES `Universities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudiesFieldScoresHistory` ADD CONSTRAINT `StudiesFieldScoresHistory_studiesFieldId_fkey` FOREIGN KEY (`studiesFieldId`) REFERENCES `StudiesField`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
