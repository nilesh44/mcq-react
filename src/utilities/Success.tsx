import React from "react";

const Success = (props: { successMsg: string }): JSX.Element => {
  if (props.successMsg != null && props.successMsg != "") {
    return (
      <React.Fragment>
        <div>
          <text
            style={{ color: "Green", fontSize: "20px", fontWeight: "bold" }}
          >
            {props.successMsg}
          </text>
        </div>
      </React.Fragment>
    );
  }
  return <div></div>;
};

export default Success;
