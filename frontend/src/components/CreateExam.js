import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay cho useHistory
import axios from 'axios';

const CreateExam = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', answers: [{ text: '', isCorrect: false }] }
  ]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Sử dụng useNavigate

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');  // Sử dụng navigate thay vì history.push
    }
  }, [navigate]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers[aIndex].text = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, aIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers.forEach((answer, index) => {
      answer.isCorrect = index === aIndex;
    });
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', answers: [{ text: '', isCorrect: false }] }]);
  };

  const addAnswer = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answers.push({ text: '', isCorrect: false });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/exam/create',  // Đảm bảo đường dẫn API đúng
        { title, questions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Exam created successfully!');
      setTitle('');
      setQuestions([{ questionText: '', answers: [{ text: '', isCorrect: false }] }]);
    } catch (error) {
      const errorMsg = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
      setMessage('Error creating exam: ' + errorMsg);
    }
  };

  return (
    <div>
      <h2>Create a New Exam</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
            placeholder="Enter exam title"
          />
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex}>
            <h3>Question {qIndex + 1}</h3>
            <div>
              <label>Question Text:</label>
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e)}
                required
                placeholder="Enter question text"
              />
            </div>
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex}>
                <label>Answer {aIndex + 1}:</label>
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                  required
                  placeholder="Enter answer text"
                />
                <label>
                  Correct Answer:
                  <input
                    type="radio"
                    checked={answer.isCorrect}
                    onChange={() => handleCorrectAnswerChange(qIndex, aIndex)}
                  />
                </label>
              </div>
            ))}
            <button type="button" onClick={() => addAnswer(qIndex)}>Add Answer</button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <div>
          <button type="submit">Create Exam</button>
        </div>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default CreateExam;
