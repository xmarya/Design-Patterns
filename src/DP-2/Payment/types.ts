import type { StripPaymentMethods } from "../_shared/integrations/Stripe/types";

export type PaymentData = {
  id: string;
  cardNumber:number
  userFullName: string;
  userPhone: number;
  userEmail: string;
  amount: number;
  paymentMethod: StripPaymentMethods;
  created: Date;
};

export type TransactionData = Pick<PaymentData, "id" | "amount" | "paymentMethod" | "cardNumber" | "created">;
