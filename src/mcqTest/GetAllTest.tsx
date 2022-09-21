import React, { FC, useState } from "react";
import { GetAllTestProps } from "../props/GetAllTestProps";

const GetAllTest: FC<GetAllTestProps> = (props): JSX.Element => {
  let [allTest, setAllTest] = useState<string[]>([""]);
  //get all test
  const getAllTest = (): void => {
    console.log("getAll test");
    console.log("subject name : " + props.subjectName);
    console.log("&&&&&&&&&&&&&&&&&&");
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
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
    </div>
  );
};

export default GetAllTest;
