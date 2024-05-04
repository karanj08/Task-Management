import React, { useEffect } from "react";
import Home from "./pages/Home.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Alltasks from "./pages/Alltasks.jsx";
import ImportantTask from "./pages/ImportantTask.jsx";
import CompletedTask from "./pages/CompletedTask.jsx";
import IncompletedTask from "./pages/IncompletedTask.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/auth.slice.js";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isloggedin = useSelector((state) => state.auth.isloggedin);

  if (localStorage.getItem("id") && localStorage.getItem("token")) {
    dispatch(login());
  }
  useEffect(() => {
    if (!isloggedin) {
      navigate("/sign-in");
    }
  }, [isloggedin]);
  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<Alltasks />} />
          <Route path="/importanttask" element={<ImportantTask />} />
          <Route path="/completedtask" element={<CompletedTask />} />
          <Route path="/incompletedtask" element={<IncompletedTask />} />
        </Route>
        <Route path="/sign-in" element={<Signup />} />
        <Route path="/log-in" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
