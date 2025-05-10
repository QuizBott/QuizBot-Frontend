import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useParams } from 'react-router-dom';

const QuizResults = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [quizAttempt, setQuizAttempt] = useState(null);

  const handleReturnHome = () => {
    navigate('/home');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/quiz/attempt/${id}`);
        setQuizAttempt(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container className="text-center mt-5">
      <h2 className="fw-bold">{quizAttempt?.quizName}</h2>

      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <h4 className="fw-bold text-start">Results:</h4>
          <Card className="border-success">
            <Card.Body>
              <Card.Text className="text-start">
                You’ve got {quizAttempt?.totalPoints.toFixed(1)} / {quizAttempt?.maxPoints.toFixed(1)} points
              </Card.Text>
            </Card.Body>
          </Card>

          <div className="mt-4">
            <Button variant="success" onClick={handleReturnHome}>
              Return home
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default QuizResults;

