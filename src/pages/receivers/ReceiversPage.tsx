import { useState } from "react";
import { useReceivers } from "@/hooks/useReceivers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReceiverPage() {
  const { list, create, remove } = useReceivers({ page: 1, limit: 10 });
  const [form, setForm] = useState<any>({});

  if (list.isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Receivers</h1>

      {/* Create */}
      <div className="grid grid-cols-2 gap-3 max-w-xl">
        <Input
          placeholder="Full name"
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
        <Input
          placeholder="Bank name"
          onChange={(e) => setForm({ ...form, bank_name: e.target.value })}
        />
        <Input
          placeholder="Account number"
          onChange={(e) =>
            setForm({ ...form, bank_account_number: e.target.value })
          }
        />
        <Input
          placeholder="Branch"
          onChange={(e) => setForm({ ...form, bank_branch: e.target.value })}
        />
        <Input
          placeholder="Phone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Button onClick={() => create.mutate(form)}>Create Receiver</Button>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Bank</th>
            <th>Account</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.data?.data.map((r: any) => (
            <tr key={r.receiver_id} className="border-t">
              <td>{r.full_name}</td>
              <td>{r.bank_name}</td>
              <td>{r.bank_account_number}</td>
              <td>
                <Button
                  variant="destructive"
                  onClick={() => remove.mutate(r.receiver_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
