import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from 'src/typeorm/story.entity';
import { Repository } from 'typeorm/repository/Repository';
@Injectable()
export class StoryService {
    constructor(@InjectRepository(Story) private repos: Repository<Story>) { }
    create (){}
}
