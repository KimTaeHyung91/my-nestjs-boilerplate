import { assert, beforeAll, describe, it } from 'vitest';
import { Test } from '@nestjs/testing';
import { HttpModule } from '../../../src/common/http/http.module';
import { HttpClient } from '../../../src/common/http/http-client';
import { GotHttpClient } from '../../../src/common/http/got-http-client';
import { Url } from '../../../src/common/http/url';
import { Expose } from 'class-transformer';
import { get } from 'lodash';

class TodoResponse {
  @Expose()
  userId: number;

  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  completed: boolean;
}

describe('got client get method request test', () => {
  let httpClient: HttpClient;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
    }).compile();

    httpClient = module.get<GotHttpClient>(HttpClient);
  });

  it('should be defined, httpClient', () => {
    assert.isDefined(httpClient);
  });

  it('https://jsonplaceholder.typicode.com - get 요청 후 JSON 객체로 응답을 받아야된다.', async () => {
    //given
    const url = Url.builder()
      .host('https://jsonplaceholder.typicode.com')
      .path('/todos/1')
      .build();

    //when
    const response = await httpClient.baseUrl(url).get().execute();

    //then
    assert.isObject(response);
    assert.equal(get(response, 'userId'), 1);
    assert.equal(get(response, 'id'), 1);
    assert.equal(get(response, 'title'), 'delectus aut autem');
    assert.equal(get(response, 'completed'), false);
  });

  it('https://jsonplaceholder.typicode.com - get 요청 후 특정 객체로 응답을 받아야된다.', async () => {
    //given
    const url = Url.builder()
      .host('https://jsonplaceholder.typicode.com')
      .path('/todos/1')
      .build();

    //when
    const response = await httpClient
      .baseUrl(url)
      .get()
      .executeTo(TodoResponse);

    //then
    assert.instanceOf(response, TodoResponse);
    assert.equal(response.userId, 1);
    assert.equal(response.id, 1);
    assert.equal(response.title, 'delectus aut autem');
    assert.equal(response.completed, false);
  });
});
