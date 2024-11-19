import React from 'react';

const QuestionList = ({ questions }) => {
  return (
    <div>
      <h2>Câu hỏi trắc nghiệm</h2>
      {questions.map((question) => (
        <div key={question._id}>
          <h3>{question.title}</h3>
          <p>{question.questionText}</p>
          <ul>
            {question.answers.map((answer, index) => (
              <li key={index}>{answer.answerText}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
