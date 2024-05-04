import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import { IoMdAddCircle } from "react-icons/io";
import InputData from "../components/Home/InputData";
import axios from "axios";

const Alltasks = () => {
  const [Data, setData] = useState({});
  const [updateData, SetUpdateData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

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

  const [InputDiv, setInputDiv] = useState(false);
  return (
    <>
      <div>
        <div className="w-full p-2 text-5xl text-gray-400 flex justify-end hover:text-gray-100 transition-all duration-300 cursor-pointer">
          <IoMdAddCircle
            onClick={() => {
              setInputDiv(true);
            }}
          />
        </div>
        <Cards
          home={true}
          setInputDiv={setInputDiv}
          data={Data}
          SetUpdateData={SetUpdateData}
          updateData={updateData}
        />
      </div>

      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        SetUpdateData={SetUpdateData}
        updateData={updateData}
      />
    </>
  );
};

export default Alltasks;
