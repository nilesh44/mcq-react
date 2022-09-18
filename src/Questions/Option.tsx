import React, { FC, useState } from "react";
import OptionInterface from "./OptionInterface";
import { OptionProps } from "./OptionProps";

export const Option: FC<OptionProps> = (props): JSX.Element => {
  let element;

  console.log(props.checked);

  if (props.checked) {
    element = (
      <div className=" col-sm-2 form-check ">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          style={{ color: "#F528DD", fontSize: "30px", fontWeight: "bold" }}
        />

        <label
          className="form-check-label"
          htmlFor="flexCheckChecked"
          style={{ color: "#F528DD", fontSize: "30px", fontWeight: "bold" }}
        >
          correct answer
        </label>
      </div>
    );
  }
  return (
    <div className="row mt-5">
      <label
        className="col-sm-2 form-group"
        style={{ color: "#41F00A", fontSize: "30px", fontWeight: "bold" }}
      >
        option{"  :  "}
        {props.srNo}
      </label>
      <div className="col-sm-5 input-group-lg">
        <input
          type="text"
          className="form-control"
          id={props.id}
          placeholder="Enter option"
          value={props.value}
        />
      </div>
      <div className=" col-sm-2 form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault"
          value={props.id}
          onChange={(e) => props.getCorrectAnswer(e, parseInt(props.id))}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault">
          correct answer
        </label>
      </div>

      <div className="col-sm-2 form-group">
        <button
          type="submit"
          className=" row btn btn-primary "
          style={{
            color: "#000000",
            backgroundColor: "#F50707",
            fontSize: "20px",
            fontWeight: "bold",
          }}
          value={props.id}
          onClick={(e) => props.removeOption(e)}
        >
          remove option
        </button>
      </div>
    </div>
  );
};

export const OOption = React.memo(Option);
