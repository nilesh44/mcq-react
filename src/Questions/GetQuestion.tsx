import React, { FC } from "react";
import { GetQuestionProps } from "../props/GetQuestionProp";
import { GetQuestionResponse } from "./GetQuestionResponseI";

const GetQuestion: FC<GetQuestionProps> = (props): JSX.Element => {
  return (
    <div className="row justify-content-start mt-5">
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
          {props.question}
        </h1>
      </div>
      <div className="row justify-content-start">
        {props.options.map((option) => {
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
                //onChange={(e) => setCorrectAnswer(e, question.questionId)}
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
      </div>
    </div>
  );
};

export default GetQuestion;
