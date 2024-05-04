import React, { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { MdLabelImportant } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth.slice";

const Sidebar = () => {
  const data = [
    {
      title: "All Task",
      icon: <FaTasks />,
      link: "/",
      status: "Offpage",
    },
    {
      title: "Important Task",
      icon: <MdLabelImportant />,
      link: "/importanttask",
      status: "Offpage",
    },
    {
      title: "Completed Task",
      icon: <FaCheckCircle />,
      link: "/completedtask",
      status: "Offpage",
    },
    {
      title: "Incompleted Task",
      icon: <MdOutlinePendingActions />,
      link: "/incompletedtask",
      status: "Offpage",
    },
  ];
  const dispatch = useDispatch();
  // const [bg, setbg] = useState("Offpage");
  const [Data, setData] = useState({});
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const Out = () => {
    localStorage.clear("id");
    localStorage.clear("id");
    dispatch(logout());
  };
  // const handlebg = (i) => {
  //   if(data[i].status === "Offpage") {
  //     data[i].status = "Onpage"

  //   }else {
  //     data[i].status=
  //   }
  // };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${window.location.origin}/api/V2/get-all-tasks`,
        { headers }
      );
      // console.log(response);
      setData(response.data.data);
    };
    fetch();
    // console.log(headers);
  });

  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-gray-400">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className={`my-2 flex gap-2 items-center hover:bg-gray-600 p-2 rounded transition-all duration-300 `}
            // onClick={()=>handlebg(i)}
          >
            <span className=" text-xl">{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </div>
      <div>
        <button
          className="bg-pink-500 w-full p-2 rounded hover:bg-purple-600 hover:font-semibold transition-all duration-300 "
          onClick={Out}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
