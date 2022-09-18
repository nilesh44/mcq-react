import React, { ReactNode, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Error from "./Error";
import { url } from "inspector";

const Subject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    //validate string
    const regex = new RegExp("^[a-zA-Z]*$");
    if (!regex.test(event.target.value)) {
      setError(
        "only alphabate are allow e.g science . Numbers and special character are not allowed"
      );
    } else {
      setError("");
    }
    let upperCaseSubject = event.target.value.toUpperCase().toString();
    setSubjectName(() => {
      return upperCaseSubject;
    });
  };
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    console.log("handleSubmit called");
    event.preventDefault();
    fetch("http://localhost:8083/subject/create", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: subjectName }),
    })
      .then((response) => response)
      .then((response) => {
        if (!response.ok) {
          console.error("Error:", error);
          console.error(
            "Error:",
            response.json().then((data) => console.log(data))
          );
        } else {
          console.log(
            "Success:",
            response.text().then((data) => console.log(data))
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="row mt-5">
        <label
          className="col-sm-2 form-group"
          style={{ color: "#41F00A", fontSize: "30px", fontWeight: "bold" }}
        >
          Subject
        </label>
        <div className="col-sm-10 input-group-lg">
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter subject name"
            value={subjectName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <Error error={error} />
      </div>

      <button
        type="submit"
        className=" row btn btn-primary mt-5"
        style={{ color: "#000000", fontSize: "30px", fontWeight: "bold" }}
      >
        create subject
      </button>
    </form>
  );
};

export default Subject;
