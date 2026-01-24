import { useState } from "react";
import { useReceivers } from "@/hooks/useReceivers";
import { useTransactions } from "@/hooks/useTransactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SendMoneyPage() {
  const { list } = useReceivers();
  const { send } = useTransactions();
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <div className="p-6 space-y-6 max-w-md">
      <h1 className="text-2xl font-bold">Send Money</h1>

      <select
        className="border p-2 w-full"
        onChange={(e) => setReceiverId(e.target.value)}
      >
        <option>Select receiver</option>
        {list.data?.data.map((r: any) => (
          <option key={r.receiver_id} value={r.receiver_id}>
            {r.full_name} - {r.bank_name}
          </option>
        ))}
      </select>

      <Input
        type="number"
        placeholder="Amount in JPY"
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <Button
        onClick={() =>
          send.mutate({
            receiver_id: receiverId,
            amount_jpy: amount,
          })
        }
      >
        Send Money
      </Button>

      {send.isSuccess && <p className="text-green-600">Transfer initiated!</p>}
    </div>
  );
}
