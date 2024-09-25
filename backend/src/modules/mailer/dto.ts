import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator"

export class MessageDto{
    @ApiProperty()
    to:string
    @ApiProperty()
    message:string
}