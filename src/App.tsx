import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Subject from "./subject/Subject";
import GetSubject from "./subject/GetSubject";
import CreateTest from "./mcqTest/CreateTest";
function App() {
  return (
    <div className="App">
      <Subject />
      <GetSubject />
      <CreateTest />
    </div>
  );
}

export default App;
