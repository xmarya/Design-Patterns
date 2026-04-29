import type { StripePaymentError, StripePaymentSuccess, StripPaymentMethods } from "./types";

export class Stripe {
  private readonly declinedCard = 4000000000009995;
  createCheckoutSession({ cardNumber, amount, paymentMethod }: { cardNumber: number; amount: number; paymentMethod: StripPaymentMethods }): StripePaymentSuccess | StripePaymentError {
    const shortCardNumberLength = cardNumber.toString().length < 16;
    if ( shortCardNumberLength || cardNumber === this.declinedCard) return { code: 400, type: "StripeCardError", message: "This card number is not accepted, please use a different card number" };

    return {
      code: 200,
      id: Math.random().toString().substring(2),
      type: paymentMethod,
      mode: "payment",
      amount_total: amount,
      currency: "SAR",
      created: new Date().getTime(),
    };
  }
}

