import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Subject from "./subject/Subject";
import GetSubject from "./subject/GetSubject";
import CreateTest from "./mcqTest/CreateTest";
import CreateQuestion from "./Questions/CreateQuestion";
import GetAllQuestion from "./Questions/GetAllQuestion";
import Header from "./Header/Header";
import Main from "./Main/Main";
import { configureStore } from "@reduxjs/toolkit";
import { default as mainComponentsliceReducer } from "./Redux/MainContentSlice";
import { Provider } from "react-redux";
import { mainComponentStore } from "./Redux/MaincomponentStore";
function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Provider store={mainComponentStore}>
        <Header />
        <Main />
      </Provider>
      {/* <Subject />
      <GetSubject />
      <CreateTest />
      <CreateQuestion />
      <GetAllQuestion /> */}
    </div>
  );
}

export default App;
