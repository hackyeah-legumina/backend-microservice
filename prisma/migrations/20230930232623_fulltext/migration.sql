-- CreateIndex
CREATE FULLTEXT INDEX `Universities_institutionName_institutionType_universityType__idx` ON `Universities`(`institutionName`, `institutionType`, `universityType`, `website`, `streetAddress`, `streetNumber`, `postalCode`, `city`);
