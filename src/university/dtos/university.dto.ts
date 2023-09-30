import { ApiProperty } from '@nestjs/swagger';

export class UniversityDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    institutionName: string;

    @ApiProperty({ nullable: true })
    creationDate: string;

    @ApiProperty({ nullable: true })
    institutionType: string;

    @ApiProperty({ nullable: true })
    universityType: string;

    @ApiProperty({ nullable: true })
    regon: string;

    @ApiProperty({ nullable: true })
    nip: string;

    @ApiProperty({ nullable: true })
    krs: string;

    @ApiProperty({ nullable: true })
    website: string;

    @ApiProperty({ nullable: true })
    streetAddress: string;

    @ApiProperty({ nullable: true })
    streetNumber: string;

    @ApiProperty({ nullable: true })
    postalCode: string;

    @ApiProperty({ nullable: true })
    city: string;
}
