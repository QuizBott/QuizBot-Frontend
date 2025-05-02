import React from 'react';
import { ListGroup } from 'react-bootstrap';
import AnswerStarted from './AnswerStarted';

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

const QuestionStarted = ({ question, selectedIndices, setSelectedIndices }) => {
    const selected = Array.isArray(selectedIndices) ? selectedIndices : [];

    const handleClick = (idx) => {
        if (question.type.toLowerCase() === 'single') {
            setSelectedIndices(selected.includes(idx) ? [] : [idx]);
        } else {
            const updated = selected.includes(idx)
                ? selected.filter(i => i !== idx)
                : [...selected, idx];
            setSelectedIndices(updated);
        }
    };

    return (
        <div>
            <h4 className="mb-4">{question.question}</h4>
            <ListGroup className="mb-4">
                {question.answers.map((ans, idx) => (
                    <AnswerStarted
                        key={ans.id}
                        label={LABELS[idx]}
                        answerText={ans.answer}
                        isSelected={selected.includes(idx)}
                        onClick={() => handleClick(idx)}
                    />
                ))}
            </ListGroup>
        </div>
    );
};

export default QuestionStarted;