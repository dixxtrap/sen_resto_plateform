import { TagService } from './tag.service';
import { TagDto } from 'src/dto/tag.dto';
export declare class TagController {
    private service;
    constructor(service: TagService);
    getS(): Promise<import("../../typeorm").Tag[]>;
    get(id: number): Promise<import("../../typeorm").Tag>;
    create(item: TagDto): Promise<import("../../typeorm").Tag>;
    update(id: number, item: TagDto): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
}
