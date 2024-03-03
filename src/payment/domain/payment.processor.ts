export const PaymentProcessor = Symbol('PaymentProcessor');

export interface PaymentProcessor {
  execute(): Promise<string>;
}
