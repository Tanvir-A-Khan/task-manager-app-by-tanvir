import React from "react";
import ThemeToggle from "./components/util/ThemeToggle";
import TaskManagement from "./components/task/TaskManagement";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <header className="p-4 bg-white dark:bg-gray-800 shadow">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Project Goals</h2>
        </div>
        <TaskManagement />
      </main>
      <Footer />
    </div>
  );
};

export default App;
