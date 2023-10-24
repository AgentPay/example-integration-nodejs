import { env } from "node:process";
import { DepositRequestDto } from "./dto/deposit_request_dto";
import moment from "moment";
import Link from "next/link";
import { depositRequestSignatureCalculator } from "./helpers/signature_calculator";

export default function Home() {
  const apiBase = env.NEXT_PUBLIC_API_BASE_URL as string;
  const merchantId = env.NEXT_PUBLIC_MERCHANT_ID as string;
  const secret = env.MERCHANT_SECRET as string;

  const depositRequest = new DepositRequestDto(
    merchantId,
    "7654321",
    "01122334455",
    "BDT",
    "NAGAD",
    10.00,
    "01122334455",
    crypto.randomUUID(),
    "This is reference value",
    moment().format("YYYY-MM-DD HH:mm:ss"),
    "12.0.0.1",
    "",
    "http://localhost:3000/",
    "https://webhook.site/8e6f59fd-3a0b-4761-a6ff-a12248aac51e");

  depositRequest.signature = depositRequestSignatureCalculator(secret, depositRequest);
  const postTarget = `${apiBase}/deposits/submit`
  return (
    <>
      <div>
        <Link href="withdrawals">Test Withdrawal</Link>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form className="flex flex-col items-center justify-center" action={postTarget} method="POST">
          <input type="hidden" name="MerchantId" value={depositRequest.merchantId} />
          <input type="hidden" name="CustomerId" value={depositRequest.customerId} />
          <input type="hidden" name="CustomerPhoneNumber" value={depositRequest.customerPhoneNumber} />
          <input type="hidden" name="CurrencyCode" value={depositRequest.currencyCode} />
          <input type="hidden" name="BankCode" value={depositRequest.bankCode} />
          <div>
            <label htmlFor="deposit-amount">Deposit Amount: </label>
            <input type="number" id="deposit-amount" name="Amount" value={depositRequest.amount} />
          </div>
          <input type="hidden" name="SourceAccountNumber" value={depositRequest.sourceAccountNumber} />
          <input type="hidden" name="TransactionId" value={depositRequest.transactionId} />
          <input type="hidden" name="DepositReference" value={depositRequest.depositReference} />
          <input type="hidden" name="CreatedAt" value={depositRequest.createdAt} />
          <input type="hidden" name="CustomerIp" value={depositRequest.customerIp} />
          <input type="hidden" name="Signature" value={depositRequest.signature} />
          <input type="hidden" name="RedirectUrl" value={depositRequest.redirectUrl} />
          <input type="hidden" name="CallbackUrl" value={depositRequest.callbackUrl} />
          <hr />
          <div className="mt-2">
            <button type="submit" value="Submit">Submit</button>
          </div>
        </form>

      </main>
    </>

  )
}
