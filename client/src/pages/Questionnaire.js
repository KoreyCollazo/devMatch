import React, { useState } from 'react';

const Questionnaire = (props) => {
  const [questions] = useState([
    {
      question: 'Do you like single quotes better than double quotes?',
      choices: ['True', 'False'],
      answer: ''
    },
    {
      question: 'Do you prefer to spend your free time inside instead of outside?',
      choices: ['True', 'False'],
      answer: ''
    },
    {
      question: 'Do you like to drink?',
      choices: ['True', 'False'],
      answer: ''
    },
    {
      question: 'Do you like using debugger better than console.log?',
      choices: ['True', 'False'],
      answer: ''
    },
    {
      question: 'Do you enjoy attending hackathons or other tech-related events?',
      choices: ['True', 'False'],
      answer: ''
    },
    {
      question: 'Are you looking for in a relationship?',
      choices: ['True', 'False'],
      answer: ''
    },
    {
      question: 'Do you like EsLint?',
      choices: ['True', 'False'],
      answer: ''
    },
    {
      question: 'Do you like to smoke?',
      choices: ['True', 'False'],
      answer: ''
    }
  ]);

  return (
    <ul>
      {questions.map((question) => (
        <li>{question.question}</li>
      ))}
    </ul>
  );
};
