import React from "react";

const SubjectDropDwon = () => {
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
          <a className="dropdown-item" href="#">
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
