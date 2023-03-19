export const getSavedQuestionnaireIds = () => {
    const savedQuestionnaireIds = localStorage.getItem('saved_questionnaire')
      ? JSON.parse(localStorage.getItem('saved_questionnaire'))
      : [];
  
    return savedQuestionnaireIds;
  };
  
  export const saveQuestionnaireIds = (questionnaireIdArr) => {
    if (questionnaireIdArr.length) {
      localStorage.setItem('saved_questionnaire', JSON.stringify(questionnaireIdArr));
    } else {
      localStorage.removeItem('saved_questionnaire');
    }
  };
  
  export const removeQuestionnaireId = (questionnaireId) => {
    const savedQuestionnaireIds = localStorage.getItem('saved_questionnaire')
      ? JSON.parse(localStorage.getItem('saved_questionnaire'))
      : null;
  
    if (!savedQuestionnaireIds) {
      return false;
    }
  
    const updatedSavedQuestionnaireIds = savedQuestionnaireIds?.filter((savedQuestionnaireId) => savedQuestionnaireId !== questionnaireId);
    localStorage.setItem('saved_questionnaire', JSON.stringify(updatedSavedQuestionnaireIds));
  
    return true;
  };