import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Loader from "../components/Loader";
import { Container, Alert } from "react-bootstrap";

const QuizIntroPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quizInfo, setQuizInfo] = useState(null);
  const [durationMinutes, setDurationMinutes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    // const fetchQuizInfo = async () => {
    //   try {
    //     const response = await api.get(`/quiz/${id}/intro`);
    //     setQuizInfo(response.data);
    //     setDurationMinutes(response.data.duration.toString().padStart(2, '0'));
    //   } catch (err) {
    //     setError(err.response?.data?.message || err.message);
    //   }
    //   finally {
    //     setLoading(false);
    //   }
    // };

    const fetchData = async () => {
      try {
        const [quizRes, userRes] = await Promise.all([
          api.get(`/quiz/${id}/intro`),
          api.get("/user"),
        ]);
        setQuizInfo(quizRes.data);
        setDurationMinutes(quizRes.data.duration.toString().padStart(2, "0"));
        setRole(userRes.data.role);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizInfo();
  }, [id]);

  const handleStartQuiz = () => {
    navigate(`/quiz/${id}/start`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!quizInfo) {
    return <div>Quiz information not available</div>;
  }

  console.log(quizInfo);

  return (
    <div className="container py-5 vh-100">
      <h2 className="text-center fw-bold mb-5">{quizInfo.name}</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <p>
                <strong>Category:</strong> {quizInfo.category}
              </p>
              <hr />
              <p>
                <strong>Number of questions:</strong>{" "}
                {quizInfo.numberOfQuestions}
              </p>

              <div className="form-group">
                <label>
                  <strong>Description:</strong>
                </label>
                <div
                  className="border rounded p-3 bg-light mt-2"
                  style={{ height: "100px", overflowY: "auto" }}
                >
                  {quizInfo.description}
                </div>
              </div>

              {/* <div className="text-left mt-4">
                <button className="btn btn-success px-4" onClick={handleStartQuiz}>Start Quiz</button>
              </div> */}
              {userRole !== "TEACHER" && (
                <div className="text-left mt-4">
                  <button
                    className="btn btn-success px-4"
                    onClick={handleStartQuiz}
                  >
                    Start Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-4 mt-md-0 d-flex flex-column align-items-center">
          {quizInfo.image ? (
            <img
              src={`data:image/png;base64,${quizInfo.image}`}
              alt="Quiz"
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "200px" }}
            />
          ) : (
            <div className="border rounded p-5 text-muted">No image</div>
          )}

          <div className="card text-center shadow-sm w-100 mt-4">
            <div className="card-body">
              <div
                className="border border-success rounded-circle mx-auto d-flex justify-content-center align-items-center"
                style={{
                  width: "100px",
                  height: "100px",
                  color: "green",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {durationMinutes}:00
              </div>
              <small className="text-muted d-block mt-2">Quiz Time</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizIntroPage;
