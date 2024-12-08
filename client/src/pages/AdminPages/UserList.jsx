import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/all-users`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [params.userId]);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-semibold border-b text-slate-700">User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="p-2 border border-gray-300">ID</th>
              <th className="p-2 border border-gray-300">Username</th>
              <th className="p-2 border border-gray-300">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border border-gray-300">{index + 1}</td>
                  <td className="p-2 border border-gray-300">
                    {user.username}
                  </td>
                  <td className="p-2 border border-gray-300">{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="p-2 border border-gray-300 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersList;
