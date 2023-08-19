import { User } from './user';
import { Plate } from './plate';
export declare class Order {
    id: number;
    user: User;
    plates: Plate[];
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}
