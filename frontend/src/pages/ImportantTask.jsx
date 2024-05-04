import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";
import InputData from "../components/Home/InputData";

const ImportantTask = () => {
  const [Data, setData] = useState([]);
  const [updateData, SetUpdateData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [InputDiv, setInputDiv] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${window.location.origin}/api/V2/important-tasks`,
        { headers }
      );
      const tasks = response.data;
      setData(tasks);
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

export default ImportantTask;
