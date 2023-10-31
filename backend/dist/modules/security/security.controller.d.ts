import { SecurityService } from './security.service';
import { LoginDto } from './dto/loginDto';
import { Request, Response } from 'express';
export declare class SecurityController {
    private service;
    constructor(service: SecurityService);
    login(body: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    profile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    signout(res: Response): Promise<Response<any, Record<string, any>>>;
}
