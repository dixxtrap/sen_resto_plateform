/// <reference types="multer" />
import { PlateDto } from 'src/dto/plate.dto';
import { FileDocument, Plate, PlateFile, Tag, TagPlate } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class PlateService {
    private repos;
    private plateFileRepos;
    private tagPlateRepos;
    private docRepos;
    constructor(repos: Repository<Plate>, plateFileRepos: Repository<PlateFile>, tagPlateRepos: Repository<TagPlate>, docRepos: Repository<FileDocument>);
    getS(): Promise<Plate[]>;
    get(id: number): Promise<Plate>;
    getByRestaurant(id: number): Promise<Plate[]>;
    create(data: PlateDto): Promise<Plate>;
    update(data: PlateDto): Promise<{
        data: PlateDto;
        id: number;
        resaturant: import("src/typeorm").Restaurant;
        restaurantId: number;
        name: string;
        file: PlateFile;
        description: string;
        tag: Tag[];
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
    addPhoto(id: number, file: Express.Multer.File): Promise<PlateFile>;
}
