import { useEffect, useState } from "react";
import ReportListing from "../../components/ReportListing";

export default function Report() {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/listing/get")
      .then((response) => response.json())
      .then((data) => {
        const defaultReports = data.map((listing) => ({
          id: listing._id,
          username: "Nguyễn Văn A",
          estateLink: listing.name,
          estateUrl: `/listing/${listing._id}`,
          reportIssue: "Copyright or Legal Issues",
        }));
        setReports(defaultReports);
      })
      .catch((error) => console.error("Error fetching listings:", error));
  }, []);

  const totalPages = Math.ceil(reports.length / itemsPerPage);

  const handleDelete = () => {
    if (selected) {
      setReports(reports.filter((report) => report.id !== selected.id));
      setSelected(null);
    }
  };

  const currentReports = reports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hasData = reports.length > 0;

  return (
    <div className="h-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold border-b text-slate-700">
          Report:
        </h1>
        <button
          className={`${
            selected ? "bg-red-700 hover:bg-red-800" : "bg-red-800"
          } text-white rounded-lg uppercase p-3`}
          disabled={!selected}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div className="mt-5">
        <ReportListing
          reports={currentReports}
          selected={selected}
          setSelected={setSelected}
        />
        {hasData && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-blue-400 hover:text-white"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-700">
              Page {currentPage} / {totalPages}
            </span>

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
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
