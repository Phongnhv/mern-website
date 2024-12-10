import { useEffect, useState } from "react";
import { FaBan, FaTrash } from "react-icons/fa";

function UsersList() {
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/admin/users?page=${currentPage}`);
        const data = await res.json();
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const totalPages = Math.ceil(totalUsers / postsPerPage);

  return (
    <div className="flex-auto">
      <h1 className="text-3xl font-semibold border-b text-slate-700">
        User List
      </h1>
      <div className="p-7 gap-4">
        {!loading && users.length === 0 && (
          <p className="text-xl text-slate-700">No user found!</p>
        )}
        {loading && (
          <p className="text-xl text-slate-700 text-center w-full">
            Loading...
          </p>
        )}
        {!loading && users && (
          <div>
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="p-2 border border-gray-300 w-7">ID</th>
                  <th className="p-2 border border-gray-300">Username</th>
                  <th className="p-2 border border-gray-300">Email</th>
                  <th className="p-2 border border-gray-300 w-7">Ban</th>
                  <th className="p-2 border border-gray-300 w-7">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-2 border border-gray-300">
                        {index + 1 + (currentPage - 1) * postsPerPage}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {user.username}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {user.email}
                      </td>
                      <td className="p-2 border border-gray-300 text-center">
                        <button
                          type="button"
                          className="border rounded-lg p-1 border-gray-300  hover:border-red-600 hover:bg-red-300 "
                        >
                          <FaBan className="text-red-600 hover:text-white" />
                        </button>
                      </td>
                      <td className="p-2 border border-gray-300 text-center">
                        <button
                          type="button"
                          className="border rounded-lg p-1 border-gray-300"
                        >
                          <FaTrash className="text-gray-600"/>
                        </button>
                      </td>
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

            <div className="mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-blue-400 hover:text-white"
                }`}
              >
                &#60;
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`mx-1 px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-blue-400 hover:text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-blue-400 hover:text-white"
                }`}
              >
                &#62;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersList;
