import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const InputData = ({ InputDiv, setInputDiv, updateData, SetUpdateData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [Data, SetData] = useState({ title: "", description: "" });

  useEffect(() => {
    SetData({ title: updateData.title, description: updateData.description });
  }, [updateData]);

  const Change = (e) => {
    const { name, value } = e.target;
    SetData({ ...Data, [name]: value });
    console.log(Data);
  };

  const Create = async () => {
    try {
      if (Data.title === "" || Data.description === "") {
        alert("All  fields are required!!!!");
      } else {
        const response = await axios.post(
          `${window.location.origin}/api/V2/create-task`,
          Data,
          { headers }
        );
        SetData({ title: "", description: "" });
        console.log(response);
        setInputDiv(!InputDiv);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (id) => {
    try {
      await axios.put(
        `${window.location.origin}/api/V2/update-tasks/${id}`,
        Data,
        {
          headers,
        }
      );
      setInputDiv(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={`${
          InputDiv
            ? "fixed top-0 left-0 bg-gray-600 opacity-50 w-full h-screen"
            : "hidden"
        } `}
      ></div>
      <div
        className={`${
          InputDiv
            ? "fixed top-0 left-0 flex items-center justify-center w-full h-screen"
            : "hidden"
        }  `}
      >
        <div className="bg-gray-900 rounded-md p-4  w-3/6  text-black">
          <div className="flex justify-end">
            <button
              className="text-2xl font-bold text-white pb-2 "
              onClick={() => {
                setInputDiv(false);
                SetData({ title: "", description: "" });
                SetUpdateData({
                  id: "",
                  title: "",
                  description: "",
                });
              }}
            >
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            placeholder="title"
            name="title"
            className="px-4 py-2 w-full rounded-md  font-bold outline-none bg-purple-500"
            value={Data.title}
            onChange={Change}
          />
          <textarea
            name="description"
            placeholder="description..."
            cols="30"
            rows="13"
            className="p-4 mt-4 w-full rounded-md  font-semibold outline-none bg-purple-500"
            value={Data.description}
            onChange={Change}
          ></textarea>
          {updateData.id === "" ? (
            <button
              className="px-6 py-2 mt-2 text-lg font-bold bg-blue-500 rounded-md hover:scale-105 hover:bg-blue-400 transition-all duration-300"
              onClick={Create}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-6 py-2 mt-2 text-lg font-bold bg-blue-500 rounded-md hover:scale-105 hover:bg-blue-400 transition-all duration-300"
              onClick={() => update(updateData.id)}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
