import { env } from "node:process";
import moment from "moment";
import Link from "next/link";
import { WithdrawalRequestDto } from "../dto/withdrawal_request_dto";
import { withdrawalRequestSignatureCalculator } from "../helpers/signature_calculator";

export default function Home() {
    const apiBase = env.NEXT_PUBLIC_API_BASE_URL as string;
    const merchantId = env.NEXT_PUBLIC_MERCHANT_ID as string;
    const secret = env.MERCHANT_SECRET as string;

    const withdrawalRequest = new WithdrawalRequestDto(
        merchantId,
        "7654321",
        "BDT",
        "NAGAD",
        10.00,
        crypto.randomUUID(),
        "This is reference value",
        moment().format("YYYY-MM-DD HH:mm:ss"),
        "12.0.0.1",
        "",
        "http://localhost:3000/withdrawals",
        "https://webhook.site/8e6f59fd-3a0b-4761-a6ff-a12248aac51e",
        "01122334455",
        "01122334455");

    withdrawalRequest.signature = withdrawalRequestSignatureCalculator(secret, withdrawalRequest);
    const postTarget = `${apiBase}/withdrawals/submit`
    return (
        <>
            <div>
                <Link href="withdrawals">Test Deposit</Link>
            </div>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <form className="flex flex-col items-center justify-center" action={postTarget} method="POST">
                    <input type="hidden" name="MerchantId" value={withdrawalRequest.merchantId} />
                    <input type="hidden" name="CustomerId" value={withdrawalRequest.customerId} />
                    <input type="hidden" name="CurrencyCode" value={withdrawalRequest.currencyCode} />
                    <input type="hidden" name="BankCode" value={withdrawalRequest.bankCode} />
                    <div>
                        <label htmlFor="Amount">Amount</label>
                        <input type="number" value={withdrawalRequest.amount} id="Amount" placeholder="Min. 800, Max 30.000.00" name="Amount" />
                    </div>
                    <input type="hidden" name="TransactionId" value={withdrawalRequest.transactionId} />
                    <input type="hidden" name="WithdrawalReference" value={withdrawalRequest.withdrawalReference} />
                    <input type="hidden" name="CreatedAt" value={withdrawalRequest.createdAt} />
                    <input type="hidden" name="CustomerIp" value={withdrawalRequest.customerIp} />
                    <input type="hidden" name="Signature" value={withdrawalRequest.signature} />
                    <input type="hidden" name="RedirectUrl" value={withdrawalRequest.redirectUrl} />
                    <input type="hidden" name="CallbackUrl" value={withdrawalRequest.callbackUrl} />
                    <div>
                        <label htmlFor="DestinationAccountNumber">Your Phone Number</label>
                        <input type="text" id="DestinationAccountNumber" name="DestinationAccountNumber" value={withdrawalRequest.destinationAccountName} />
                    </div>
                    <input type="hidden" name="DestinationAccountName" value={withdrawalRequest.destinationAccountName} />

                    <hr />
                    <div className="mt-2">
                        <button type="submit" value="Submit">Submit</button>
                    </div>
                </form>

            </main>
        </>

    )
}
