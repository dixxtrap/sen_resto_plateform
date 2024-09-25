import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { EmailerService } from './mailer.service';
import { UserDto } from 'src/typeorm/user.entity';
import { MessageDto } from './dto';

@Controller('info')
@ApiTags('info')
export class EmailerController {
  constructor(private readonly mailService: EmailerService) {}
  @Post('message')
  async sendSms(@Body() body: MessageDto) {
    return this.mailService.sendMessage(body)
  }
  @Post('register')
  async register(@Body() createUserDto: UserDto) {
    // Créez l'utilisateur ici et obtenez le token de confirmation

    const token = 'some-generated-token'; // Générer un token de confirmation
    await this.mailService.sendUserConfirmation({ user: createUserDto, token });

    return 'Utilisateur enregistré avec succès!';
  }
}
