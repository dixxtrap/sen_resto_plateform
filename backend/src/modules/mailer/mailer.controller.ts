import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { EmailerService } from './mailer.service';
import { UserDto } from 'src/typeorm/user.entity';

@Controller('mailer')
@ApiTags('mailer')
export class EmailerController {
  constructor(private readonly mailService: EmailerService) {}

  @Post('register')
  async register(@Body() createUserDto: UserDto) {
    // Créez l'utilisateur ici et obtenez le token de confirmation

    const token = 'some-generated-token'; // Générer un token de confirmation
    await this.mailService.sendUserConfirmation({ user: createUserDto, token });

    return 'Utilisateur enregistré avec succès!';
  }
}
