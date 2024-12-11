export default function ReportListing({ reports, selected, setSelected }) {
  return (
    <>
      {reports.length > 0 ? (
        reports.map((report) => (
          <div
            key={report.id}
            onClick={() => setSelected(report)}
            className={`${
              selected?.id === report.id
                ? "bg-gray-50 shadow-lg"
                : "bg-gray-100 hover:bg-gray-50 hover:shadow-lg"
            } shadow-md mt-5 rounded p-5 flex flex-col gap-3 cursor-pointer`}
          >
            <div className="flex gap-2 items-center">
              <span className="w-24">Reporter</span>
              <span
                className="rounded border-slate-700 w-11/12 p-1"
                style={{ borderWidth: "1px" }}
              >
                {report.username}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-24">Estate link</span>
              <span
                className="rounded border-slate-700 p-1 w-11/12"
                style={{ borderWidth: "1px" }}
              >
                {report.estateLink}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="w-24">Report issue</span>
              <textarea
                name="reportContent"
                rows={5}
                className="border-slate-700 rounded w-11/12 px-2 cursor-pointer bg-transparent"
                style={{ borderWidth: "1px", outline: "none" }}
                value={report.reportIssue}
                readOnly
              />
            </div>
          </div>
        ))
      ) : (
        <p className="mt-56 text-gray-500 text-center">No report found.</p>
      )}
    </>
  );
}
