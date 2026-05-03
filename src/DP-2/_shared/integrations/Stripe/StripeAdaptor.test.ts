import { Stripe } from "./stripe";
import { StripeAdaptor } from "./StripeAdaptor";
import users from "../../../../shared/infra/_db/users.db.json";
import type { BadRequest } from "../../core/types/responses/BadRequest";
import type { Success } from "../../core/types/responses/Success";
import type { PaymentData } from "../../../Payment/types";

describe("StripeAdaptor behaviour", () => {
  const stripeAdaptor = new StripeAdaptor(new Stripe());

  it("exists", () => {
    expect(stripeAdaptor).toBeDefined();
  });

  it("should format the response of a failed payment when the card number is less that 16 digits", () => {
    const { email, name, phoneNumber } = users["002"];
    const result = stripeAdaptor.makePayment({ cardNumber: 951, paymentMethod: "card", amount: 300, currency: "SAR", userFullName: name, userEmail: email, userPhone: phoneNumber });

    expect(result.success).toBeFalsy();
    expect(result.statusCode).toBe(400);
    expect((result as BadRequest).reason).toBe("bad-request");
  });

  it("should format the response of a failed payment when the card number is longer that 16 digits", () => {
    const { email, name, phoneNumber } = users["002"];
    const result = stripeAdaptor.makePayment({ cardNumber: 123456789101112131, paymentMethod: "card", amount: 300, currency: "SAR", userFullName: name, userEmail: email, userPhone: phoneNumber });

    expect(result.success).toBeFalsy();
    expect(result.statusCode).toBe(400);
    expect((result as BadRequest).reason).toBe("bad-request");
  });

  it("should format the response of a successful payment that stripe returns", () => {
    const { email, name, phoneNumber } = users["002"];

    const result = stripeAdaptor.makePayment({ cardNumber: 1312111098765432, paymentMethod: "card", amount: 300, currency: "SAR", userFullName: name, userEmail: email, userPhone: phoneNumber });
    expect(result.success).toBeTruthy();
    expect(result.statusCode).toBe(200);

    const { data } = result as Success<PaymentData>;
    expect(data).toMatchObject({
      id: expect.any(String),
      amount: 300,
      currency: "SAR",
      cardNumber: 1312111098765432,
      created: expect.any(Date),
    });
  });

  it("should format the response when no data was found", () => {
    const wrongTransactionId = "trans_00147";
    const result = stripeAdaptor.getTransaction(wrongTransactionId);

    expect(result.success).toBeFalsy();
    expect(result.statusCode).toBe(404);
  });

  it("should format the response for found transaction by the correct id", () => {
    const correctTransactionId = "trans_00258";
    const result = stripeAdaptor.getTransaction(correctTransactionId);

    expect(result.success).toBeTruthy();
    expect(result.statusCode).toBe(200);
    if (result.success) expect(result.data).toMatchObject({ id: correctTransactionId, created: expect.any(Date) });
  });
});
