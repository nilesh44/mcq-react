import React from "react";
import SubjectDropDwon from "./SubjectDropDwon";

import QuestionDropDown from "./QuestionDropDown";
import TestDropDown from "./TestDropDown";
import ExamDropDown from "./ExamDropDown";

const Header = () => {
  return (
    <div className="container">
      <div className="d-flex flex-row bd-highlight mb-3">
        <div className="flex-fill">
          <SubjectDropDwon />
        </div>
        <div className="flex-fill">
          <TestDropDown />
        </div>
        <div className="flex-fill">
          <QuestionDropDown />
        </div>
        <div className="flex-fill">
          <ExamDropDown />
        </div>
      </div>
    </div>
  );
};

export default Header;
