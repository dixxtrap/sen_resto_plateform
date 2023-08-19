/// <reference types="multer" />
import { PlateService } from './plate.service';
import { PlateDto } from 'src/dto/plate.dto';
export declare class PlateController {
    private service;
    constructor(service: PlateService);
    getS(): Promise<import("../../typeorm").Plate[]>;
    get(id: number): Promise<import("../../typeorm").Plate>;
    getByRestaurant(id: number): Promise<import("../../typeorm").Plate[]>;
    create(item: PlateDto): Promise<import("../../typeorm").Plate>;
    update(id: number, item: PlateDto): Promise<{
        data: PlateDto;
        id: number;
        resaturant: import("../../typeorm").Restaurant;
        restaurantId: number;
        name: string;
        file: import("../../typeorm").PlateFile;
        description: string;
        tag: import("../../typeorm").Tag[];
        price: number;
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
        cookingTime: number;
        reduction: number;
        updatedAt: Date;
        createdAt: Date;
    }>;
    addPhoto(file: Express.Multer.File, id: number): Promise<import("../../typeorm").PlateFile>;
}
