import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, getTaskById } from "../../services/mockApi";
import { Task, TaskFilter, TaskState } from "../../types";
import Button from "../common/Button";
import Modal from "../common/Modal";
import TaskForm from "./TaskForm";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import TaskDetail from "./TaskDetail";
import TagFilter from "./TagFilter";
import { useDispatch, useSelector } from "react-redux";
import { deleteLocalTask, setTasks } from "../../store/slices/taskSlice";
import TaskList from "./TaskList";

const TaskManagement: React.FC = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [details, setDetails] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<TaskFilter>({
    tag: "",
    priority: "",
    search: "",
  });

  const dispatch = useDispatch();
  const { tasks } = useSelector((state: { tasks: TaskState }) => state.tasks);

  const toggleForm = () => setIsFormOpen((prev) => !prev);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await getTasks();
        dispatch(setTasks(data));
      } catch (err) {
        setError("Failed to fetch tasks - " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (task: Task) => {
    try {
      await deleteTask(task.id);
      dispatch(deleteLocalTask(task));
      toast.warning("Task deletion completed");
    } catch (err) {
      toast.error("Task could not be deleted");
      console.error("Failed to delete task:", err);
    }
  };

  const handleEdit = async (taskId: string) => {
    try {
      const task = await getTaskById(taskId);
      setEditingTask(task);
    } catch (err) {
      console.error("Failed to fetch task for editing:", err);
    }
  };

  const handleTaskDetails = (taskId: string) => {
    setDetails(taskId);
  };

  const handleCloseModal = () => {
    setDetails(null);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = task.title
      .toLocaleLowerCase()
      .includes(filter.search.toLocaleLowerCase());
    const matchesTag = filter.tag ? task.tags.includes(filter.tag) : true;
    const matchesPriority = filter.priority
      ? task.priority === filter.priority
      : true;
    return matchesTag && matchesPriority && matchesTitle;
  });

  if (loading) return <Loading title="Getting Data" />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid gap-4">
      <TagFilter onFilterChange={setFilter} />
      <Button
        onClick={toggleForm}
        className="bg-secondary text-white px-4 rounded shadow hover:bg-primary"
      >
        Add New Task
      </Button>
      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleTaskDetails}
      />

      {/* MODALS */}
      {editingTask && (
        <Modal
          isOpen={!!editingTask}
          onClose={handleCloseModal}
          title="Edit Task"
        >
          <TaskForm onClose={handleCloseModal} task={editingTask} />
        </Modal>
      )}

      {details && (
        <TaskDetail
          taskId={details}
          isOpen={!!details}
          onClose={handleCloseModal}
        />
      )}

      {isFormOpen && (
        <div className="mb-4">
          <Modal isOpen={isFormOpen} onClose={toggleForm} title="Create">
            <TaskForm onClose={toggleForm} />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;
