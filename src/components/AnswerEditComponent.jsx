import React from 'react';
import { Trash2 } from 'lucide-react';

export default function AnswerEditComponent({ data, index, questionIndex, type, onDelete, onTextChange, onToggle }) {
    return (
        <div className="d-flex align-items-center rounded px-3 py-2 mb-2">
            <input
                type={type === 'single' ? 'radio' : 'checkbox'}
                name={`question-${questionIndex}`}
                className="form-check-input me-3"
                checked={data.is_correct}
                onChange={onToggle}
            />
            <input
                type="text"
                className="form-control bg-light border-0 p-2"
                value={data.answer}
                onChange={e => onTextChange(e.target.value)}
                placeholder="Type your answer"
            />
            <button className="btn btn-link text-danger ms-3 p-0" onClick={onDelete}>
                <Trash2 size={18} />
            </button>
        </div>
    );
}