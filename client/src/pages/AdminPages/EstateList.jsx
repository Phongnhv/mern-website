import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EstateList() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const res = await fetch(`/api/listing/get`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [params.listingId]);

  
  // chỉ giữ lại name, address, price, user và diện tích (sẽ thêm vào sau) và trạng thái (approved, denied, pending)
  // đưa phần link trỏ thẳng tới Name
  // các nút bao gồm xoá, chấp thuận, từ chối
  // thêm phân trang
  return (
    <div className="flex-auto">
      <h1 className="text-3xl font-semibold border-b text-slate-700">
        Listing results:
      </h1>
      <div className="p-7 gap-4 md:flex-col">
        {!loading && listings.length === 0 && (
          <p className="text-xl text-slate-700">No listing found!</p>
        )}
        {loading && (
          <p className="text-xl text-slate-700 text-center w-full">
            Loading...
          </p>
        )}

        {!loading &&
          listings &&
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-300">ID</th>
                    <th className="p-2 border border-gray-300">Name</th>
                    <th className="p-2 border border-gray-300">Address</th>
                    <th className="p-2 border border-gray-300">Description</th>
                    <th className="p-2 border border-gray-300">Type</th>
                    <th className="p-2 border border-gray-300">Bathroom</th>
                    <th className="p-2 border border-gray-300">Bedroom</th>
                    <th className="p-2 border border-gray-300">Offer</th>
                    <th className="p-2 border border-gray-300">Parking</th>
                    <th className="p-2 border border-gray-300">Furnished</th>
                    <th className="p-2 border border-gray-300">
                      Regular Price
                    </th>
                    <th className="p-2 border border-gray-300">
                      Discount Price
                    </th>
                    <th className="p-2 border border-gray-300">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing, index) => (
                    <tr key={listing._id} className="hover:bg-gray-50">
                      <td className="p-2 border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {listing.name}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {listing.address}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {listing.description}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {listing.type}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {listing.bathrooms}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {listing.bedrooms}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {listing.offer ? "Yes" : "No"}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {listing.parking ? "Yes" : "No"}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {listing.furnished ? "Yes" : "No"}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {listing.regularPrice}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {listing.discountPrice || "N/A"}
                      </td>
                      <td className="p-2 border border-gray-300">
                        <a
                          href={`/listing/${listing._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
      </div>
    </div>
  );
}
