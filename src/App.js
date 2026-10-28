
import { HashRouter, useRoutes } from "react-router-dom";
import LogIn from "./core/log-in/log-in-main";
import "./App.css";
import Home from "./core/home/Home";
import TaskList from "./feathure/task-list/task-list";
import { ProviderSideBar } from "./core/side-bar-context/side-bar-context-method";
import AddTaskForm from "./feathure/add-task-list/add-person-to-task-list";

function AppRoutes() {
  const routs = [
    {
      path: "/",
      element: <LogIn />
    },
    {
      path: "/LogIn",
      element: <LogIn />
    },
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "tasklist",
          element: <TaskList />
        },
        {
          path: "addtasklist",
          element: <AddTaskForm />
        }
      ]
    }
  ];

  return useRoutes(routs);
}

function App() {
  return (
    <ProviderSideBar>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ProviderSideBar>
  );
}

export default App;
