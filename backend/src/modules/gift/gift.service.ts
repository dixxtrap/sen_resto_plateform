import { Repository } from "typeorm/repository/Repository";

import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";
import { Gift } from "src/typeorm/gift.entity";

export class GiftService{
    constructor(@InjectRepository(Gift) private gift:Repository<Gift>){}
}
