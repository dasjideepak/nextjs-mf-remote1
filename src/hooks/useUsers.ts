import { useEffect, useState } from "react";

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  image: string;
  company: { name: string; title: string };
}

interface UsersResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}

const REQUEST_TIMEOUT_MS = 6000;
const REMOTE_SKIP = 50;
const FALLBACK_USERS: DummyUser[] = [
  {
    id: 1001,
    firstName: "Ava",
    lastName: "Stone",
    email: "ava.stone@example.com",
    age: 31,
    gender: "female",
    phone: "+1-555-0101",
    image: "https://i.pravatar.cc/150?img=11",
    company: { name: "Northwind", title: "Customer Success Manager" },
  },
  {
    id: 1002,
    firstName: "Liam",
    lastName: "Carter",
    email: "liam.carter@example.com",
    age: 28,
    gender: "male",
    phone: "+1-555-0102",
    image: "https://i.pravatar.cc/150?img=12",
    company: { name: "Acme Inc.", title: "Solutions Consultant" },
  },
  {
    id: 1003,
    firstName: "Mia",
    lastName: "Nguyen",
    email: "mia.nguyen@example.com",
    age: 35,
    gender: "female",
    phone: "+1-555-0103",
    image: "https://i.pravatar.cc/150?img=13",
    company: { name: "Globex", title: "Product Specialist" },
  },
  {
    id: 1004,
    firstName: "Noah",
    lastName: "Patel",
    email: "noah.patel@example.com",
    age: 33,
    gender: "male",
    phone: "+1-555-0104",
    image: "https://i.pravatar.cc/150?img=14",
    company: { name: "Initech", title: "Technical Account Lead" },
  },
  {
    id: 1005,
    firstName: "Emma",
    lastName: "Kim",
    email: "emma.kim@example.com",
    age: 29,
    gender: "female",
    phone: "+1-555-0105",
    image: "https://i.pravatar.cc/150?img=15",
    company: { name: "Umbrella", title: "Client Operations Analyst" },
  },
];

export function useUsers(limit = 10) {
  const [users, setUsers] = useState<DummyUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const loadUsers = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://dummyjson.com/users?limit=${limit}&skip=${REMOTE_SKIP}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = (await res.json()) as UsersResponse;
        if (cancelled) return;
        setUsers(data.users);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setUsers(FALLBACK_USERS.slice(0, limit));
        setError(
          `Using fallback users: ${
            err instanceof Error ? err.message : "request failed"
          }`
        );
      } finally {
        clearTimeout(timeoutId);
        if (!cancelled) setLoading(false);
      }
    };

    void loadUsers();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [limit]);

  return { users, loading, error };
}
