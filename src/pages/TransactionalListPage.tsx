import { useTransactions } from "@/hooks/useTransactions";

export default function TransactionListPage() {
  const { history } = useTransactions({ page: 1, limit: 10 });

  if (history.isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>JPY</th>
            <th>NPR</th>
            <th>Fee</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.data?.data.map((t: any) => (
            <tr key={t.transaction_id} className="border-t">
              <td>{t.sender_name}</td>
              <td>{t.receiver_name}</td>
              <td>¥{t.amount_jpy}</td>
              <td>Rs {t.converted_amount_npr}</td>
              <td>Rs {t.service_fee_npr}</td>
              <td>
                <span
                  className={
                    t.status === "completed"
                      ? "text-green-600"
                      : t.status === "failed"
                        ? "text-red-600"
                        : "text-yellow-600"
                  }
                >
                  {t.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
