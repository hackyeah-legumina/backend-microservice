import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    message: string;

    @ApiProperty()
    isAssistant: boolean;
}
