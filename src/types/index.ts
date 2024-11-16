export type PriorityLevels = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: PriorityLevels;
  tags: string[];
}

export interface FilterOptions {
  tag: string;
  priority: string;
  search: string;
}

export interface TaskFormProps {
  onClose: () => void;
  task?: Task;
}

export interface TaskListProps {
  filter: FilterOptions;
}

export interface TagFilterProps {
  onFilterChange: (filter: FilterOptions) => void;
}

export interface LoadingProps {
  title?: string;
}

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

export interface TaskFilter {
  tag: string;
  priority: string;
  search: string;
}