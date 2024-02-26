import { createDecorator } from '@toss/nestjs-aop';
import { TRANSACTIONAL_DECORATOR } from './transactional-decorator';

export const Transactional = () => {
  return createDecorator(TRANSACTIONAL_DECORATOR);
};
