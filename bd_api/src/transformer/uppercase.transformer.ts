import { ValueTransformer } from 'typeorm';

export class UppercaseTransformer implements ValueTransformer {
  to(value?: string): string {
    return value != null ? value.toUpperCase() : value;
  }

  from(value?: string): string {
    return value != null ? value.toUpperCase() : value;
  }
}
