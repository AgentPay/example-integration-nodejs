import { DepositRequestDto } from "../dto/deposit_request_dto";
import moment from 'moment';
import * as crypto from 'crypto';
import { WithdrawalRequestDto } from "../dto/withdrawal_request_dto";

export const depositRequestSignatureCalculator = (secret: string, request: DepositRequestDto): string => {
    const sourceString =
        `${request.amount}${request.bankCode}${request.currencyCode}${secret}${request.merchantId}${request.customerId}${moment(request.createdAt).format('YYYY-MM-DD HH:mm:ss')}`;
    const hash = crypto.createHash('sha1').update(sourceString).digest('hex');
    return hash;
};

export const withdrawalRequestSignatureCalculator = (secret: string, request: WithdrawalRequestDto): string => {
    const sourceString =
        `${request.merchantId}${moment(request.createdAt).format('YYYY-MM-DD HH:mm:ss')}${request.customerId}${request.destinationAccountNumber}${secret}${request.amount}${request.currencyCode}${request.bankCode}`;
        console.log("SOURCE:", sourceString);
    const hash = crypto.createHash('sha1').update(sourceString).digest('hex');
    return hash;
}