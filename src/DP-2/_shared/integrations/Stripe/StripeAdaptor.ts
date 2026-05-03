import type { PaymentService } from "../../../Payment/PaymentService";
import type { PaymentData, TransactionData } from "../../../Payment/types";
import { BadRequest } from "../../core/types/responses/BadRequest";
import { Failure } from "../../core/types/responses/Failure";
import { NotFound } from "../../core/types/responses/NotFound";
import { Success } from "../../core/types/responses/Success";
import type { Stripe } from "./stripe";

export class StripeAdaptor implements PaymentService {
  constructor(private stripe: Stripe) {}
  makePayment(paymentData: Omit<PaymentData, "id" | "created">): Success<PaymentData> | BadRequest | Failure {
    const { cardNumber, amount, paymentMethod, userEmail, userFullName, userPhone } = paymentData;
    try {
      const sessionResult = this.stripe.createCheckoutSession({ cardNumber, amount, paymentMethod });

      if (sessionResult.type === "StripeCardError") return new BadRequest(sessionResult.message);

      const { id, code, type, currency, amount_total, created: dateInMs } = sessionResult;
      return new Success({
        statusCode: code,
        data: {
          id,
          userFullName,
          userEmail,
          userPhone,
          paymentMethod: type,
          cardNumber,
          amount: amount_total,
          currency,
          created: new Date(dateInMs),
        },
      });
    } catch (error) {
      return new Failure((error as Error).message);
    }
  }

  getTransaction(transactionId: string): Success<TransactionData> | NotFound | Failure {
    try {
      const transaction = this.stripe.retrieveTransaction(transactionId);
      if (!transaction) return new NotFound();

      const data: TransactionData = {
        id: transaction.id,
        cardNumber: transaction.cardNumber,
        paymentMethod: transaction.type,
        amount: transaction.amount,
        currency: transaction.currency,
        created: new Date(transaction.created),
      };
      return new Success({
        statusCode: 200,
        data,
      });
    } catch (error) {
      return new Failure((error as Error).message);
    }
  }
}
