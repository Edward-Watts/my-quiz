import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

import "./quiz.css";

const Quiz = () => {
    const[url, setUrl] = useState(null);
    const[loading, setLoading] = useState(false);
    const[questions, setQuestions] = useState(null)
    const[question, setQuestion] = useState(null);
    const[totalQuestions, setTotalQuestion] = useState(0)
    const[error, setError] = useState(null);
    let[questionIndex, setQuestionIndex] = useState(0);
    const[options, setOptions] = useState(['True', 'False']);
    const[answer, setAnswer] = useState(null);
    let[myAnswers, setMyAnswers] = useState([]);
    const[disabled, setDisabled] = useState(true);
    const[score, setScore] = useState(0);
    const[isEnd, setIsEnd] = useState(false);

    let navigate = useNavigate()

    //load Questions
    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('https://opentdb.com/api.php?amount=15&difficulty=hard&type=boolean')
            response = await response.json()
            setQuestions(response.results)
            setTotalQuestion(response.results.length)
        }

            fetchMyAPI()
    }, [])

    //Load Next Question
    useEffect(()=>{
        setLoading(true)
        if(questions) {
        setQuestion(questions[questionIndex])
        setLoading(false)
        }
    }, [questions, questionIndex])

    //Check Answer
    const checkAnswer = (selectedOption) => {
        setAnswer(selectedOption)
        setDisabled(false)
    }

    //Next Question
    const nextQuestionHandler = (question) => {
        if (answer === question.correct_answer) {
            setScore(score + 1)
        }
        let answeredQuestion = {
            question: question.question,
            result: answer === question.correct_answer ? 1 : 0
        }
        
        setMyAnswers((myAnswers) => {
            return[...myAnswers, answeredQuestion]
        })
        
        setQuestionIndex(++questionIndex)
    };

    //Finish
    const finishHandler = (question) => {
    if (questionIndex === totalQuestions) {
      setIsEnd(true)
      let answeredQuestion = {
            question: question.question,
            result: answer === question.correct_answer ? 1 : 0
        }
        
        setMyAnswers((myAnswers) => {
            return[...myAnswers, answeredQuestion]
        })
    }
    if (answer === question.correct_answer) {
      setScore(score + 1)
    }
    navigate(`/results/${score}`, {state: myAnswers})
  };

   useEffect(() => {
        console.log('myAnswerObject.................', myAnswers, questionIndex)
    }, [myAnswers])


    return(
        <div className="quiz d-flex justify-content-center align-items-center p-5">
            {loading ? <div className="spinner-border m-5 p-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div> :
            <div className="">
                <div>
                    <h1 className="pb-3">{question?.category}</h1>
                    <p className="fs-3">{question?.question}</p>
                    
                    <div className="d-flex align-items-center justify-content-center py-2">
                        {options.map((option, index) => (<div className="m-2" key={index}>
                            <button className={`${answer === option ? "selected" : "button"} px-5 py-2 fw-bold fs-5`} onClick={() => checkAnswer(option)}>{option}</button>
                        </div>))}
                    </div>
                </div>
                <div className="mt-4">
                    {questionIndex < totalQuestions - 1 && (<button className="btn btn-success px-5 fw-bold" disabled={disabled} onClick={() => nextQuestionHandler(question)}>Next Question</button>)}
                    {questionIndex === totalQuestions - 1 && (<button className="btn btn-success px-5 fw-bold" disabled={disabled} onClick={() => finishHandler(question)}>Finish</button>)}

                </div>
            </div>}
            <div className="counter">
                <p>Question: <strong>{questionIndex + 1} </strong>of <strong>{totalQuestions}</strong></p>
            </div>
        </div>
    )
}
export default Quiz;
