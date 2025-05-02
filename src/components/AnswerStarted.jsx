import React from 'react';
import { ListGroup } from 'react-bootstrap';

const AnswerStarted = ({
    label,
    answerText,
    isSelected,
    onClick,
}) => {
    return (
        <ListGroup.Item
            action
            active={isSelected}
            onClick={onClick}
            className="d-flex align-items-center"
        >
            <strong className="me-2">{label}.</strong>
            <span>{answerText}</span>
        </ListGroup.Item>
    );
};

export default AnswerStarted;
