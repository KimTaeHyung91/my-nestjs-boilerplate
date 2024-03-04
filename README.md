# My NestJS Boilerplate

## Library

| type           | lib name          | version |
|----------------|-------------------|---------|
| Runtime        | nodeJS            | v20     |
| Package Manage | pnpm              |         |
| ORM            | mikro-orm         | v6      |
| DB             | postgresql        |         |
| Compiler       | swc               |         |
| Test           | vitest            |         |
| Container      | docker            |         |
| Test Container | testcontainers    |         |
| Mapper         | class-transformer |         |
| Validator      | class-validator   |         |
| UUID           | uuid              |         |
| Object Control | lodash            |         |
| Date           | js-joda/core      |         |
| AOP            | @nestjs-toss/aop  |         |

## Build

```shell
pnpm build
```

## Run

```shell
pnpm start
```

## Module

### User

유저 모듈

- 등록
- 조회

---

### Auth + JWT

인증 모듈

- accessToken 발급
- refreshToken 발급
- 인증 by accessToken
- 재발급 by refreshToken

---

### Payment

결제 모듈

- 결제
    - 카카오
    - 네이버
    - 토스
- 구독

설계

- 전략패턴 적용 

