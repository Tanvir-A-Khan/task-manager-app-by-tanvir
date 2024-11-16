import React from "react";
import { useForm } from "react-hook-form";
import { Task, TaskFormProps } from "../../types";
import Button from "../common/Button";
import { createTask, updateTask } from "../../services/mockApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  addLocalTask,
  updateLocalTask,
} from "../../store/slices/taskSlice";

const TaskForm: React.FC<TaskFormProps> = ({ onClose, task }) => {
  const dispatch = useDispatch();

  const isEditing = !!task;

  const TAGS = ["Backend", "Frontend", "Documentation"];

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: {
      title: isEditing && task ? task.title : "",
      description: isEditing && task ? task.description : "",
      dueDate: isEditing && task ? task.dueDate : "",
      priority: isEditing && task ? task.priority : "Low",
      tags: isEditing && task ? task.tags : [],
    },
  });

  const onSubmit = async (data: Omit<Task, "id">) => {
    try {
      if (task === undefined) {
        const toastId = toast("Loading...", {
          isLoading: true, // Marks the toast as loading
          autoClose: false, // Prevents it from auto-closing
        });
        const res = await createTask(data)
        dispatch(addLocalTask(res));
        toast.update(toastId, {
          render: "Task Created successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        const toastId = toast("Loading...", {
          isLoading: true, // Marks the toast as loading
          autoClose: false, // Prevents it from auto-closing
        });
        const res = await updateTask(task.id, data);
        dispatch(updateLocalTask(res))
        toast.update(toastId, {
          render: "Task Updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error saving task:", error);
    } finally {
      onClose();
    }
  };

  const toggleTag = (tag: string) => {
    const currentTags = getValues("tags"); // Get the current selected tags
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag) // Remove the tag if it is already selected
      : [...currentTags, tag]; // Add the tag if it is not selected

    setValue("tags", updatedTags, { shouldValidate: true }); // Update the form state with the new tags
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-white rounded shadow dark:bg-gray-700"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-300">
        {isEditing ? "Edit Task" : "Create a New Task"}
      </h3>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          {...register("title", {
            required: "Title is required",
          })}
          className={`w-full px-3 py-2 mt-1 border rounded dark:bg-gray-600 dark:text-gray-300 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          {...register("description", {
            required: "Description is required",
          })}
          className={`w-full px-3 py-2 mt-1 border rounded dark:bg-gray-600 dark:text-gray-300 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Due Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Due Date
        </label>
        <input
          type="date"
          {...register("dueDate", {
            required: "Due date is required",
          })}
          className={`w-full px-3 py-2 mt-1 border rounded dark:bg-gray-600 dark:text-gray-300 ${
            errors.dueDate ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.dueDate && (
          <p className="text-sm text-red-500">{errors.dueDate.message}</p>
        )}
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Priority
        </label>
        <select
          {...register("priority", {
            required: "Priority is required",
          })}
          className="w-full px-3 py-2 mt-1 border rounded dark:bg-gray-600 dark:text-gray-300"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags
        </label>
        <div className="flex space-x-2 mt-1">
          {TAGS.map((tag) => (
            <label
              key={tag}
              className="flex items-center space-x-1 dark:text-gray-300"
            >
              <input
                type="checkbox"
                defaultChecked={getValues("tags").includes(tag)} // 'checked' ensures the state is linked to form values
                onChange={() => toggleTag(tag)}
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="secondary">
        {isEditing ? "Update Task" : "Save Task"}
      </Button>
      <Button onClick={onClose} variant="danger">
        Close
      </Button>
    </form>
  );
};

export default TaskForm;
