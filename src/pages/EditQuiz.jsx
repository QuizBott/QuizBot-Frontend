import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionEdit from "../components/QuestionEdit";
import { Pencil } from 'lucide-react';
import styles from '../css/EditQuiz.module.css';
import api from "../api"

function EditQuiz() {

  const location = useLocation();
  const navigate = useNavigate();
  const initialData = location.state?.data;

  const [quizMeta, setQuizMeta] = useState({
    name: '', description: '', duration: 0,
    category: '', numberAttempts: 0,
    tags: [], imageBase64: ''
  });
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!initialData) return;
    setQuizMeta({
      name: initialData.name,
      description: initialData.description,
      duration: initialData.duration,
      category: initialData.category,
      numberAttempts: initialData.numberAttempts,
      tags: initialData.tags,
      imageBase64: initialData.image
    });
    const singleQs = initialData.single_answer_questions.map(q => ({ ...q, type: 'single' }));
    const multiQs = initialData.multi_answer_questions.map(q => ({ ...q, type: 'multi' }));
    setQuestions([...singleQs, ...multiQs]);
  }, [initialData]);


  const handleMetaChange = (field, value) => setQuizMeta(prev => ({ ...prev, [field]: value }));

  const updateQuestion = (qIdx, patch) => {
    setQuestions(q => q.map((qq, i) => i === qIdx ? { ...qq, ...patch } : qq));
  };
  const addAnswer = qIdx => updateQuestion(qIdx, { answers: [...questions[qIdx].answers, { answer: '', is_correct: false }] });
  const deleteAnswer = (qIdx, aIdx) => updateQuestion(qIdx, { answers: questions[qIdx].answers.filter((_, i) => i !== aIdx) });
  const deleteQuestion = qIdx => setQuestions(q => q.filter((_, i) => i !== qIdx));

  const handleSubmit = async () => {
    try {
      const payload = {
        ...quizMeta,
        single_answer_questions: questions.filter(q => q.type === 'single').map(({ type, ...rest }) => rest),
        multi_answer_questions: questions.filter(q => q.type === 'multi').map(({ type, ...rest }) => rest),
        image: quizMeta.imageBase64
      };

      const response = await api.post(
        "/quiz/create",
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const quizId = response.data.id;
      navigate(`/quiz/${quizId}/intro`);

    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Error saving quiz');
    }
  };
  const [isEditing, setIsEditing] = useState(false);

  const handlePencilClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <div className="mb-4 d-flex justify-content-center align-items-center" style={{ height: "60px" }}>
        {isEditing ? (
          <>
            <input
              className={styles.editableHeadingInput}
              placeholder="Name"
              value={quizMeta.name}
              onChange={e => handleMetaChange('name', e.target.value)}
              onBlur={handleBlur}
              autoFocus
            />
            <Pencil style={{ visibility: "hidden" }} />
          </>
        ) : (
          <>
            <h1 className="fw-bold" style={{ marginRight: "10px", fontSize: "2.5rem" }}>{quizMeta.name}</h1>
            <Pencil onClick={handlePencilClick} style={{ cursor: "pointer" }} />
          </>
        )}

      </div>

      <div className="row">
        {/* Left column */}
        <div className="col-md-7"
          style={{
            maxHeight: 'calc(100vh - 150px)',
            overflowY: 'auto',
            paddingRight: '15px'
          }}>
          {questions.map((q, idx) => (
            <QuestionEdit
              key={idx}
              data={q}
              index={idx}
              onTypeChange={newType => {
                let answers = q.answers;
                if (newType === 'single') {
                  const firstCorrect = answers.find(a => a.is_correct);
                  answers = answers.map((a, i) => ({ ...a, is_correct: i === answers.indexOf(firstCorrect) }));
                }
                updateQuestion(idx, { type: newType, answers });
              }}
              onPointsChange={pts => updateQuestion(idx, { points: pts })}
              onQuestionTextChange={txt => updateQuestion(idx, { question: txt })}
              onAddAnswer={() => addAnswer(idx)}
              onDeleteAnswer={aIdx => deleteAnswer(idx, aIdx)}
              onAnswerTextChange={(aIdx, txt) => {
                const newAns = q.answers.map((a, i) => i === aIdx ? { ...a, answer: txt } : a);
                updateQuestion(idx, { answers: newAns });
              }}
              onToggleCorrect={aIdx => {
                const singleMode = q.type === 'single';
                const newAns = q.answers.map((a, i) => (
                  { ...a, is_correct: singleMode ? i === aIdx : i === aIdx ? !a.is_correct : a.is_correct }
                ));
                updateQuestion(idx, { answers: newAns });
              }}
              onDeleteQuestion={() => deleteQuestion(idx)}
            />
          ))}
        </div>

        <div className="col-md-1"></div>

        {/* Right column */}
        <div className="col-md-4 d-flex flex-column">
          <div className="mb-3 text-center">
            {quizMeta.imageBase64 ? (
              <img
                src={`data:image/png;base64,${quizMeta.imageBase64}`}
                alt="Quiz"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: '200px' }}
              />
            ) : (
              <div className="border rounded p-5 text-muted">No image</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={quizMeta.category}
              onChange={e => handleMetaChange('category', e.target.value)}
            >
              <option value="Science">Science</option>
              <option value="Programming">Programming</option>
              <option value="Math">History</option>
            </select>
          </div>

          <div className="row">
            <div className="col">
              <label className="form-label">Duration (minutes)</label>
              <input
                type="number"
                className="form-control"
                value={quizMeta.duration}
                onChange={e => handleMetaChange('duration', +e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label">Attempts allowed</label>
              <input
                type="number"
                className="form-control"
                value={quizMeta.numberAttempts}
                onChange={e => handleMetaChange('numberAttempts', +e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows={4}
              value={quizMeta.description}
              onChange={e => handleMetaChange('description', e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn btn-dark px-5 rounded-pill"
              style={{ width: "200px" }}
              onClick={handleSubmit}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditQuiz;
