import { ClassConstructor, plainToInstance } from 'class-transformer';

export class MapperUtil {
  private constructor() {}

  static convertTo<T>(cls: ClassConstructor<T>, instance: any): T {
    return plainToInstance(cls, instance, {
      excludeExtraneousValues: true,
    });
  }
}
