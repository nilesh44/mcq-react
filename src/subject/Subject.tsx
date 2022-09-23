import React, { ReactNode, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Error from "./Error";
import { createSubjectUrl } from "../utilities/constant";
import { ErrorResponse } from "../Dto/ErrorResponse";
import { SuccessResponse } from "../Dto/SuccessResponse";
import Success from "../utilities/Success";
const Subject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function validateSubjectName(subjectName: string): void {
    console.log("subject Name " + subjectName);
    const regex = new RegExp("^[a-zA-Z ]*$");
    if (
      subjectName === null ||
      subjectName === "" ||
      !regex.test(subjectName)
    ) {
      setErrorMsg(
        "only alphabate are allow e.g science . Numbers and special character are not allowed"
      );
    } else {
      setErrorMsg("");
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const subjectName: string = event.target.value;
    validateSubjectName(subjectName);

    let upperCaseSubjectName = subjectName.toUpperCase();
    setSubjectName(() => {
      return upperCaseSubjectName;
    });
  };

  const createSubject = (event: React.SyntheticEvent<HTMLFormElement>) => {
    console.log("createSubject called");
    event.preventDefault();
    console.log("subject Name " + subjectName);
    let subName: string = subjectName.trim();
    if (subName === "" || subName === null) {
      setErrorMsg("please Enter subject name");
    } else {
      fetch(createSubjectUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: subName }),
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

  return (
    <form className="container" onSubmit={createSubject}>
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
        create subject
      </button>
    </form>
  );
};

export default Subject;
