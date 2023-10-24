export class WithdrawalRequestDto {
    constructor(
        public merchantId: string, 
        public customerId: string, 
        public currencyCode: string, 
        public bankCode: string,
        public amount: number, 
        public transactionId: string, 
        public withdrawalReference: string,
        public createdAt: string, 
        public customerIp: string, 
        public signature: string, 
        public redirectUrl: string,
        public callbackUrl: string, 
        public destinationAccountNumber: string, 
        public destinationAccountName: string) { }
};
