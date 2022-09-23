import React, { FC, useState } from "react";
import { GetAllTestProps } from "../props/GetAllTestProps";
import Error from "../subject/Error";
const GetAllTest: FC<GetAllTestProps> = (props): JSX.Element => {
  let [allTest, setAllTest] = useState<string[]>([""]);
  const [testNameError, setTestNameError] = useState("");
  //get all test
  const getAllTest = (): void => {
    console.log("getAll test");
    console.log("subject name : " + props.subjectName);
    console.log("&&&&&&&&&&&&&&&&&&");
    let subjectName = props.subjectName;
    if (subjectName === "" || subjectName === null) {
      setTestNameError("please select subject");
    } else {
      fetch("http://localhost:8083/test/getAll/" + props.subjectName, {
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
            setTestNameError("");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
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
        onChange={(event) => props.setTestName(event)}
        onClick={getAllTest}
      >
        {allTest.sort().map((test) => {
          return <option value={test}> {test}</option>;
        })}
      </select>
      <div>
        <Error error={testNameError} />
      </div>
    </div>
  );
};

export default GetAllTest;
