import React, { FC, useState } from "react";
import { SelectSubjectProp } from "../props/GetAllSubjectProp";

const GetAllSubject: FC<SelectSubjectProp> = (props): JSX.Element => {
  let [subjects, setSubject] = useState<string[]>([""]);
  const getAllSubject = (): void => {
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
    <div>
      <label
        htmlFor="subjects"
        style={{ color: "#FC38F8", fontSize: "30px", fontWeight: "bold" }}
      >
        Select Subject :
      </label>
      <select
        style={{ color: "#7231FC", fontSize: "25px", fontWeight: "bold" }}
        name="subjects"
        id="subjects"
        onChange={(event) => props.setSubjectName(event)}
        onClick={getAllSubject}
      >
        {subjects.sort().map((subject) => {
          return <option value={subject}> {subject}</option>;
        })}
      </select>
    </div>
  );
};

export default GetAllSubject;
