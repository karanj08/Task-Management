import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";
import InputData from "../components/Home/InputData";

const IncompletedTask = () => {
  const [Data, setData] = useState([]);
  const [updateData, SetUpdateData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [InputDiv, setInputDiv] = useState(false);

  useEffect(() => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const fetch = async () => {
      const response = await axios.get(
        `${window.location.origin}/api/V2/incompleted-tasks`,
        { headers }
      );
      // console.log(response.data);
      setData(response.data);
    };
    fetch();
  }, [Data]);
  return (
    <>
      <div>
        <Cards
          home={false}
          data={Data}
          setInputDiv={setInputDiv}
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

export default IncompletedTask;
