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

export function useUsers(limit = 10) {
  const [users, setUsers] = useState<DummyUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    fetch(`https://dummyjson.com/users?limit=${limit}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<UsersResponse>;
      })
      .then((data) => {
        if (!cancelled) {
          setUsers(data.users);
          setError(null);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { users, loading, error };
}
