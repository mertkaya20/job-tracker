import { useQuery } from "@tanstack/react-query";
import { getApplicationsRequest, getStatsRequest } from "../api/applications";
import SkeletonCard from "../components/SkeletonCard";

const Dashboard = () => {
  const statCards = [
    {
      label: "Applied",
      status: "applied",
      bg: "bg-blue-50",
      color: "text-blue-600",
      border: "border-blue-100",
    },
    {
      label: "Interview",
      status: "interview",
      bg: "bg-yellow-50",
      color: "text-yellow-600",
      border: "border-yellow-100",
    },
    {
      label: "Offer",
      status: "offer",
      bg: "bg-green-50",
      color: "text-green-600",
      border: "border-green-100",
    },
    {
      label: "Rejected",
      status: "rejected",
      bg: "bg-red-50",
      color: "text-red-600",
      border: "border-red-100",
    },
  ];

  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: getStatsRequest,
  });

  const {
    data: applicationsData,
    isLoading: applicationsLoading,
    isError: applicationsError,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplicationsRequest,
  });

  const recentApplications = applicationsData?.data?.slice(0, 5) || [];
  console.log(applicationsData);

  if (statsError) {
    return <p className="text-red-500 text-sm">Something went wrong.</p>;
  }

  if (applicationsError) {
    return <p className="text-red-500 text-sm">Something went wrong.</p>;
  }

  const getCount = (status) => {
    if (!statsData?.data) return 0;
    const found = statsData.data.find((item) => item.status === status);
    return found ? found.count : 0;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">
          Track your job application progress
        </p>
      </div>

      {/* Stat Cards */}
      {statsLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((card) => (
            <div
              key={card.status}
              className={`${card.bg} ${card.border} border rounded-2xl p-6`}
            >
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className={`text-3xl font-bold mt-2 ${card.color}`}>
                {getCount(card.status)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Recent Applications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Applications
        </h3>

        {applicationsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : recentApplications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-10 text-center">
            <p className="text-gray-400 text-sm">
              No applications yet. Start tracking your jobs!
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {app.company_name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{app.position}</p>
                </div>
                <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium capitalize">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
