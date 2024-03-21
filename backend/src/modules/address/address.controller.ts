import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('address')
@Controller('address')
export class AddressController {}
