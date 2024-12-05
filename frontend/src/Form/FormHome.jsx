import React, { useState } from "react";
import CreateExam from "./Pages/CreateExam";
import HeaderForm from "./components/HeaderForm";

const FormHome = () => {
  const [title, setTitle] = useState("Mẫu không có tiêu đề");

  return (
    <div>
      <HeaderForm title={title} setTitle={setTitle} />
      <CreateExam title={title} setTitle={setTitle} />
    </div>
  );
};

export default FormHome;
