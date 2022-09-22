import React from "react";

const ExamDropDown = () => {
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
        Exam
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
          <a
            className="dropdown-item"
            onClick={() => console.log("practise exam")}
            href="#"
          >
            practice Exam
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            exam without timer
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            exam with timer
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ExamDropDown;
