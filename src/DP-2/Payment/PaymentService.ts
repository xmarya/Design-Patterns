export interface PaymentService {
    makePayment(amount:number):any
    getTransaction(transactionId:string):any
}