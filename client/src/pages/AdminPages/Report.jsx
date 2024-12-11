import { useState } from "react";
import ReportListing from "../../components/ReportListing";

const exReports = [
  {
    id: 1,
    username: "Nguyen Van A",
    estateLink: "Estate 1",
    reportIssue: "Spam",
  },
  {
    id: 2,
    username: "Le Thi B",
    estateLink: "Estate 2",
    reportIssue: "Harassment",
  },
  {
    id: 3,
    username: "Tran Van C",
    estateLink: "Estate 3",
    reportIssue: "False Information",
  },
  {
    id: 4,
    username: "Pham Thi D",
    estateLink: "Estate 4",
    reportIssue: "Copyright or Legal Issues",
  },
  {
    id: 5,
    username: "Hoang Van E",
    estateLink: "Estate 5",
    reportIssue: "Violence or Dangerous Behavior",
  },
  {
    id: 6,
    username: "Vu Thi F",
    estateLink: "Estate 6",
    reportIssue: "Scam or Fraud",
  },
  {
    id: 7,
    username: "Do Van G",
    estateLink: "Estate 7",
    reportIssue: "Other",
  },
];

export default function Report() {
  const [reports, setReports] = useState(exReports);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
