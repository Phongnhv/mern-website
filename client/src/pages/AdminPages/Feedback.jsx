import { useState } from "react";
import FeedbackListing from "../../components/FeedbackListing";

const exFeedbacks = [
  {
    id: 1,
    username: "Nguyen Van A",
    title: "Estate",
    feedback: "This is a great estate. I really love the service!",
  },
  {
    id: 2,
    username: "Tran Thi B",
    title: "Service",
    feedback: "The service was decent but could use some improvement.",
  },
  {
    id: 3,
    username: "Le Van C",
    title: "Support",
    feedback: "Customer support was very helpful and responsive!",
  },
  {
    id: 4,
    username: "Nguyen Van C",
    title: "Support",
    feedback: "The service was decent but could use some improvement.",
  },
  {
    id: 5,
    username: "Tran Thi D",
    title: "Support",
    feedback: "This is a great estate. I really love the service!",
  },
  {
    id: 6,
    username: "Le Van E",
    title: "Support",
    feedback: "Customer support was very helpful and responsive!",
  },
  {
    id: 7,
    username: "Nguyen Khanh F",
    title: "Support",
    feedback: "The service was decent but could use some improvement.",
  },
];

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState(exFeedbacks);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

  const handleDelete = () => {
    if (selected) {
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== selected.id));
      setSelected(null);
    }
  };

  const currentFeedbacks = feedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hasData = feedbacks.length > 0;

  return (
    <div className="h-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold border-b text-slate-700">
          Feedback:
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
        <FeedbackListing
          feedbacks={currentFeedbacks}
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
