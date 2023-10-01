-- CreateTable
CREATE TABLE `Application` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `studiesFieldId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'TO_BE_PAID', 'PAID', 'REJECTED', 'ACCEPTED', 'ACCEPTED_RESERVE', 'MORE_INFO_NEEDED') NOT NULL,
    `calculatedScore` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_studiesFieldId_fkey` FOREIGN KEY (`studiesFieldId`) REFERENCES `StudiesField`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
