import { CompanyDto } from './company.dto';
import { UserDto } from './user.dto';
export declare class CompanyUserDto {
    companyId: number;
    userId: number;
}
export declare class CompanyUserDtoUpdate extends CompanyUserDto {
    id: number;
    isActive: boolean;
}
export declare class CompanyUserDtoGet extends CompanyUserDto {
    isActive: boolean;
    company: CompanyDto;
    User: UserDto;
}
