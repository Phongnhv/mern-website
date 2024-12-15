import { useEffect, useState } from "react";
import { FaCheck, FaMinus, FaSearch, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EstateList() {
  const [loading, setLoading] = useState(false);
  const [totalListings, setTotalListings] = useState(0);
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 10;

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

  const updateStatus = async (id, status) => { //Mới chỉ cập nhật được trên UI, chưa cập nhật được trong database
    try {
      const response = await fetch(`/api/admin/listings/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Update successful:", result.data);

        setListings((prevListings) =>
          prevListings.map((listing) =>
            listing._id === id ? { ...listing, status } : listing
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
      const response = await fetch(`/api/admin/listings/${id}/del-ete`, { // TODO Sửa sau khi có api
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Listing deleted successfully");
        setListings((prevListings) => prevListings.filter((listing) => listing._id !== id));
        setTotalListings((prevTotal) => prevTotal - 1); 
      } else {
        const result = await response.json();
        console.error("Delete failed:", result.message);
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleSubmit = async () => {};

  const totalPages = Math.ceil(totalListings / postsPerPage);

  return (
    <div className="flex-auto mt-2">
      <div className="px-4 pb-4 flex justify-between">
        <h1 className="text-3xl font-semibold border-b text-slate-700">
          Listings Results:
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
                  <th className="p-2 border border-gray-300">Name</th>
                  <th className="p-2 border border-gray-300">Address</th>
                  <th className="p-2 border border-gray-300">Price</th>
                  <th className="p-2 border border-gray-300">
                    Landlord's Email
                  </th>
                  <th className="p-2 border border-gray-300">Area</th>
                  <th className="p-2 border border-gray-300">Status</th>
                  <th className="p-2 border border-gray-300 w-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border border-gray-300">
                      {index + 1 + (currentPage - 1) * postsPerPage}
                    </td>
                    <td className="p-2 border border-gray-300">
                      <Link to={`/listing/${listing._id}`}>{listing.name}</Link>
                    </td>
                    <td className="p-2 border border-gray-300">
                      {listing.address || "N/A"}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {listing.price}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {listing.email}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {listing.area}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {listing.status || "Pending"}
                    </td>
                    <td className="text-white border border-gray-300">
                      <div className="flex justify-around">
                        {listing.status !== "Approved" && (
                          <button
                            className="flex border rounded-lg bg-green-600 gap-2 p-1 m-1"
                            onClick={() =>
                              updateStatus(listing._id, "Approved")
                            }
                          >
                            Accept
                            <FaCheck className="translate-y-[25%]" />
                          </button>
                        )}

                        {listing.status !== "Denied" && (
                          <button
                            className="flex border rounded-lg bg-red-600 gap-2 p-1 m-1"
                            onClick={(e) => {
                              updateStatus(listing._id, "Denied");
                            }}
                          >
                            Deny
                            <FaMinus className="translate-y-[25%]" />
                          </button>
                        )}

                        <button
                          className="flex border rounded-lg bg-gray-600 gap-2 p-1 m-1"
                          onClick={() => handleDelete(listing._id)}
                        >
                          Delete
                          <FaTrash className="translate-y-[25%]" />
                        </button>
                      </div>
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
