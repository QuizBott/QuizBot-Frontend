import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

//Data za vnes od backend
const QuizResults = ({ quizName, correct, total}) => {  
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate('/home');
    };

    quizName = 'Programming'
    correct = 15
    total = 20

  return (
    <Container className="text-center mt-5">
      <h2 className="fw-bold">{quizName}</h2>

      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <h4 className="fw-bold text-start">Results:</h4>
          <Card className="border-success">
            <Card.Body>
              <Card.Text className="text-start">
                You’ve got {correct} / {total} correct answers
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

