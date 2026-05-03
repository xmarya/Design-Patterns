import path from "path";
import readJsonFile from "../../../../shared/utils/fileSystem/readJsonFile";
import type { StripePaymentError, StripePaymentSuccess, StripeTransactionData, StripPaymentMethods } from "./types";
import type { File } from "../../../../shared/utils/fileSystem/fs";
import { fileURLToPath } from "url";
export class Stripe {
  private readonly declinedCard = 4000000000009995;
  private transactionsLog: File;
  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.transactionsLog = { dirname: __dirname, filename: "stripe-transactions-log.json" };
  }
  createCheckoutSession({ cardNumber, amount, paymentMethod }: { cardNumber: number; amount: number; paymentMethod: StripPaymentMethods }): StripePaymentSuccess | StripePaymentError {
    const shortCardNumberLength = cardNumber.toString().length < 16;
    const longCardNumberLength = cardNumber.toString().length > 16;
    if (shortCardNumberLength || longCardNumberLength || cardNumber === this.declinedCard)
      return { code: 400, type: "StripeCardError", message: "This card number is not accepted, please use a different card number" };

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

  retrieveTransaction(transactionId: string): StripeTransactionData | null {
    const transactions = readJsonFile<StripeTransactionData>(this.transactionsLog);
    if (!transactions.length) return null;

    const result = transactions.filter(({ id }) => id === transactionId);
    if (!result[0]?.id) return null;

    return result[0];
  }
}
