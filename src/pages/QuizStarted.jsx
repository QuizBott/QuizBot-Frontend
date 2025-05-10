import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  ProgressBar,
  Alert,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import Loader from '../components/Loader';
import QuestionStarted from '../components/QuestionStarted';

const QuizStarted = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    api.get(`/quiz/${id}`)
      .then((res) => {
        const data = res.data;
        setQuiz(data);
        setTimeLeft(data.duration * 60);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load quiz.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (loading || error) return;
    if (timeLeft <= 0) {
      handleFinishQuiz();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading, error]);

  const handleAnswerChange = (indices) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: Array.isArray(indices) ? indices : [indices],
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex((i) => i + 1);
    }
  };

  const handleFinishQuiz = () => {
    const payload = {
      quizId: id,
      answers: Object.entries(userAnswers).map(([qIndex, selectedIndices]) => ({
        questionId: quiz.questions[qIndex].id,
        answerIds: selectedIndices.map(
          (idx) => quiz.questions[qIndex].answers[idx].id
        ),
      })),
    };

    api.post('/quiz/submit', payload)
      .then((response) => {
        const resultId = response.data
        if (resultId) {
          navigate(`/quiz/${resultId}/results`);
        } else {
          console.error('No result ID in response:', response.data);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to submit quiz.');
      });
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

  const current = quiz.questions[currentQuestionIndex];
  const selectedIndices = userAnswers[currentQuestionIndex] || [];

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 fw-bold">{quiz.name}</h1>
      <Row>
        <Col md={8}>
          <div className="d-flex justify-content-between mb-3">
            <h5>❓ Question {currentQuestionIndex + 1}</h5>
            <span className="text-muted">{current.points} Points</span>
          </div>

          <QuestionStarted
            question={current}
            selectedIndices={selectedIndices}
            setSelectedIndices={handleAnswerChange}
          />

          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <Button variant="danger" onClick={handleFinishQuiz}>
              Finish Quiz
            </Button>
          ) : (
            <Button variant="success" onClick={goToNextQuestion}>
              Next Question
            </Button>
          )}
        </Col>

        <Col md={4}>
          <Card className="mb-4 shadow">
            <Card.Body className="text-center">
              <h6 className="mb-2">Time Remaining:</h6>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {minutes}:{seconds}
              </div>
              <ProgressBar
                now={(timeLeft / (quiz.duration * 60)) * 100}
                variant="success"
                className="mt-3"
              />
            </Card.Body>
          </Card>

          <Card className="shadow mb-3">
            <Card.Body>
              <Button
                variant="danger"
                className="w-100 mb-3"
                onClick={handleFinishQuiz}
              >
                Finish Quiz
              </Button>

              <h6 className="mb-3">Question List</h6>
              <ListGroup>
                {quiz.questions.map((_, i) => {
                  const isCurrent = i === currentQuestionIndex;
                  const isAnswered =
                    Array.isArray(userAnswers[i]) &&
                    userAnswers[i].length > 0;

                  return (
                    <ListGroup.Item
                      key={i}
                      action
                      active={isCurrent}
                      onClick={() => setCurrentQuestionIndex(i)}
                      style={{
                        backgroundColor: isCurrent
                          ? '#0d6efd'
                          : isAnswered
                            ? '#d1e7dd'
                            : undefined,
                        color: isCurrent
                          ? 'white'
                          : isAnswered
                            ? '#0f5132'
                            : undefined,
                      }}
                    >
                      Question {i + 1}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default QuizStarted;
