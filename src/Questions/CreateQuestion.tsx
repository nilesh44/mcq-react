import React, { ChangeEvent, useMemo, useState } from "react";
import { JsxElement } from "typescript";
import Error from "../subject/Error";
import OptionInterface from "./OptionInterface";
import { Option, OOption } from "./Option";
import GetAllTest from "../mcqTest/GetAllTest";
import GetAllSubject from "../subject/GetAllSubject";
import { ErrorResponse } from "../Dto/ErrorResponse";
import { SuccessResponse } from "../Dto/SuccessResponse";
import Success from "../utilities/Success";
import { CreateQuestionResponse } from "../Dto/CreateQuestionResponse";
import { GetQuestionResponse } from "./GetQuestionResponseI";
import GetQuestion from "./GetQuestion";

const CreateQuestion = () => {
  const [testName, setTestName] = useState("");

  const [subjectName, setSubjectName] = useState("");

  const [question, setQuestion] = useState("");

  const [questionError, setQuestionError] = useState("");
  const [options, setOptions] = useState<OptionInterface[]>([]);
  const [optionCount, setOptionCount] = useState(0);

  const [optionValue, setOptionValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [optrionErrorMsg, setOptrionErrorMsg] = useState("");
  const [questionResponse, setGetQuestionResponse] =
    useState<GetQuestionResponse>({ questionId: 0, question: "", options: [] });
  let num: number = 0;
  //get all test

  //setSubject Name
  const onChangeSelectSubjectName = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("******** set subject name******");
    console.log(event.target.value);
    setSubjectName(event.target.value);
  };

  //setTest Name
  const onChangeSetTestName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("******** set Test name******");
    console.log(event.target.value);

    setTestName(() => event.target.value);
  };

  //setQuestion
  const onChangeSetQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("******** set Question******");
    console.log(event.target.value);

    setQuestion(event.target.value);
    setQuestionError("");
  };

  const handleChangeOptionValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("------handleOnChangeValue-------");

    let option: string = event.target.value;
    console.log(option);
    if (question === "" || question === null) {
      setQuestionError("please enter question");
      setOptionValue(option);
    } else if (option === "" || option === null) {
      setOptrionErrorMsg("please enter option");
      setOptionValue("");
      setQuestionError("");
    } else {
      setOptionValue(option);
      setOptrionErrorMsg("");
    }
  };

  const removeOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("^^^^^^^^^^^removeOption^^^^^^^^^^^^^");
    console.log("value from event " + event.currentTarget.value);

    const value = parseInt(event.currentTarget.value);
    console.log(value);

    setOptions((option) =>
      option.filter((opt) => {
        console.log(opt);
        console.log("id opt " + opt.id);
        return opt.id !== value;
      })
    );

    //console.log(filterd);
  };
  const handleAddOptions = () => {
    if (question === "" || question === null) {
      setQuestionError("please enter question");
    } else if (optionValue === "" || optionValue === null) {
      setOptrionErrorMsg("please enter option");
    } else {
      setOptionCount((prevoiusCount) => {
        return (prevoiusCount = prevoiusCount + 1);
      });

      setOptions((option) => {
        return [
          ...option,
          {
            id: optionCount,
            value: optionValue,
            correct: isCorrect,
          },
        ];
      });
      console.log("after adding new option");
      console.log(...options);
      setOptionValue("");
      setOptrionErrorMsg("");
    }
  };

  function validateBeforeCreateQuestion(): boolean {
    console.log("validateBeforeCreateTest");
    console.log(subjectName);
    if (subjectName === "" || subjectName === null) {
      setErrorMsg("please select subject");
      return false;
    }
    if (testName === "" || testName === null) {
      setErrorMsg("please select test ");
      return false;
    }
    if (question === "" || question === null) {
      setErrorMsg("please enter question ");
      return false;
    }
    if (optionValue == "" || optionValue === null) {
      setErrorMsg("please enter options ");
    }
    if (options.length === 0) {
      setErrorMsg("please add options ");
      return false;
    }
    if (options.length === 1) {
      setErrorMsg("at least question should have two options");
      return false;
    }
    if (options.filter((opt) => opt.correct === true).length != 1) {
      setErrorMsg("select only one correct answerrrr");
      return false;
    }
    return true;
  }
  //handle createQuestion
  const handleCreateQuestion = (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    console.log("handleSubmit for test");
    event.preventDefault();
    if (validateBeforeCreateQuestion()) {
      let optionsToSend = options.map((opt) => {
        return { option: opt.value, isCorrect: opt.correct };
      });
      console.log(
        JSON.stringify({
          testName: testName,
          subjectName: subjectName,
          question: question,
          options: optionsToSend,
        })
      );
      event.preventDefault();
      fetch("http://localhost:8083/questionWithOptions/create", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testName: testName,
          subjectName: subjectName,
          question: question,
          options: optionsToSend,
        }),
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
            response.json().then((data: CreateQuestionResponse) => {
              setSuccessMsg("created question successfully ");
              getQuestion(data.questionId);
            });
            console.error("success:", successMsg);
            setQuestion("");
            setOptionValue("");
            setOptionCount(0);
            setOptions([]);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const getQuestion = (questionId: string): void => {
    console.log("getAll question");
    // console.log("subject name : " + subjectName);
    console.log("&&&&&&&&&&&&&&&&&&");
    console.log("questionId : " + questionId);

    let url: string = "http://localhost:8083/question" + "/" + questionId;

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
    id: number
  ) => {
    console.log("--------setCorrectAnswer-----------");
    options.map((option) => {
      if (option.id === id) {
        option.correct = true;
      } else {
        option.correct = false;
      }
    });
  };
  return (
    <form className="container" onSubmit={handleCreateQuestion}>
      <GetAllSubject setSubjectName={onChangeSelectSubjectName} />

      <GetAllTest subjectName={subjectName} setTestName={onChangeSetTestName} />

      <div className="row mt-5">
        <label
          className="col-sm-2 form-group"
          style={{ color: "#41F00A", fontSize: "30px", fontWeight: "bold" }}
        >
          Question
        </label>
        <div className="col-sm-10 input-group-lg">
          <input
            type="text"
            className="form-control"
            id="question"
            placeholder="Enter Question"
            value={question}
            onChange={onChangeSetQuestion}
          />
        </div>
        <div>
          <Error error={questionError} />
        </div>
      </div>
      <div className="row">
        {options.map((element) => {
          return (
            <div>
              <OOption
                srNo={num++}
                id={element.id.toString()}
                value={element.value}
                removeOption={removeOption}
                checked={element.correct}
                getCorrectAnswer={setCorrectAnswer}
              />
            </div>
          );
        })}
        <label
          className="col-sm-2 form-group mt-5"
          style={{ color: "#41F00A", fontSize: "30px", fontWeight: "bold" }}
        >
          OPTION
        </label>
        <div className="col-sm-6 input-group-lg mt-5">
          <input
            type="text"
            className="form-control"
            id="option"
            placeholder="Enter Option"
            value={optionValue}
            onChange={handleChangeOptionValue}
          />
        </div>

        <div className="col-sm-2 mt-5">
          <input
            type="button"
            value="add options"
            onClick={handleAddOptions}
            className="btn btn-primary "
            style={{
              color: "#FC3C6D",
              backgroundColor: "#FCF422",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          />
        </div>
        <div>
          <Error error={optrionErrorMsg} />
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
        create new Question
      </button>
      <GetQuestion
        question={questionResponse?.question}
        options={questionResponse?.options}
      />
    </form>
  );
};

export default CreateQuestion;
