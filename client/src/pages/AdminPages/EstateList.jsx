import { useEffect, useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EstateList() {
  const [loading, setLoading] = useState(false);
  const [totalListings, setTotalListings] = useState(0);
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 8;

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setListings([]);
      try {
        const res = await fetch(`/api/admin/listings?page=${currentPage}`);
        const data = await res.json();
        setListings(data.listings);
        setTotalListings(data.totalListing);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [currentPage]);

  const handleStatusChange = async () => {};

  const handleSubmit = async () => {};

  const totalPages = Math.ceil(totalListings / postsPerPage);

  // chỉ giữ lại name, address, price, user và diện tích (sẽ thêm vào sau) và trạng thái (approved, denied, pending)
  // đưa phần link trỏ thẳng tới Name
  // các nút bao gồm xoá, chấp thuận, từ chối
  // thêm phân trang
  return (
    <div className="flex-auto mt-2">
      <div className="px-4 pb-4 flex justify-between">
        <h1 className="text-3xl font-semibold border-b text-slate-700">
          Listing results:
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
      <div className="px-4 gap-2">
        {!loading && listings.length === 0 && (
          <p className="text-xl text-slate-700">No listing found!</p>
        )}
        {loading && (
          <p className="text-xl text-slate-700 text-center w-full">
            Loading...
          </p>
        )}

        {!loading && listings && (
          <div>
            <table className="table-auto border-collapse border border-gray-700 w-full text-sm text-center ">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  <th className="p-2 border border-gray-300 w-7">ID</th>
                  <th className="p-2 border border-gray-300 text-left">Name</th>
                  <th className="p-2 border border-gray-300 text-left">Address</th>
                  <th className="p-2 border border-gray-300 w-7">Type</th>
                  <th className="p-2 border border-gray-300 w-7">Offer</th>
                  <th className="p-2 border border-gray-300 w-7">Furnished</th>
                  <th className="p-2 border border-gray-300 w-7">Parking</th>
                  <th className="p-2 border border-gray-300 w-7">Status</th>
                  <th className="p-2 border border-gray-300 w-7">Details</th>
                  <th className="p-2 border border-gray-300 w-7">Delete</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border border-gray-300">
                      {index + 1 + (currentPage - 1) * postsPerPage}
                    </td>
                    <td className="p-2 border border-gray-300 text-left">
                      {listing.name}
                    </td>
                    <td className="p-2 border border-gray-300 text-left">
                      {listing.address || "N/A"}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {listing.type == "rent" ? "Rent" : "Sale"}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {listing.offer ? "Yes" : "No"}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {listing.furnished ? "Yes" : "No"}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {listing.parking ? "Yes" : "No"}
                    </td>
                    <td className="p-2 border border-gray-300">
                      <select
                        value={listing.status}
                        onChange={(e) =>
                          handleStatusChange(listing.email, e.target.value)
                        }
                        className="border rounded px-2 py-1"
                        defaultValue={listing.status}
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted" className="text-green-600">
                          Accepted
                        </option>
                        <option value="denied" className="text-red-600">
                          Denied
                        </option>
                      </select>
                    </td>
                    <td className="p-2 border border-gray-300">
                      <Link to={`/listing/${listing._id}`}>
                        <p className="text-blue-600 hover:opacity-50 underline">
                          View
                        </p>
                      </Link>
                    </td>
                    <td className="p-2 border border-gray-300">
                      <button
                        type="button"
                        className="border rounded-lg p-1 border-gray-300 "
                      >
                        <FaTrash className="text-gray-600 hover:opacity-50" />
                      </button>
                    </td>
                  </tr>
                ))}
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
