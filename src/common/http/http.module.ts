import { Global, Module } from '@nestjs/common';
import { HttpClient } from './http-client';
import { GotHttpClient } from './got-http-client';

@Global()
@Module({
  providers: [{ provide: HttpClient, useClass: GotHttpClient }],
  exports: [HttpClient],
})
export class HttpModule {}
