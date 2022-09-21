import React, { useState } from "react";
import Error from "../subject/Error";
import GetAllSubject from "../subject/GetAllSubject";

const CreateTest = () => {
  const [testName, setTestName] = useState("");
  const [error, setError] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    console.log("handleSubmit for test");
    event.preventDefault();
    fetch("http://localhost:8083/test/create", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ testName: testName, subjectName: subjectName }),
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
  const handleChangeForOption = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("---------------------");
    console.log(event.target.value);
    setSubjectName(event.target.value);
  };
  //handle change of input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    //validate string
    const regex = new RegExp("^[a-zA-Z0-9]*$");
    if (!regex.test(event.target.value)) {
      setError(
        "only alphabate and numbers are allow e.g science . special character are not allowed"
      );
    } else {
      setError("");
    }
    let upperCaseSubject = event.target.value.toUpperCase().toString();
    setTestName(() => {
      return upperCaseSubject;
    });
  };

  //return view
  return (
    <form className="container" onSubmit={handleSubmit}>
      <GetAllSubject setSubjectName={handleChangeForOption} />

      <div className="row mt-5">
        <label
          className="col-sm-2 form-group"
          style={{ color: "#41F00A", fontSize: "30px", fontWeight: "bold" }}
        >
          Test Name
        </label>
        <div className="col-sm-10 input-group-lg">
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter Test name"
            value={testName}
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
        create new Test
      </button>
    </form>
  );
};

export default CreateTest;
