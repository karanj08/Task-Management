import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

const Cards = ({ home, setInputDiv, data, SetUpdateData }) => {
  // const data = [
  //   {
  //     title: "React hooks",
  //     desc: "Revise react hooks and complete todo app.",
  //     status: "Completed",
  //   },
  //   {
  //     title: "Mongo DB practice",
  //     desc: "Practice aggregation Pipeline and rivise indexes",
  //     status: "Completed",
  //   },
  //   {
  //     title: "git lecture",
  //     desc: "finish hitesh sir's git lecture and make notes if found something new and complicated",
  //     status: "In completed",
  //   },
  //   {
  //     title: "Project",
  //     desc: "Redesign udhar app and start thinking about UI/UX for the app",
  //     status: "Completed",
  //   },
  // ];

  // const data = Data.tasks;
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `${window.location.origin}/api/V2/update-complete-tasks/${id}`,
        {},
        { headers }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImpTask = async (id) => {
    try {
      await axios.put(
        `${window.location.origin}/api/V2/update-imp-tasks/${id}`,
        {},
        { headers }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = async (id, title, description) => {
    setInputDiv(true);
    SetUpdateData({ id: id, title: title, description: description });
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `${window.location.origin}/api/V2/delete-tasks/${id}`,
        { headers }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {/* {console.log(data)} */}
      {data.tasks?.map((items, i) => (
        <div
          className="bg-purple-900 rounded-xl p-4 flex flex-col justify-between"
          key={i}
        >
          <div>
            <span>
              <h3 className="text-xl font-bold">{items.title}</h3>
              <hr className="mb-2 mt-1" />
            </span>
            <p className="text-black font-semibold my-2">{items.description}</p>
          </div>
          <div className="flex w-full">
            <button
              className={`${
                items.completed ? "bg-green-400" : "bg-red-400"
              }  px-2 py-1 w-1/2 hover:scale-110 transition-all duration-300 rounded-md`}
              onClick={() => handleCompleteTask(items._id)}
            >
              {items.completed ? "completed" : "incomplete"}
            </button>

            <div className="flex items-center justify-around text-2xl w-1/2 text-gray-900 ">
              <button
                className="hover:scale-125 transition-all duration-300"
                onClick={() => handleImpTask(items._id)}
              >
                {items.important ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
              <button
                className="hover:scale-125 transition-all duration-300"
                onClick={() =>
                  handleEditTask(items._id, items.title, items.description)
                }
              >
                <FaEdit />
              </button>
              <button
                className="hover:scale-125 transition-all duration-300"
                onClick={() => handleDeleteTask(items._id)}
              >
                <MdDeleteForever />
              </button>
            </div>
          </div>
        </div>
      ))}
      {home && (
        <div
          className="text-gray-300 flex flex-col items-center bg-gray-700 justify-center rounded-md p-4 hover:scale-105 hover:text-gray-200 transition-all duration-300 cursor-pointer"
          onClick={() => {
            setInputDiv(true);
          }}
        >
          <IoMdAddCircle className="text-4xl  " />
          <h2 className="text-2xl font-bold">Add Task</h2>
        </div>
      )}
    </div>
  );
};

export default Cards;
