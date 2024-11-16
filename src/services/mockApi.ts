import { Task } from "../types";

let mockTasks: Task[] = [];
const localData = localStorage.getItem("tasks");
if (localData) {
  mockTasks = JSON.parse(localData);
} else {
  mockTasks = [
    {
      id: "1",
      title: "Design Database Schema",
      description:
        "Design schema for user and task management Design schema for user and task management Design schema for user and task management Design schema for user and task managementDesign schema for user and task management",
      dueDate: "2024-12-01",
      priority: "High",
      tags: ["Backend", "Frontend"],
    },
    {
      id: "2",
      title: "Implement User Authentication",
      description: "Set up login and registration features",
      dueDate: "2024-12-10",
      priority: "Medium",
      tags: ["Backend", "Documentation"],
    },
  ];
}

const storeToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const getTasks = async (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockTasks]), 300);
  });
};
export const getTaskById = async (id: string): Promise<Task> => {
  return new Promise((resolve) => {
    const task = mockTasks.filter((task) => task.id === id)[0];
    setTimeout(() => resolve(task), 500);
  });
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask = { ...task, id: String(mockTasks.length + 1) };
      mockTasks.push(newTask);
      storeToLocalStorage(mockTasks);
      resolve(newTask);
    }, 500);
  });
};

export const updateTask = async (
  id: string,
  updatedTask: Partial<Task>
): Promise<Task> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taskIndex = mockTasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) return reject(new Error("Task not found"));
      mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updatedTask };
      storeToLocalStorage(mockTasks);
      resolve(mockTasks[taskIndex]);
    }, 500);
  });
};

export const deleteTask = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taskIndex = mockTasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) return reject(new Error("Task not found"));
      mockTasks.splice(taskIndex, 1);
      storeToLocalStorage(mockTasks);
      resolve();
    }, 500);
  });
};
