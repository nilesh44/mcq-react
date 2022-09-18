import { url } from "inspector";
import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
const GetSubject = () => {
  let [subjects, setSubject] = useState<string[]>([""]);
  const getSubject = (): void => {
    fetch("http://localhost:8083/subject/getAll", {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response)
      .then((response) => {
        if (!response.ok) {
          console.error("Error:");
          console.error(
            "Error:",
            response.json().then((data) => console.log(data))
          );
        } else {
          console.log(
            "Success:",
            response.json().then((data) => {
              console.log(data);
              setSubject(() => data);
            })
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="row dropdown">
      <button
        className=" col-3 btn btn-primary dropdown-toggle mt-5"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ color: "#000000", fontSize: "30px", fontWeight: "bold" }}
        onClick={getSubject}
      >
        SHOW ALL Subject
      </button>
      <ul
        className=" col-3 dropdown-menu"
        aria-labelledby="dropdownMenuButton1"
      >
        {subjects.sort().map((subject) => {
          return (
            <li>
              <a
                className="dropdown-item"
                href="#"
                style={{
                  color: "#000000",
                  fontSize: "30px",
                  fontWeight: "normal",
                }}
              >
                {subject}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GetSubject;
