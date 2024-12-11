import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function EstateList() {
  const [loading, setLoading] = useState(false);
  const [totalListings, setTotalListings] = useState(0);
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setListings([]);
      try {
        const res = await fetch(` /api/admin/listings?page=${currentPage}`);
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

  const totalPages = Math.ceil(totalListings / postsPerPage);

  return (
    <div className="flex-auto">
      <h1 className="text-3xl font-semibold border-b text-slate-700">
        Listing results:
      </h1>
      <div className="p-7 gap-4">
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
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="p-2 border border-gray-300 w-7">ID</th>
                  <th className="p-2 border border-gray-300">Name</th>
                  <th className="p-2 border border-gray-300">Address</th>
                  <th className="p-2 border border-gray-300 w-7">Type</th>
                  <th className="p-2 border border-gray-300 w-7">Offer</th>
                  <th className="p-2 border border-gray-300 w-7">Furnished</th>
                  <th className="p-2 border border-gray-300 w-7">Parking</th>
                  <th className="p-2 border border-gray-300 w-7">Delete</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border border-gray-300 text-center">
                      {index + 1 + (currentPage - 1) * postsPerPage}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {listing.name}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {listing.address || "N/A"}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {listing.type == "rent" ? "Rent" : "Sale"}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {listing.offer ? "Yes" : "No"}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {listing.furnished ? "Yes" : "No"}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {listing.parking ? "Yes" : "No"}
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
