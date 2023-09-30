-- CreateIndex
CREATE FULLTEXT INDEX `Universities_institutionName_idx` ON `Universities`(`institutionName`);

-- CreateIndex
CREATE FULLTEXT INDEX `Universities_institutionType_idx` ON `Universities`(`institutionType`);

-- CreateIndex
CREATE FULLTEXT INDEX `Universities_universityType_idx` ON `Universities`(`universityType`);

-- CreateIndex
CREATE FULLTEXT INDEX `Universities_website_idx` ON `Universities`(`website`);

-- CreateIndex
CREATE FULLTEXT INDEX `Universities_streetAddress_idx` ON `Universities`(`streetAddress`);

-- CreateIndex
CREATE FULLTEXT INDEX `Universities_streetNumber_idx` ON `Universities`(`streetNumber`);

-- CreateIndex
CREATE FULLTEXT INDEX `Universities_postalCode_idx` ON `Universities`(`postalCode`);

-- CreateIndex
CREATE FULLTEXT INDEX `Universities_city_idx` ON `Universities`(`city`);
