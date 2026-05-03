import type { StripPaymentMethods } from "../_shared/integrations/Stripe/types";

export type PaymentData = {
  id: string;
  cardNumber:number
  userFullName: string;
  userPhone: number;
  userEmail: string;
  amount: number;
  currency:string,
  paymentMethod: StripPaymentMethods;
  created: Date;
};

export type TransactionData = Pick<PaymentData, "id" | "amount" | "paymentMethod" | "cardNumber" | "currency" | "created">;
