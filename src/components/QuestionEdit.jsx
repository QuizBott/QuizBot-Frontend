import React from 'react';
import AnswerEdit from './AnswerEdit';
import { Trash2 } from 'lucide-react';

export default function QuestionEdit({
  data, index,
  onTypeChange, onPointsChange, onQuestionTextChange,
  onAddAnswer, onDeleteAnswer, onAnswerTextChange,
  onToggleCorrect, onDeleteQuestion
}) {
  return (
    <div className="p-3 border rounded mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <select className="form-select bg-light border-0" style={{ width: 160 }} value={data.type} onChange={e => onTypeChange(e.target.value)}>
          <option value="single">Single Answer</option>
          <option value="multi">Multiple Choice</option>
        </select>
        <div className="d-flex align-items-center">
          Points
          <input type="number" className="form-control bg-light text-dark border-0 ms-2" style={{ width: 60, height: 30 }} value={data.points} onChange={e => onPointsChange(+e.target.value)} />
        </div>
        <button className="btn btn-link text-danger p-0 ms-3" onClick={onDeleteQuestion}><Trash2 size={18} /></button>
      </div>

      <h5 className="p-2">❔ Question {index + 1}</h5>
      <textarea className="form-control bg-light border-0 w-100 mb-3" value={data.question} onChange={e => onQuestionTextChange(e.target.value)} />

      <p className="p-2">Choices</p>
      {data.answers.map((ans, ai) => (
        <AnswerEdit
          key={ai}
          data={ans}
          index={ai}
          questionIndex={index}
          type={data.type}
          onDelete={() => onDeleteAnswer(ai)}
          onTextChange={txt => onAnswerTextChange(ai, txt)}
          onToggle={() => onToggleCorrect(ai)}
        />
      ))}

      <button className="btn btn-light border d-flex align-items-center mt-2" onClick={onAddAnswer}>
        ➕ Add answer
      </button>
    </div>
  );
}