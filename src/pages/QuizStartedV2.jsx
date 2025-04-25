import React from 'react';
import { useNavigate } from 'react-router-dom';
import placeholder from '../assets/quiz.png';

const QuizStartedV2 = () => {
    const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/started');
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5">Quiz Name</h2>

      <div className="row justify-content-center">
    
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <p><strong>Category:</strong> Programming</p>
              <p><strong>Number of questions:</strong> 10</p>

              <div className="form-group">
                <label><strong>Description:</strong></label>
                <div className="border rounded p-3 bg-light mt-2" style={{ height: '100px', overflowY: 'auto' }}>
                  Covering fundamental concepts like functions, data types and loops, this quiz is perfect for beginners and intermediate programmers looking to refresh their python skills. Can you get a perfect score? 🚀🔥
                </div>
              </div>

              <div className="text-left mt-4">
                <button className="btn btn-success px-4" onClick={handleStartQuiz}>Start Quiz</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-4 mt-md-0 d-flex flex-column align-items-center">
          <img
            src={placeholder}
            alt="placeholder"
            className="img-fluid mb-4"
            style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '10px', border: '1px solid #ccc' }}
          />

          <div className="card text-center shadow-sm" style={{ width: '150px' }}>
            <div className="card-body">
              <div className="border border-success rounded-circle mx-auto d-flex justify-content-center align-items-center"
                   style={{ width: '100px', height: '100px', color: 'green', fontWeight: 'bold', fontSize: '18px' }}>
                30:00
              </div>
              <small className="text-muted d-block mt-2">Quiz Time:</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStartedV2;
