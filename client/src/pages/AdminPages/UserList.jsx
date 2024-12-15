import { useEffect, useState } from "react";
import { FaSearch, FaTrash, FaUserAltSlash, FaUserCheck } from "react-icons/fa";

function UsersList() {
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `/api/admin/users?page=${currentPage}&limit=${postsPerPage}`
        );
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

  const updateStatus = async (id, isBanned) => { // TODO Sửa lỗi k ấn được nút Ban sau 
    try {
      const response = await fetch(`/api/admin/users/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBanned }),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Update successful:", result.data);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, isBanned } : user
          )
        );
      } else {
        console.error("Update failed:", result.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/admin/users/${id}/delete`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("User deleted successfully");
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        setTotalUsers((prevTotal) => prevTotal - 1); 
      } else {
        const result = await response.json();
        console.error("Delete failed:", result.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const totalPages = Math.ceil(totalUsers / postsPerPage);

  const handleSubmit = () => {};

  return (
    <div className="flex-auto mt-2 ">
      <div className="px-4 pb-4 flex justify-between">
        <h1 className="text-3xl font-semibold border-b text-slate-700">
          Users Results:
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-200 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
      </div>
      <div className="p-4 gap-2">
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
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-center ">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  <th className="p-2 border border-gray-300 w-7">ID</th>
                  <th className="p-2 border border-gray-300">Username</th>
                  <th className="p-2 border border-gray-300">Email</th>
                  <th className="p-2 border border-gray-300">Status</th>
                  <th className="p-2 border border-gray-300 w-2">Actions</th>
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
                      <td className="p-2 border border-gray-300">
                        {user.isBanned ? "Banned" : "Active"}
                      </td>
                      <td className="text-white border border-gray-300">
                        <div className="flex justify-around">
                          <button
                            className={`flex border rounded-lg gap-2 p-1 m-1 ${
                              user.isBanned ? "bg-green-600" : "bg-red-600"
                            }`}
                            onClick={() =>
                              updateStatus(user._id, { isBanned: !user.isBanned })
                            }
                          >
                            {user.isBanned ? "Unban" : "Ban"}
                            {user.isBanned ? (
                              <FaUserCheck className="translate-y-[25%]" />
                            ) : (
                              <FaUserAltSlash className="translate-y-[25%]" />
                            )}
                          </button>
                          <button
                            value="Delete"
                            className="flex border rounded-lg bg-gray-600 gap-2 xp-1 m-1"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                            <FaTrash className="translate-y-[25%]" />
                          </button>
                        </div>
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
