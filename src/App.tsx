import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Subject from "./subject/Subject";
import GetSubject from "./subject/GetSubject";
import CreateTest from "./mcqTest/CreateTest";
import CreateQuestion from "./Questions/CreateQuestion";
function App() {
  return (
    <div className="App">
      <Subject />
      <GetSubject />
      <CreateTest />
      <CreateQuestion />
    </div>
  );
}

export default App;
