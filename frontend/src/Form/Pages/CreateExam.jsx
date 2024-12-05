import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CreateExam.css';


const CreateExam = ({ title, setTitle }) => {
  
  const [questions, setQuestions] = useState([
    { questionText: '', answers: [{ text: '', isCorrect: false }] }
  ]);
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const [titleStyles, setTitleStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const [descriptionStyles, setDescriptionStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    listType: 'none', // 'none', 'ordered', 'unordered'
  });
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

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

  const validateForm = () => {
    if (!title) {
      setMessage('Title is required.');
      return false;
    }
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].questionText) {
        setMessage(`Question ${i + 1} text is required.`);
        return false;
      }
      if (questions[i].answers.some(answer => !answer.text)) {
        setMessage(`All answers for Question ${i + 1} are required.`);
        return false;
      }
      const correctAnswerCount = questions[i].answers.filter(answer => answer.isCorrect).length;
      if (correctAnswerCount !== 1) {
        setMessage(`Exactly one correct answer is required for Question ${i + 1}.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!validateForm()) {
      return; // Dừng lại nếu form không hợp lệ
    }

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/exam/create',
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Cập nhật kiểu chữ cho tiêu đề
  const toggleTitleStyle = (style) => {
    setTitleStyles((prev) => ({
      ...prev,
      [style]: !prev[style],
    }));
  };

  // Cập nhật kiểu chữ cho mô tả
  const toggleDescriptionStyle = (style) => {
    setDescriptionStyles((prev) => ({
      ...prev,
      [style]: !prev[style],
    }));
  };

  // Chuyển đổi kiểu danh sách
  const toggleListType = () => {
    setDescriptionStyles((prev) => ({
      ...prev,
      listType: prev.listType === 'ordered' ? 'unordered' : 'ordered',
    }));
  };

  // Xóa định dạng tiêu đề
  const resetTitleFormatting = () => {
    setTitleStyles({
      bold: false,
      italic: false,
      underline: false,
    });
  };

  // Xóa định dạng mô tả
  const resetDescriptionFormatting = () => {
    setDescriptionStyles({
      bold: false,
      italic: false,
      underline: false,
      listType: 'none',
    });
  };

  // Kiểu chữ cho tiêu đề
  const titleStyle = {
    fontWeight: titleStyles.bold ? 'bold' : 'normal',
    fontStyle: titleStyles.italic ? 'italic' : 'normal',
    textDecoration: titleStyles.underline ? 'underline' : 'none',
  };

  // Kiểu chữ cho mô tả
  const descriptionStyle = {
    fontWeight: descriptionStyles.bold ? 'bold' : 'normal',
    fontStyle: descriptionStyles.italic ? 'italic' : 'normal',
    textDecoration: descriptionStyles.underline ? 'underline' : 'none',
  };
  
  const [showButtons, setShowButtons] = useState(false);
  const buttonClicked = useRef(false);

  const handleFocus = () => setShowButtons(true);

  const handleBlur = () => {
    if (!buttonClicked.current) {
      setShowButtons(false);
    }
    buttonClicked.current = false;
  };

  const [showDescriptionButtons, setShowDescriptionButtons] = useState(false);

  const handleDescriptionFocus = () => 
    setShowDescriptionButtons(true);


  const handleDescriptionBlur = () => {
    if (!buttonClicked.current) {
      setShowDescriptionButtons(false);
    }
    buttonClicked.current = false;
  };


  const handleButtonClick = () => {
    buttonClicked.current = true;
  };



  return (
    <div className='create_exam'>
      <form onSubmit={handleSubmit}>
        <div className="title_create">
          <div className="title-input">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
              placeholder="Tiêu đề biểu mẫu"
              style={titleStyle}             
            />
            
          </div>
          

          {showButtons && (
            <div className="format-buttons" onMouseDown={handleButtonClick}>
              <button onClick={() => toggleTitleStyle('bold')}>
                <i className="fas fa-bold"></i>
              </button>
              <button onClick={() => toggleTitleStyle('italic')}>
                <i className="fas fa-italic"></i>
              </button>
              <button onClick={() => toggleTitleStyle('underline')}>
                <i className="fas fa-underline"></i>
              </button>
              <button onClick={resetTitleFormatting}>
                <i className="fas fa-times-circle"></i> Xóa định dạng
              </button>
            </div>
          )}
        </div>


        <div className="describe_create">
          <div className="description-input">
            <label>Mô tả biểu mẫu</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              onFocus={handleDescriptionFocus}
              onBlur={handleDescriptionBlur}
              placeholder="Nhập mô tả"
              style={descriptionStyle} // Áp dụng các kiểu chữ cho mô tả
            />
          </div>
      
          {showDescriptionButtons && (
            <div className="format-buttons">
              <button onClick={() => toggleDescriptionStyle('bold')}>
                <i className="fas fa-bold"></i>
              </button>
              <button onClick={() => toggleDescriptionStyle('italic')}>
                <i className="fas fa-italic"></i>
              </button>
              <button onClick={() => toggleDescriptionStyle('underline')}>
                <i className="fas fa-underline"></i>
              </button>
              <button onClick={toggleListType}>
                {descriptionStyles.listType === 'ordered' ? (
                  <i className="fas fa-list-ol"></i> // Danh sách có đánh số
                ) : (
                  <i className="fas fa-list-ul"></i> // Danh sách không có đánh số
                )}
              </button>
              <button onClick={resetDescriptionFormatting}>
                <i className="fas fa-times-circle"></i> Xóa định dạng
              </button>
            </div>
          )}
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
