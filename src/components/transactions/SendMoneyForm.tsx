import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReceivers } from "@/hooks/useReceivers";
import { useTransactions } from "@/hooks/useTransactions";

const FOREX_RATE = 0.92;

const calculateServiceFee = (amountNpr: number) => {
  if (!amountNpr) return 0;
  if (amountNpr <= 100000) return 500;
  if (amountNpr <= 200000) return 1000;
  return 3000;
};

type Sender = {
  sender_id: string;
  full_name: string;
  email?: string;
};

type SendMoneyFormProps = {
  sender: Sender;
  onSuccess?: () => void;
};

export const SendMoneyForm = ({ sender, onSuccess }: SendMoneyFormProps) => {
  const { list: receivers } = useReceivers({ page: 1, limit: 100 });
  const { send } = useTransactions();
  const [receiverId, setReceiverId] = useState("");
  const [amountJpy, setAmountJpy] = useState("");

  const amountNumber = Number(amountJpy);
  const convertedAmount = useMemo(() => {
    if (!amountNumber || Number.isNaN(amountNumber)) return 0;
    return Number((amountNumber * FOREX_RATE).toFixed(2));
  }, [amountNumber]);

  const serviceFee = useMemo(
    () => calculateServiceFee(convertedAmount),
    [convertedAmount],
  );

  const canSubmit =
    !!receiverId &&
    amountNumber > 0 &&
    !Number.isNaN(amountNumber) &&
    !send.isPending;

  const handleSubmit = () => {
    if (!canSubmit) return;
    send.mutate(
      {
        sender_id: sender.sender_id,
        receiver_id: receiverId,
        amount_jpy: amountNumber,
      },
      {
        onSuccess: () => {
          setReceiverId("");
          setAmountJpy("");
          onSuccess?.();
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">Sending from</p>
        <p className="font-semibold">{sender.full_name}</p>
        {sender.email && (
          <p className="text-xs text-muted-foreground">{sender.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="receiver">Receiver</Label>
        <Select value={receiverId} onValueChange={setReceiverId}>
          <SelectTrigger id="receiver">
            <SelectValue placeholder="Select receiver" />
          </SelectTrigger>
          <SelectContent>
            {receivers?.data?.map((receiver: any) => (
              <SelectItem
                key={receiver.receiver_id}
                value={receiver.receiver_id}
              >
                {receiver.full_name} · {receiver.bank_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount (JPY)</Label>
        <Input
          id="amount"
          type="number"
          min={0}
          placeholder="Enter amount in JPY"
          value={amountJpy}
          onChange={(e) => setAmountJpy(e.target.value)}
        />
      </div>

      <div className="rounded-md border p-3 text-sm">
        <p>
          Converted Amount:{" "}
          <span className="font-semibold">
            NRs. {convertedAmount.toLocaleString()}
          </span>
        </p>
        <p>
          Service Fee:{" "}
          <span className="font-semibold">
            NRs. {serviceFee.toLocaleString()}
          </span>
        </p>
      </div>

      <Button disabled={!canSubmit} onClick={handleSubmit} className="w-full">
        {send.isPending ? "Processing..." : "Send Money"}
      </Button>
    </div>
  );
};
