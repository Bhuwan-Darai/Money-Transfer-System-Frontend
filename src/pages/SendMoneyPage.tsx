import { useState } from "react";
import { useSenders } from "@/hooks/useSenders";
import { SendMoneyForm } from "@/components/transactions/SendMoneyForm";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SendMoneyPage() {
  const { list: senders } = useSenders({ page: 1, limit: 100 });
  const [senderId, setSenderId] = useState<string | undefined>(undefined);

  const senderOptions = senders.data?.data ?? [];
  const selectedSender = senderOptions.find(
    (sender: any) => sender.sender_id === senderId,
  );

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Send Money</h1>
        <p className="text-sm text-muted-foreground">
          Choose a sender and proceed to send money to a receiver in Nepal.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sender">Sender</Label>
        <Select value={senderId} onValueChange={setSenderId}>
          <SelectTrigger id="sender">
            <SelectValue placeholder="Select sender" />
          </SelectTrigger>
          <SelectContent>
            {senderOptions.map((sender: any) => (
              <SelectItem key={sender.sender_id} value={sender.sender_id}>
                {sender.full_name} · {sender.email || sender.phone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedSender ? (
        <div className="rounded-lg border p-4">
          <SendMoneyForm sender={selectedSender} />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Select a sender to continue with the transfer.
        </p>
      )}
    </div>
  );
}
