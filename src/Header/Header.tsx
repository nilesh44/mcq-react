import React from "react";
import SubjectDropDwon from "./SubjectDropDwon";

import QuestionDropDown from "./QuestionDropDown";
import TestDropDown from "./TestDropDown";
import ExamDropDown from "./ExamDropDown";
import { configureStore } from "@reduxjs/toolkit";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { mainComponentStore } from "../Redux/MaincomponentStore";
import { Provider } from "react-redux";
const Header = () => {
  return (
    <div className="container">
      <div className="d-flex flex-row bd-highlight mb-3">
        <div className="flex-fill">
          <Provider store={mainComponentStore}>
            <SubjectDropDwon />
          </Provider>
        </div>
        <div className="flex-fill">
          <Provider store={mainComponentStore}>
            <TestDropDown />
          </Provider>
        </div>
        <div className="flex-fill">
          <Provider store={mainComponentStore}>
            <QuestionDropDown />
          </Provider>
        </div>
        <div className="flex-fill">
          <Provider store={mainComponentStore}>
            <ExamDropDown />
          </Provider>
        </div>
      </div>
    </div>
  );
};

export default Header;
