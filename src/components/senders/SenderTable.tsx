import { useSenders } from "@/hooks/useSenders";
import { Button } from "@/components/ui/button";

export const SenderTable = () => {
  const { list, remove } = useSenders();

  const senders = list.data?.data?.data || [];

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {senders.map((s: any) => (
          <tr key={s.sender_id}>
            <td>{s.full_name}</td>
            <td>{s.email}</td>
            <td>{s.phone}</td>
            <td>
              <Button
                variant="destructive"
                onClick={() => remove.mutate(s.sender_id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
