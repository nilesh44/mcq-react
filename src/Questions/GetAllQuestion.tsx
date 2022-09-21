import React, { useState } from "react";
import { GetQuestionResponse } from "./GetQuestionResponseI";
import SelectSubject from "../subject/GetAllSubject";
import GetAllTest from "../mcqTest/GetAllTest";
const GetAllQuestion = () => {
  const [GetQuestionResponse, setGetQuestionResponse] =
    useState<GetQuestionResponse[]>();

  const [subjectName, setSubjectName] = useState("");

  const [testName, setTestName] = useState("");

  const handleSetSubjectName = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("******** set subject name******");
    console.log(event.target.value);
    setSubjectName(event.target.value);
  };
  //setTest Name
  const handleSetTestName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("******** set Test name******");
    console.log(event.target.value);
    setTestName(event.target.value);
  };

  const getAllQuestion = (): void => {
    console.log("getAll question");
    // console.log("subject name : " + subjectName);
    console.log("&&&&&&&&&&&&&&&&&&");
    console.log("subjectName : " + subjectName);
    console.log("testName : " + testName);
    let url: string =
      "http://localhost:8083/question/getAll" +
      "/" +
      testName +
      "/" +
      subjectName;
    console.log(url);
    fetch(url, {
      method: "GET",
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
              setGetQuestionResponse(() => data);
            })
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  let count = 1;
  return (
    <div>
      <SelectSubject setSubjectName={handleSetSubjectName} />
      <GetAllTest subjectName={subjectName} setTestName={handleSetTestName} />
      <div className="row mt-3">
        <div className="col-2">
          <input
            type="button"
            value="Get ALl Question"
            onClick={getAllQuestion}
            style={{
              color: "#7231FC",
              backgroundColor: "#000000",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          />
        </div>
      </div>

      {GetQuestionResponse?.map((question) => {
        return (
          <div className="row justify-content-start mt-5">
            <div className="col-1">
              <h1
                className="text-start"
                style={{
                  color: "#000000",
                  fontSize: "25px",
                  fontWeight: "bold",
                  backgroundColor: "#FF56FB",
                }}
              >
                {count++}
                {".  "}
              </h1>
            </div>
            <div className="col-11">
              <h1
                className="text-start"
                style={{
                  color: "#000000",
                  fontSize: "25px",
                  fontWeight: "bold",
                  backgroundColor: "#57FF6A",
                }}
              >
                {question.question}
              </h1>
            </div>
            <div className="row justify-content-start">
              {question.options.map((option) => {
                return (
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault"
                      style={{
                        color: "#000000",
                        fontSize: "25px",
                        fontWeight: "bold",
                      }}
                      // value={props.id}
                      //onChange={(e) => props.getCorrectAnswer(e, parseInt(props.id))}
                    />
                    <label
                      className="col-10 form-check-label text-start"
                      htmlFor="flexRadioDefault"
                      style={{
                        color: "#000000",
                        fontSize: "25px",
                        fontWeight: "bold",
                      }}
                    >
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GetAllQuestion;
