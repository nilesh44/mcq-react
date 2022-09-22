import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Subject from "./subject/Subject";
import GetSubject from "./subject/GetSubject";
import CreateTest from "./mcqTest/CreateTest";
import CreateQuestion from "./Questions/CreateQuestion";
import GetAllQuestion from "./Questions/GetAllQuestion";
import Header from "./Header/Header";
function App() {
  return (
    <div className="App">
      <Header />
      <Subject />
      <GetSubject />
      <CreateTest />
      <CreateQuestion />
      <GetAllQuestion />
    </div>
  );
}

export default App;
