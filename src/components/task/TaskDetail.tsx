import React, { useEffect, useState } from "react";
import { Task } from "../../types";
import { format } from "date-fns";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { getTaskById } from "../../services/mockApi";
import { toast } from "react-toastify";

interface TaskDetailProps {
  taskId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ taskId, isOpen, onClose }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getTaskDetails = (taskId: string) => {
    setLoading(true);
    setError(null);
    getTaskById(taskId)
      .then((task) => {
        setTask(task);
      })
      .catch(() => {
        setError("Failed to load task details.");
        toast.error("Error loading task details.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isOpen && taskId) {
      getTaskDetails(taskId);
    } else {
      setTask(null);
    }
  }, [taskId, isOpen]);

  if (!task || !taskId || !isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details">
      <div className="p-4 bg-white dark:bg-gray-700 rounded shadow dark:text-gray-100">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {task?.title || "No title provided"}
              </h3>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Description
              </h4>
              <p className="mt-1 text-gray-900 dark:text-gray-100">
                {task?.description || "No description provided."}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Due Date
              </h4>
              <p className="mt-1 text-gray-900 dark:text-gray-100">
                {task?.dueDate
                  ? format(new Date(task.dueDate), "MMMM d, yyyy")
                  : "No due date set."}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Priority
              </h4>
              <span
                className={`mt-1 mb-2 inline-block rounded-full px-2 py-1 text-xs ${
                  task?.priority === "High"
                    ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                    : task?.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                    : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                }`}
              >
                {task?.priority || "Low"}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Tags
              </h4>
              {task?.tags && task.tags.length > 0 ? (
                <div className="mt-1 flex flex-wrap gap-2 mb-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1 text-xs font-medium text-gray-800 bg-gray-200 dark:text-gray-200 dark:bg-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  No tags assigned.
                </p>
              )}
            </div>
          </>
        )}

        <Button
         variant="danger"
          onClick={onClose}
          className="w-full bg-primary dark:bg-primary-dark text-white dark:text-white hover:bg-opacity-90"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default TaskDetail;
