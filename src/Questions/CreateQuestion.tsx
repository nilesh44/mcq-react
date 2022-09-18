import React, { ChangeEvent, useMemo, useState } from "react";
import { JsxElement } from "typescript";
import Error from "../subject/Error";
import OptionInterface from "./OptionInterface";
import { Option, OOption } from "./Option";
const CreateQuestion = () => {
  let [subjects, setSubjects] = useState<string[]>([""]);
  let [allTest, setAllTest] = useState<string[]>([""]);
  const [testName, setTestName] = useState("");
  const [error, setError] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [question, setQuestion] = useState("");

  const [options, setOptions] = useState<OptionInterface[]>([]);
  const [optionCount, setOptionCount] = useState(0);
  const [optionValue, setOptionValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  let num: number = 0;
  //get all test
  const getAllTest = (): void => {
    console.log("getAll test");
    console.log("subject name : " + subjectName);
    console.log("&&&&&&&&&&&&&&&&&&");
    fetch("http://localhost:8083/test/getAll/" + subjectName, {
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
              setAllTest(() => data);
            })
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //get all subject
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
              setSubjects(() => data);
            })
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = () => {};
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
    setTestName(event.target.value);
  };

  //setQuestion
  const onChangeSetQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("******** set Question******");
    console.log(event.target.value);
    setQuestion(event.target.value);
  };
  //handle Add Options

  //   const handleAddOptionsCount = () => {
  //     setOptionCount((prevoiusCount) => {
  //       return (prevoiusCount = prevoiusCount + 1);
  //     });
  //   };

  const removeOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("^^^^^^^^^^^removeOption^^^^^^^^^^^^^");
    console.log("value from event " + event.currentTarget.value);
    // let filterd = newArrayOptions.filter((option) => {
    //   console.log(option.id !== parseInt(event.currentTarget.value, 10));

    //   return option.id !== parseInt(event.currentTarget.value, 10);
    // });
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
  };

  const handleOnChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("------handleOnChangeValue-------");
    console.log(event.target.value);
    setOptionValue(event.target.value);
  };

  //handle createQuestion
  const handleCreateQuestion = (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    console.log("handleSubmit for test");

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

  //   const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setIsCorrect(event.target.checked);
  //   };

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
          onChange={onChangeSelectSubjectName}
          onClick={getSubject}
        >
          {subjects.sort().map((subject) => {
            return <option value={subject}> {subject}</option>;
          })}
        </select>
      </div>

      <div>
        <label
          htmlFor="allTest"
          style={{ color: "#FC38F8", fontSize: "30px", fontWeight: "bold" }}
        >
          Select Test :
        </label>
        <select
          style={{ color: "#7231FC", fontSize: "25px", fontWeight: "bold" }}
          name="allTest"
          id="allTest"
          onChange={onChangeSetTestName}
          onClick={getAllTest}
        >
          {allTest.sort().map((test) => {
            return <option value={test}> {test}</option>;
          })}
        </select>
      </div>

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
            id="subject"
            placeholder="Enter Question"
            value={question}
            onChange={onChangeSetQuestion}
          />
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
            onChange={handleOnChangeValue}
          />
        </div>
        {/* <div className=" col-sm-2 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            style={{ color: "#F528DD", fontSize: "30px", fontWeight: "bold" }}
            onChange={handleCheck}
          />

          <label
            className="form-check-label"
            htmlFor="flexCheckDefault"
            style={{ color: "#F528DD", fontSize: "30px", fontWeight: "bold" }}
          >
            mark for correct answer
          </label>
        </div> */}
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
      </div>

      <div>
        <Error error={error} />
      </div>

      <button
        type="submit"
        className=" row btn btn-primary mt-5"
        style={{ color: "#000000", fontSize: "30px", fontWeight: "bold" }}
      >
        create new Question
      </button>
    </form>
  );
};

export default CreateQuestion;