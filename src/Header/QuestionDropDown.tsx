import React from "react";
import { useAppDispatch } from "../Redux/MainComponentHooks";
import { changeComponent, MainComponentState } from "../Redux/MainContentSlice";

const QuestionDropDown = () => {
  const dispatch = useAppDispatch();

  const gotoCreateQuestion = () => {
    console.log("gotoCreateTest");
    const mainComponentState: MainComponentState = {
      componentName: "createQuestion",
    };
    dispatch(changeComponent(mainComponentState));
  };
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          color: "#000000",
          fontSize: "30px",
          fontWeight: "bold",
          backgroundColor: "#BF32E5",
        }}
      >
        Question
      </button>
      <ul
        className="dropdown-menu"
        style={{
          color: "#000000",
          fontSize: "30px",
          fontWeight: "bold",
          backgroundColor: "#E5BF59",
        }}
      >
        <li>
          <a className="dropdown-item" href="#" onClick={gotoCreateQuestion}>
            create question
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            update question
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            delete question
          </a>
        </li>
      </ul>
    </div>
  );
};

export default QuestionDropDown;
