import { plainToInstance } from 'class-transformer';

export class MapperUtil {
  private constructor() {}

  static convertTo<T>(cls: { new (): T }, instance: any): T {
    return plainToInstance<T, any>(cls, instance, {
      excludeExtraneousValues: true,
    });
  }
}
