export default function FeedbackListing({ feedbacks, selected, setSelected }) {
  return (
    <>
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            onClick={() => setSelected(feedback)}
            className={`${
              selected?.id === feedback.id
                ? "bg-gray-50 shadow-lg"
                : "bg-gray-100 hover:bg-gray-50 hover:shadow-lg"
            } shadow-md mt-5 rounded p-5 flex flex-col gap-3 cursor-pointer`}
          >
            <div className="flex gap-2 items-center">
              <span className="w-24">Username</span>
              <span
                className="rounded border-slate-700 w-11/12 p-1"
                style={{ borderWidth: "1px" }}
              >
                {feedback.username}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-24">Title</span>
              <span
                className="rounded border-slate-700 p-1 w-11/12"
                style={{ borderWidth: "1px" }}
              >
                {feedback.title}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="w-24">Feedback</span>
              <textarea
                name="feedbackContent"
                rows={5}
                className="border-slate-700 rounded w-11/12 px-2 cursor-pointer bg-transparent"
                style={{ borderWidth: "1px", outline: "none" }}
                value={feedback.feedback}
                readOnly
              />
            </div>
          </div>
        ))
      ) : (
        <p className="mt-56 text-gray-500 text-center">No feedback found.</p>
      )}
    </>
  );
}
