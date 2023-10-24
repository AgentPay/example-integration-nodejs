import moment from "moment";

export class DepositRequestDto {
    constructor(
        public merchantId: string, 
        public customerId: string, 
        public customerPhoneNumber: string, 
        public currencyCode: string, 
        public bankCode: string, 
        public amount: number, 
        public sourceAccountNumber: string, 
        public transactionId: string, 
        public depositReference: string, 
        public createdAt: string,
        public customerIp: string, 
        public signature: string, 
        public redirectUrl: string, 
        public callbackUrl: string) {}
}