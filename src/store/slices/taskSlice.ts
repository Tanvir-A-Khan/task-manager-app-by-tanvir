import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types";

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addLocalTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateLocalTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteLocalTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
  },
});

export const { setLoading, setTasks, setError, addLocalTask, updateLocalTask, deleteLocalTask } = tasksSlice.actions;
export default tasksSlice.reducer;
