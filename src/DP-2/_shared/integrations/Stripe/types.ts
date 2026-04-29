export type StripPaymentMethods = "card" | "paypal" | "samsung_pay"

export type StripePaymentSuccess = {
  code: number;
  id: string;
  type: StripPaymentMethods;
  mode:"payment"
  currency:string,
  amount_total:number
  created: number; // ms
};

export type StripePaymentError = {
  type: "StripeCardError";
  code: number;
  message: string;
};

export type StripeTransactionData = {
  id: string;
  created: number; // ms
  currency: string;
  type: StripPaymentMethods;
  amount: number;
};
