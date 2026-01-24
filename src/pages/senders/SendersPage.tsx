import { useState } from "react";
import { useSenders } from "@/hooks/useSenders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";

export default function SenderPage() {
  const { user } = useAuthStore();
  const { list, create, update, remove } = useSenders({ page: 1, limit: 10 });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({
    full_name: "",
    nationality: "",
    phone: "",
    email: "",
    date_of_birth: "",
    address: "",
    user_id: user?.user_id,
  });

  const resetForm = () => {
    setEditingId(null);
    setForm({
      full_name: "",
      nationality: "",
      phone: "",
      email: "",
      date_of_birth: "",
      address: "",
      user_id: user?.user_id,
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

  const handleEdit = (sender: any) => {
    setEditingId(sender.sender_id);
    setForm(sender);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Senders</h1>

      {/* Form */}
      <div className="grid grid-cols-2 gap-3 max-w-xl">
        <Input
          placeholder="Full name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
        <select
          className="border border-input bg-background rounded-md px-3 py-2 text-sm"
          value={form.nationality}
          onChange={(e) => setForm({ ...form, nationality: e.target.value })}
        >
          <option value="" disabled>
            Select nationality
          </option>
          <option value="Japan">Japan</option>
          <option value="Nepal">Nepal</option>
        </select>
        <Input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          type="date"
          value={form.date_of_birth?.slice(0, 10)}
          onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
        />
        <Input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            disabled={create.isPending || update.isPending}
          >
            {editingId
              ? update.isPending
                ? "Updating..."
                : "Update Sender"
              : create.isPending
                ? "Creating..."
                : "Create Sender"}
          </Button>

          {editingId && (
            <Button
              variant="outline"
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
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Nationality</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.isLoading ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : list.data?.data?.length > 0 ? (
            list.data.data.map((s: any) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.full_name}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.phone}</td>
                <td className="p-2">
                  {new Date(s.date_of_birth).toLocaleDateString()}
                </td>
                <td className="p-2">{s.address}</td>
                <td className="p-2">{s.nationality}</td>
                <td className="p-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(s)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-700 text-amber-50"
                    variant="outline"
                    onClick={() => remove.mutate(s.sender_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No senders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
