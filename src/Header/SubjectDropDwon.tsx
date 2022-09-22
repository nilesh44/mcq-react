import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { changeComponent } from "../Redux/MainContentSlice";
import { MainComponentState } from "../Redux/MainContentSlice";
import { useAppDispatch } from "../Redux/MainComponentHooks";

const SubjectDropDwon = () => {
  const dispatch = useAppDispatch();

  const gotoCreateSubject = () => {
    console.log("gotoCreateSubject");
    const mainComponentState: MainComponentState = {
      componentName: "createSubject",
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
        subject
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
          <a className="dropdown-item" href="#" onClick={gotoCreateSubject}>
            create Subject
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            update subject
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            delete subject
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SubjectDropDwon;
