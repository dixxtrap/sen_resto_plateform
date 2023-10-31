import { OnModuleInit } from '@nestjs/common';
import { TagDto } from 'src/dto/tag.dto';
import { Tag } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class TagService implements OnModuleInit {
    private repos;
    constructor(repos: Repository<Tag>);
    onModuleInit(): void;
    createTags(): Promise<void>;
    getS(): Promise<Tag[]>;
    get(id: number): Promise<Tag>;
    create(item: TagDto): Promise<Tag>;
    update(item: TagDto): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
}
