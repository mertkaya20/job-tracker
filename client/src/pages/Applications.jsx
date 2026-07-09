import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteApplicationRequest,
  getApplicationsRequest,
} from "../api/applications";
import { useState } from "react";
import SkeletonCard from "../components/SkeletonCard";
import { formatDate } from "../utils/formatDate";
import ApplicationModal from "../components/ApplicationModal";
import { statusColors } from "../utils/statusColors";

const Applications = () => {
  const statuses = ["all", "applied", "interview", "offer", "rejected"];

  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState(null);

  const [selectedApplication, setSelectedApplication] = useState(null);

  const { data, isPending, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplicationsRequest,
  });

  const { mutate: deleteApplication, isPending: isDeleting } = useMutation({
    mutationFn: deleteApplicationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const applications = data?.data || [];
  const filteredApplications =
    activeFilter === "all"
      ? applications
      : applications.filter((app) => app.status === activeFilter);

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
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
        >
          + Add Application
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {statuses.map((status) => (
          <button
            onClick={() => setActiveFilter(status)}
            key={status}
            className="text-xs font-medium px-4 py-2 rounded-full border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors capitalize cursor-pointer"
          >
            {status}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {isPending ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : isError ? (
        <p className="text-red-500 text-sm">Something went wrong.</p>
      ) : filteredApplications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 px-6 py-10 text-center">
          <p className="text-gray-400 text-sm">No applications found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-gray-900">
                  {app.company_name}
                </p>
                <p className="text-xs text-gray-400">{app.position}</p>
                <p className="text-xs text-gray-300 mt-0.5">
                  {app.applied_date ? formatDate(app.applied_date) : "-"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${statusColors[app.status] || "bg-gray-50 text-gray-600"}`}
                >
                  {app.status}
                </span>
                <button
                  onClick={() => {
                    setSelectedApplication(app);
                    setIsOpen(true);
                  }}
                  className="text-xs text-gray-400 hover:text-primary transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  disabled={isDeleting}
                  onClick={() => deleteApplication(app.id)}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {errorMessage && (
        <p className="text-red-500 text-sm text-center mt-4">{errorMessage}</p>
      )}

      <ApplicationModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedApplication(null);
        }}
        application={selectedApplication}
      />
    </div>
  );
};

export default Applications;
