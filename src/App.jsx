/* eslint-disable no-unused-vars */
import { useState } from 'react';
import questionsData from '../questions.json';
import './App.css';

function App() {
  const [questions, setQuestions] = useState(questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (event) => {
    const selectedOptionId = parseInt(event.target.value);
    const { id: questionId } = currentQuestion;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOptionId,
    }));
  };

  const handleNextClick = () => {
    const selectedOptionId = answers[currentQuestion.id];
    const selectedOption = currentQuestion.options.find(
      (option) => option.id === selectedOptionId
    );

    if (selectedOption && selectedOption.nextQuestionId) {
      const nextQuestionIndex = questions.findIndex(
        (question) => question.id === selectedOption.nextQuestionId
      );
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const renderInputField = (fieldType, questionId) => {
    switch (fieldType) {
      case 'text':
        return <input type="text" name={questionId} />;
      case 'percentage':
        return <input type="number" name={questionId} min="0" max="100" />;
      case 'number':
        return <input type="number" name={questionId} />;
      case 'boolean':
        return (
          <div className="boolean-field">
            <label>
              <input type="radio" name={questionId} value="true" onChange={handleAnswerChange} />
              True
            </label>
            <label>
              <input type="radio" name={questionId} value="false" onChange={handleAnswerChange} />
              False
            </label>
          </div>
        );
      case 'mcq':
        return (
          <div className="mcq-field">
            {currentQuestion.options.map((option) => (
              <label key={option.id}>
                <input
                  type="radio"
                  name={questionId}
                  value={option.id}
                  onChange={handleAnswerChange}
                />
                {option.option}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) {
      return <div className="no-questions">No more questions</div>;
    }

    return (
      <div className="question-container">
        <h2>{currentQuestion.title}</h2>
        <p>{currentQuestion.description}</p>
        {currentQuestion.fields.map((field) =>
          renderInputField(field, currentQuestion.id)
        )}
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Question Answer Web App</h1>
      {renderQuestion()}
    </div>
  );
}

export default App;
