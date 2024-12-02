import React from "react";
import CreateExam from "./Pages/CreateExam";
import HeaderForm from "./components/HeaderForm";

const FormHome = () => {
  return (
    <div className="form_home">
      <HeaderForm />
      <CreateExam />
    </div>
  );
};

export default FormHome;
