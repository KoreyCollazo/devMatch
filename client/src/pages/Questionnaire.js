import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { SAVE_ANSWERS } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const Questionnaire = () => {
  const [questions, setQuestions] = useState({
    1: {
      question: 'Do you like single quotes better than double quotes?',
      answer: false
    },
    2: {
      question: 'Do you prefer to spend your free time inside instead of outside?',
      answer: false
    },
    3: {
      question: 'Do you like to drink?',
      answer: false
    },
    4: {
      question: 'Do you like using debugger better than console.log?',
      answer: false
    },
    5: {
      question: 'Do you enjoy attending hackathons or other tech-related events?',
      answer: false
    },
    6: {
      question: 'Are you looking for a long-term a relationship?',
      answer: false
    },
    7: {
      question: 'Do you like EsLint?',
      answer: false
    },
    8: {
      question: 'Do you like to smoke?',
      answer: false
    }
  });
  const [saveAnswers, { error, data }] = useMutation(SAVE_ANSWERS);

  const handleChange = (e) =>
    setQuestions({
      ...questions,
      [e.target.parentElement.id]: {
        ...questions[e.target.parentElement.id],
        answer: e.target.value === 'true' ? true : false
      }
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await saveAnswers({
        variables: {
          answers: Object.keys(questions).map((questionKey) => questions[questionKey].answer)
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {Object.keys(questions).map((questionKey, index) => {
          const question = questions[questionKey];

          return (
            <li key={index}>
              {question.question}{' '}
              <ToggleButtonGroup
                id={questionKey}
                color="primary"
                value={questions[questionKey].answer}
                exclusive
                onChange={handleChange}
                aria-label="Platform">
                <ToggleButton value={true}>Yes</ToggleButton>
                <ToggleButton value={false}>No</ToggleButton>
              </ToggleButtonGroup>
            </li>
          );
        })}
      </ul>
      <button>Save</button>
    </form>
  );
};

export default Questionnaire;
