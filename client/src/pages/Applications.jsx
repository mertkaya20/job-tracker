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
import ConfirmModal from "../components/ConfirmModal";

const Applications = () => {
  const statuses = ["all", "applied", "interview", "offer", "rejected"];

  const queryClient = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplicationsRequest,
  });

  const { mutate: deleteApplication, isPending: isDeleting } = useMutation({
    mutationFn: deleteApplicationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      setConfirmOpen(false);
      setDeleteId(null);
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const applications = data?.data || [];
  const filteredApplications = applications
    .filter((app) => activeFilter === "all" || app.status === activeFilter)
    .filter(
      (app) =>
        app.company_name.toLowerCase().includes(search.toLowerCase()) ||
        app.position.toLowerCase().includes(search.toLowerCase()),
    );

  const itemsPerPage = 5;

  const paginatedApplications = filteredApplications.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const handleFilterChange = (status) => {
    setActiveFilter(status);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage your job applications
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer w-full sm:w-auto"
          >
            + Add Application
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by company or position..."
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {statuses.map((status) => (
          <button
            onClick={() => handleFilterChange(status)}
            key={status}
            className={`text-xs font-medium px-4 py-2 rounded-full border transition-colors capitalize cursor-pointer ${
              activeFilter === status
                ? "bg-primary text-white border-primary"
                : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
            }`}
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
          {paginatedApplications.map((app) => (
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
                {app.notes && (
                  <p className="text-xs text-gray-300 mt-0.5">{app.notes}</p>
                )}
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
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  onClick={() => {
                    setDeleteId(app.id);
                    setConfirmOpen(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    page === p
                      ? "bg-primary text-white border-primary"
                      : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
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
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
        onConfirm={() => deleteApplication(deleteId)}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Applications;
