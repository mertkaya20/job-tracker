const Applications = () => {
  const statuses = ["all", "applied", "interview", "offer", "rejected"];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage your job applications
          </p>
        </div>
        <button className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
          + Add Application
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {statuses.map((status) => (
          <button
            key={status}
            className="text-xs font-medium px-4 py-2 rounded-full border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors capitalize cursor-pointer"
          >
            {status}
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between px-6 py-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-gray-900">
                Company Name
              </p>
              <p className="text-xs text-gray-400">Position Title</p>
              <p className="text-xs text-gray-300 mt-0.5">Jan 1, 2025</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium capitalize">
                applied
              </span>
              <button className="text-xs text-gray-400 hover:text-primary transition-colors cursor-pointer">
                Edit
              </button>
              <button className="text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
