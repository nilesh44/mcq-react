import React, { useState } from "react";
import { GetQuestionResponse } from "./GetQuestionResponseI";
import SelectSubject from "../subject/GetAllSubject";
import GetAllTest from "../mcqTest/GetAllTest";
import { QuestionIdOptionIdMap } from "../props/QuestionIdOptionIdmap";
import { GetCorrectAnswerResponse } from "../props/GetCorrectAnswerResponse";
const GetAllQuestion = () => {
  const [GetQuestionResponse, setGetQuestionResponse] =
    useState<GetQuestionResponse[]>();

  const [subjectName, setSubjectName] = useState("");

  const [testName, setTestName] = useState("");
  const [questionIdError, setQuestionIdError] = useState<Map<number, String>>(
    new Map()
  );
  let questionIdOptionIdMap = new Map<number, number>();

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
  const setCorrectAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionId: number
  ) => {
    console.log("****setCorrectAnswer");
    //console.log(questionId);
    questionIdOptionIdMap.set(questionId, parseInt(event.target.value));

    console.log(questionIdOptionIdMap);
    console.log(questionIdOptionIdMap.has(questionId));
  };
  const submitQuestion = (
    event: React.MouseEvent<HTMLButtonElement>,
    questionId: number
  ) => {
    console.log(questionIdOptionIdMap.has(questionId));
    let optionId = questionIdOptionIdMap.get(questionId);
    console.log(questionIdOptionIdMap);
    console.log(questionId);
    console.log(optionId);

    console.log(
      JSON.stringify({
        questionId: questionId,
        optionId: optionId,
      })
    );

    fetch("http://localhost:8083/question/getCorrectAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId: questionId,
        optionId: optionId,
      }),
    })
      .then((response) => response)
      .then((response) => {
        response
          .json()
          .then((data: GetCorrectAnswerResponse) =>
            setQuestionIdError((map) => new Map(map.set(questionId, data.msg)))
          );

        console.log(
          "Success:",
          response.json().then((data) => console.log(data))
        );
        console.log(questionIdError);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const checkQuestion = (event: React.MouseEvent<HTMLButtonElement>) => {};
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
        //let questionId: number = question.questionId;

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
                      value={option.optionId}
                      onChange={(e) => setCorrectAnswer(e, question.questionId)}
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
                      {option.option}
                    </label>
                  </div>
                );
              })}
              <div
                className="row"
                style={{
                  color: "#000000",
                  fontSize: "30px",
                  fontWeight: "bold",
                  backgroundColor: "#FF5C94",
                }}
              >
                <h3 className="text-center">
                  {questionIdError.get(question.questionId)}
                </h3>
              </div>
            </div>
            <div className="row">
              <div className=" col-2">
                <button
                  type="submit"
                  className="btn btn-primary mt-5 mr-3"
                  style={{
                    color: "#000000",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                  value={question.questionId}
                  onClick={(e) => submitQuestion(e, question.questionId)}
                >
                  submit
                </button>
              </div>
              <div className=" col-3">
                <button
                  type="submit"
                  className="btn btn-primary mt-5 mr-3"
                  style={{
                    color: "#000000",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                  // value={}
                >
                  check Correct Answer
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GetAllQuestion;
