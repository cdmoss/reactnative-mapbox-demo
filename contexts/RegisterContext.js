import React, { createContext, useReducer, useContext } from "react";

function formReducer(state, action) {
  switch (action.type) {
    case "RESULT_CHANGE": 
      return { ...state, subtitle: action.payload };
    case "USERNAME_CHANGE":
      return { ...state, username: action.payload };
    case "EMAIL_CHANGE":
      return { ...state, email: action.payload };
    case "PASSWORD_CHANGE":
      return { ...state, password: action.payload };
    case "SAGITTA_CHANGE":
        return { ...state, sagitta: action.payload };
    case "HEIGHT_CHANGE":
        return { ...state, height: action.payload };
    case "WEIGHT_CHANGE":
        return { ...state, weight: action.payload };
    case "SUBMIT":
      return { ...state, isSubmitLoading: true };
    case "SUBMISSION_RECIEVED":
      return { ...state, isSubmitLoading: false, isSubmissionReceived: true };
    case "SUBMISSION_RECIEVED":
      return { ...state, isSubmitLoading: false, isSubmissionProcessed: true };
    default:
      throw new Error();
  }
}

const RegistrationFormContext = createContext();

const regFormState = {
  result: "",
  username: "",
  email: "",
  password: "",
  height: "",
  weight: "",
  sagitta: false,
  isSubmitLoading: false,
  isSubmissionReceived: false,
  isSubmissionProcessed: false
};

export const RegistrationFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, regFormState);

  return (
    <RegistrationFormContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistrationFormContext.Provider>
  );
};

export const useRegistrationFormState = () => {
  const context = useContext(RegistrationFormContext);

  if (context === undefined) {
    throw new Error(
      "userRegistrationFormState must be used within a RegistrationFormProvider"
    );
  }

  return context;
}
