import React from "react";

const Error = (props: { error: string }): JSX.Element => {
  if (props.error != null && props.error != "") {
    return (
      <React.Fragment>
        <div>
          <text style={{ color: "Red", fontSize: "20px", fontWeight: "bold" }}>
            {props.error}
          </text>
        </div>
      </React.Fragment>
    );
  }
  return <div></div>;
};

export default Error;
