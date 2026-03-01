import { Table } from "@dasjideepak/mf-shared-ui";
import type { DummyUser } from "@/hooks/useUsers";

interface UsersPageProps {
  users: DummyUser[];
  usersLoading: boolean;
}

export function UsersPage({ users, usersLoading }: UsersPageProps) {
  const rows = users.map((u) => ({
    id: u.id,
    name: `${u.firstName} ${u.lastName}`,
    email: u.email,
    age: u.age,
    phone: u.phone,
    company: u.company.name,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Users Directory</h2>
        <p className="mt-1 text-sm text-gray-500">
          Browse all users fetched from the API inside remote1.
        </p>
      </div>
      <Table
        columns={[
          { key: "id", header: "ID" },
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "age", header: "Age" },
          { key: "phone", header: "Phone" },
          { key: "company", header: "Company" },
        ]}
        rows={rows}
        loading={usersLoading}
        emptyMessage="No users found"
      />
    </div>
  );
}
