import { useEffect, useState } from "react";
import { User } from "../types/types";

const TopUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/top-users")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a: User, b: User) => b.postCount - a.postCount).slice(0, 5);
        setUsers(sorted);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Top Users</h2>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="bg-white shadow p-3 rounded-xl">{user.name} - {user.postCount} posts</li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
