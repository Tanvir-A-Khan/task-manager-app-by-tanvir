import React from "react";
import { Task } from "../../types";
import Button from "../common/Button";

interface TaskListProps {
  tasks: Task[];
  onEdit: (taskId: string) => void;
  onDelete: (task: Task) => void;
  onDetails: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onDetails }) => {
  if (tasks.length === 0) {
    return <p className="text-gray-600 dark:text-gray-300">No tasks found.</p>;
  }

  return (
    <>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 rounded shadow hover:cursor-pointer 
            bg-white dark:bg-gray-700 
            hover:bg-green-100 dark:hover:bg-gray-600`}
          onClick={() => onDetails(task.id)}
        >
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p
            className="text-sm text-gray-600 dark:text-gray-300 truncate-line"
            title={task.description}
          >
            {task.description}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400">Due: {task.dueDate}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Priority: {task.priority}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Tags: {task.tags.join(", ")}</p>

          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task.id);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task);
            }}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};

export default TaskList;
