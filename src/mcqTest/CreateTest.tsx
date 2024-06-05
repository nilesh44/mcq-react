import React, { useState } from "react";
import Error from "../subject/Error";
import GetAllSubject from "../subject/GetAllSubject";
import { ErrorResponse } from "../Dto/ErrorResponse";
import { SuccessResponse } from "../Dto/SuccessResponse";
import Success from "../utilities/Success";

const CreateTest = () => {
  const [testName, setTestName] = useState("");

  const [subjectName, setSubjectName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function validateTestName(testName: string): void {
    const regex = new RegExp("^[a-zA-Z0-9]*$");
    if (!regex.test(testName)) {
      setErrorMsg(
        "only alphabate and numbers are allow e.g science .  special character are not allowed"
      );
    } else {
      setErrorMsg("");
    }
  }

  function validateBeforeCreateTest(): boolean {
    console.log("validateBeforeCreateTest");
    console.log(subjectName);
    if (subjectName === "" || subjectName === null) {
      setErrorMsg("please select subject Name");
      return false;
    }
    if (testName === "" || testName === null) {
      setErrorMsg("please enter testName message");
      return false;
    }
    return true;
  }
  const handleChangeForOptionSubject = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("---------------------");
    console.log(event.target.value);
    setSubjectName(event.target.value);
  };

  const handleChangeTestname = (event: React.ChangeEvent<HTMLInputElement>) => {
    let testName: string = event.target.value;
    validateTestName(testName);

    let upperCaseSubject = testName.toUpperCase().toString();
    setTestName(() => {
      return upperCaseSubject.trim();
    });
  };

  const createTest = (event: React.SyntheticEvent<HTMLFormElement>) => {
    console.log("handleSubmit for test");
    event.preventDefault();
    if (validateBeforeCreateTest()) {
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
            setSuccessMsg("");
            response
              .json()
              .then((data: ErrorResponse) => setErrorMsg(data.msg));
            console.error("Error:", errorMsg);
          } else {
            setErrorMsg("");
            response
              .json()
              .then((data: SuccessResponse) => setSuccessMsg(data.msg));
            console.error("success:", successMsg);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  //return view
  return (
    <form className="container" onSubmit={createTest}>
      <GetAllSubject setSubjectName={handleChangeForOptionSubject} />

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
            onChange={handleChangeTestname}
          />
        </div>
      </div>

      <div>
        <Error error={errorMsg} />
      </div>
      <div>
        <Success successMsg={successMsg} />
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
