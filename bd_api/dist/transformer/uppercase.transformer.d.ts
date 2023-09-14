import { ValueTransformer } from 'typeorm';
export declare class UppercaseTransformer implements ValueTransformer {
    to(value?: string): string;
    from(value?: string): string;
}
