import { useState } from "react";
import { useReceivers } from "@/hooks/useReceivers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";

export default function ReceiverPage() {
  const { user } = useAuthStore();
  const { list, create, update, remove } = useReceivers({ page: 1, limit: 10 });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({
    full_name: "",
    bank_name: "",
    bank_account_number: "",
    bank_branch: "",
    phone: "",
    user_id: user?.user_id,
    created_by: user?.user_id,
  });

  const resetForm = () => {
    setEditingId(null);
    setForm({
      full_name: "",
      bank_name: "",
      bank_account_number: "",
      bank_branch: "",
      phone: "",
      user_id: user?.user_id,
      created_by: user?.user_id,
    });
  };

  const handleSubmit = () => {
    if (editingId) {
      update.mutate(
        { id: editingId, data: form },
        {
          onSuccess: () => resetForm(),
        },
      );
    } else {
      create.mutate(form, {
        onSuccess: () => resetForm(),
      });
    }
  };

  const handleEdit = (receiver: any) => {
    setEditingId(receiver.receiver_id);
    setForm({
      full_name: receiver.full_name,
      bank_name: receiver.bank_name,
      bank_account_number: receiver.bank_account_number,
      bank_branch: receiver.bank_branch,
      phone: receiver.phone,
      user_id: receiver.user_id,
      created_by: receiver.created_by,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Receivers</h1>

      {/* Create */}
      <div className="grid grid-cols-2 gap-3 max-w-xl">
        <Input
          placeholder="Full name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
        <Input
          placeholder="Bank name"
          value={form.bank_name}
          onChange={(e) => setForm({ ...form, bank_name: e.target.value })}
        />
        <Input
          placeholder="Account number"
          value={form.bank_account_number}
          onChange={(e) =>
            setForm({ ...form, bank_account_number: e.target.value })
          }
        />
        <Input
          placeholder="Branch"
          value={form.bank_branch}
          onChange={(e) => setForm({ ...form, bank_branch: e.target.value })}
        />
        <Input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <div className="flex gap-2">
          <Button
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={handleSubmit}
            disabled={create.isPending || update.isPending}
          >
            {editingId
              ? update.isPending
                ? "Updating..."
                : "Update Receiver"
              : create.isPending
                ? "Creating..."
                : "Create Receiver"}
          </Button>
          {editingId && (
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={resetForm}
              disabled={update.isPending}
            >
              Cancel
            </Button>
          )}
        </div>
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
          {list.isLoading ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : list.data?.length > 0 ? (
            list.data.map((r: any) => (
              <tr key={r.receiver_id} className="border-t">
                <td>{r.full_name}</td>
                <td>{r.bank_name}</td>
                <td>{r.bank_account_number}</td>
                <td>{r.bank_branch}</td>
                <td>{r.phone}</td>
                <td className="flex gap-2">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => handleEdit(r)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => remove.mutate(r.receiver_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No receivers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
