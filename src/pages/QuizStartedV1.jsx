import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  ProgressBar,
} from 'react-bootstrap';

const dummyQuestions = [
  {
    text: 'What is the correct way to define a function in Python?',
    options: [
      { label: 'A', text: 'def myFunction():', correct: true },
      { label: 'B', text: 'void myFunction():' },
      { label: 'C', text: 'define myFunction():' },
      { label: 'D', text: 'function myFunction():' },
    ],
  },
  {
    text: 'Which HTML tag is used for a line break?',
    options: [
      { label: 'A', text: '<br>', correct: true },
      { label: 'B', text: '<break>' },
      { label: 'C', text: '<lb>' },
      { label: 'D', text: '<line>' },
    ],
  },
  {
    text: 'Which CSS property controls text size?',
    options: [
      { label: 'A', text: 'font-size', correct: true },
      { label: 'B', text: 'text-style' },
      { label: 'C', text: 'font-style' },
      { label: 'D', text: 'size' },
    ],
  },
];

const QuizStartedV1 = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [selected, setSelected] = useState(null);
  
    const currentQuestion = dummyQuestions[currentQuestionIndex];
  
    useEffect(() => {
      if (timeLeft === 0) {
        goToNextQuestion();
        return;
      }
  
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
  
      return () => clearInterval(timer);
    }, [timeLeft]);
  
    const goToNextQuestion = () => {
      setSelected(null);
      setTimeLeft(30);
      setCurrentQuestionIndex((prev) =>
        prev + 1 < dummyQuestions.length ? prev + 1 : 0
      );
    };
  
    const handleSelect = (index) => {
      setSelected(index);
    };
  
    return (
      <Container className="py-5">
        <h1 className="text-center mb-5 fw-bold">Quiz Name</h1>
        <Row>
          {/* Main Content */}
          <Col md={8}>
            <Card className="mb-4 shadow">
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <h5>❓ Question {currentQuestionIndex + 1}</h5>
                  <span className="text-muted">15 Points</span>
                </div>
  
                <h4 className="mb-4">{currentQuestion.text}</h4>
  
                <ListGroup className="mb-4">
                  {currentQuestion.options.map((option, index) => (
                    <ListGroup.Item
                      key={option.label}
                      action
                      active={selected === index}
                      onClick={() => handleSelect(index)}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span>
                        <strong>{option.label}.</strong> {option.text}
                      </span>
                      {selected === index &&
                        option.correct && <span className="text-success">&#10003;</span>}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
  
                <Button variant="success" onClick={goToNextQuestion}>
                  Submit Answer
                </Button>
              </Card.Body>
            </Card>
          </Col>
  
          {/* Sidebar */}
          <Col md={4}>
            <Card className="mb-4 shadow">
              <Card.Body className="text-center">
                <h6 className="mb-2">Time Remaining:</h6>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  0:{timeLeft.toString().padStart(2, '0')}
                </div>
                <ProgressBar
                  now={(timeLeft / 30) * 100}
                  variant="success"
                  className="mt-3"
                />
              </Card.Body>
            </Card>
  
            <Card className="shadow">
              <Card.Body>
                <h6 className="mb-3">Question List</h6>
                <ListGroup>
                  {dummyQuestions.map((_, i) => (
                    <ListGroup.Item
                      key={i}
                      active={i === currentQuestionIndex}
                      variant={i < currentQuestionIndex ? 'success' : ''}
                    >
                      Question {i + 1}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

export default QuizStartedV1;
