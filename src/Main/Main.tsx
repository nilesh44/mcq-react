import React from "react";
import { useSelector } from "react-redux/es/exports";
import Subject from "../subject/Subject";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { mainComponentslice } from "../Redux/MainContentSlice";
import { useAppDispatch, useAppSelector } from "../Redux/MainComponentHooks";
import CreateTest from "../mcqTest/CreateTest";
import CreateQuestion from "../Questions/CreateQuestion";
import GetAllQuestion from "../Questions/GetAllQuestion";
const Main = () => {
  const componentName = useAppSelector(
    (state) => state.mainComponents.componentName
  );

  console.log("updatedComponentName: " + componentName);
  if (componentName === "createSubject") {
    return <Subject />;
  }
  if (componentName === "createTest") {
    return <CreateTest />;
  }
  if (componentName === "createQuestion") {
    return <CreateQuestion />;
  }
  if (componentName === "getAllQuestion") {
    return <GetAllQuestion />;
  }
  return <div>Main</div>;
};

export default Main;
