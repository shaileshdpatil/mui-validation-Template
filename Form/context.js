import React from 'react';

export const FormContext = React.createContext({
  submitFailed: false,
  submitSucceeded: false,
  submitting: false,
  horizontal: false
});
