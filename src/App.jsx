import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateQuiz from "./components/CreateQuiz";

import "./index.css";
import EditQuiz from "./components/EditQuiz";
import QuizStartedV1 from "./components/QuizStartedV1";
import Homepage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
