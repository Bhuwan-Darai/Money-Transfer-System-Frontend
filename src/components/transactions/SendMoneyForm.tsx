import { useTransactions } from "@/hooks/useTransactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const SendMoneyForm = () => {
  const { send } = useTransactions();
  const [form, setForm] = useState<any>({});

  return (
    <div className="space-y-3">
      <Input
        placeholder="Receiver ID"
        onChange={(e) => setForm({ ...form, receiver_id: e.target.value })}
      />

      <Input
        placeholder="Amount JPY"
        type="number"
        onChange={(e) => setForm({ ...form, amount_jpy: e.target.value })}
      />

      <Button onClick={() => send.mutate(form)}>Send Money</Button>
    </div>
  );
};
