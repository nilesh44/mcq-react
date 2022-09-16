import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const Subject = () => {
  return (
    <form className="container">
      <div className="row mt-5">
        <label
          className="col-sm-2 form-group"
          style={{ color: "#41F00A", fontSize: "30px", fontWeight: "bold" }}
          htmlFor="exampleInputEmail1"
        >
          Subject
        </label>
        <div className="col-sm-10 input-group-lg">
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter subject name"
          />
        </div>
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
