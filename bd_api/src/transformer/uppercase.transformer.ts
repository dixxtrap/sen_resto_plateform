import { ValueTransformer } from 'typeorm';

export class UppercaseTransformer implements ValueTransformer {
  to(value: string): string {
    return value.toUpperCase();
  }

  from(value: string): string {
    return value.toUpperCase();
  }
}
