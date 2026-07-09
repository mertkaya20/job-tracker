import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { applicationSchema } from "../schemas/application-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addApplicationRequest,
  updateApplicationRequest,
} from "../api/applications";
import { useEffect, useState } from "react";

const AddApplicationModal = ({ application, isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm({
    resolver: yupResolver(applicationSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (application) {
      reset({
        company_name: application.company_name,
        position: application.position,
        status: application.status,
        applied_date: application.applied_date || "",
        notes: application.notes || "",
      });
    } else {
      reset({
        company_name: "",
        position: "",
        status: "applied",
        applied_date: "",
        notes: "",
      });
    }
  }, [application, isOpen]);

  const [errorMessage, setErrorMessage] = useState(null);

  const queryClient = useQueryClient();

  const { mutate: addApplication, isPending: isAdding } = useMutation({
    mutationFn: addApplicationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      onClose();
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const { mutate: updateApplication, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, changes }) => updateApplicationRequest(id, changes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      onClose();
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data) => {
    if (application) {
      updateApplication({ id: application.id, changes: data });
    } else {
      addApplication(data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            {application ? "Edit Application" : "Add Application"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              {...register("company_name")}
              type="text"
              placeholder="Google"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary transition-colors"
            />
            {errors.company_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.company_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              {...register("position")}
              type="text"
              placeholder="Frontend Developer"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary transition-colors"
            />
            {errors.position && (
              <p className="text-red-500 text-xs mt-1">
                {errors.position.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary transition-colors bg-white"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applied Date
            </label>
            <input
              {...register("applied_date")}
              type="date"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary transition-colors"
            />
            {errors.applied_date && (
              <p className="text-red-500 text-xs mt-1">
                {errors.applied_date.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes <span className="text-gray-300">(optional)</span>
            </label>
            <textarea
              {...register("notes")}
              placeholder="Any notes about this application..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary transition-colors resize-none"
            />
            {errors.notes && (
              <p className="text-red-500 text-xs mt-1">
                {errors.notes.message}
              </p>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <div className="flex gap-3 mt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={!isValid || isAdding}
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {application
                ? isUpdating
                  ? "Updating..."
                  : "Update"
                : isAdding
                  ? "Adding..."
                  : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplicationModal;
