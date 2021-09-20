import React from 'react';
import {useGlobalContext} from '../contexts/context';

import Modal from './Modal';

const Quiz = ({correct_answer, incorrect_answers, question}) => {
  const {score, index, handleIndex, handleScore, questions, quiz} =
    useGlobalContext();

  const answers = incorrect_answers && [...incorrect_answers, correct_answer];

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p>
          - all quiz : {quiz.amount}개 , type : {quiz.category} , difficulty :
          {quiz.difficulty}
        </p>
        <p className="correct-answers">
          correct answer : {score} / {index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{__html: question}} />
          <div className="btn-container">
            {answers &&
              answers.map((item, index) => (
                <button
                  onClick={() => {
                    handleScore(correct_answer === item);
                  }}
                  key={index}
                  className="answer-btn"
                  dangerouslySetInnerHTML={{__html: item}}
                />
              ))}
          </div>
        </article>
        <button onClick={handleIndex} className="next-question">
          next question
        </button>
      </section>
    </main>
  );
};

export default Quiz;

// import React from 'react';
// import {useGlobalContext} from './context';
// import Modal from './Modal';

// const Quiz = ({correct_answer, incorrect_answers, question}) => {
//   const {score, index, handleIndex, handleScore} = useGlobalContext();
//   let answers = [...incorrect_answers];
//   const randomNumber = Math.floor(Math.random() * answers.length);
//   console.log(correct_answer, '정답!');
//   if (randomNumber === answers.length) {
//     return answers.push(correct_answer);
//   } else {
//     answers.push(answers[randomNumber]);
//     answers[randomNumber] = correct_answer;
//   }
//   return (
//     <main>
//       <Modal />
//       <section className="quiz">
//         <p className="correct-answers">
//           correct answer : {score} / {index}
//         </p>
//         <article className="container">
//           <h2 dangerouslySetInnerHTML={{__html: question}} />
//           <div className="btn-container">
//             {answers.map((item, index) => (
//               <button
//                 onClick={() => {
//                   handleScore(correct_answer === item);
//                 }}
//                 key={index}
//                 className="answer-btn"
//                 dangerouslySetInnerHTML={{__html: item}}
//               />
//             ))}
//           </div>
//         </article>
//         <button onClick={handleIndex} className="next-question">
//           next question
//         </button>
//       </section>
//     </main>
//   );
// };

// export default Quiz;
