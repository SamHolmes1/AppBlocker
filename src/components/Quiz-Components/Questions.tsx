import { useEffect, useState } from "react";
import axios from "axios";

const emptyOptions = [
  {
    option: "",
    correctAnswer: false,
  },
  {
    option: "",
    correctAnswer: false,
  },
  {
    option: "",
    correctAnswer: false,
  },
  {
    option: "",
    correctAnswer: false,
  },
]

interface ScoreProps {
  score: number,
  setScore: Function
}

function QuizQuestions(props:ScoreProps) {
  const [questionData, setQuestionData] = useState({question:{text:""}});
  const [options, setOptions] = useState(emptyOptions);

  const questionSetUp = () => {
    axios
      .get("https://the-trivia-api.com/v2/questions?limit=1")
      .then((retrievedData) => {
        const currentQuestion = retrievedData.data[0];
        setQuestionData(currentQuestion);
        let correctAnswerIndex = Math.floor(Math.random() * 4);
        const answersArr = structuredClone(emptyOptions)
        answersArr[correctAnswerIndex] = {
          option: currentQuestion.correctAnswer,
          correctAnswer: true,
        };
        let j = 0;
        for (let i = 0; i < 4; i++) {
          if (!answersArr[i].option) {
            answersArr[i].option = currentQuestion.incorrectAnswers[j];
            j++;
          }
        }
        setOptions(answersArr);
      })

      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    questionSetUp();
  }, []);


  if (!options[0].option) {
    return <h2>Is Loading</h2>;
  } else {
    return (
      <div>
        <div className="question">
          <h2>{questionData.question.text}</h2>
        </div>
        <div className="options">
          
          { options.map((optionToRender, index) => {
            if (optionToRender.correctAnswer) {
              return (
                <button className="correct-answer" key={`answer${index + 1}`} onClick={() => {
                  questionSetUp()
                  props.setScore(props.score + 1)
                }}>
                  {optionToRender.option}
                </button>
              );
            } else {
                return (
                  <button
                    className="incorrect-answer"
                    key={`answer${index + 1}`}
                    onClick={() => {
                      questionSetUp();
                    }}
                  >
                    {optionToRender.option}
                  </button>
                );
              } 
            }
          )}  
        </div>
      </div>
    );
  }
}

export default QuizQuestions;

/*
Questions from api won't render some of the time. Usually won't 
render on initial load of app but then will render when something in the 
source code is changed
*/
