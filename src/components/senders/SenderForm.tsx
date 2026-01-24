import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSenders } from "@/hooks/useSenders";
import { useState } from "react";

export const SenderForm = () => {
  const { create } = useSenders();
  const [form, setForm] = useState<any>({});

  const submit = () => {
    create.mutate(form);
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Full Name"
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
      />

      <Input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <Input
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <Button onClick={submit}>Create Sender</Button>
    </div>
  );
};
