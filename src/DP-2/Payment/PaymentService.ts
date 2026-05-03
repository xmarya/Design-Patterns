import type { BadRequest } from "../_shared/core/types/responses/BadRequest";
import type { Failure } from "../_shared/core/types/responses/Failure";
import type { NotFound } from "../_shared/core/types/responses/NotFound";
import type { Success } from "../_shared/core/types/responses/Success";
import type { PaymentData, TransactionData } from "./types";


export interface PaymentService {
  makePayment(paymentData: Omit<PaymentData, "id" | "created">): Success<PaymentData> | BadRequest;
  getTransaction(transactionId: string): Success<TransactionData> | NotFound | Failure;
}