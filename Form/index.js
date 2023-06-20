import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { FormContext } from './context';
import {Stack} from "@mui/material";
import PropTypes from 'prop-types'

class Form extends Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.enableReinitialize = !!props.enableReinitialize;
  }

  render() {
    const { handleSubmit, name, onSubmit, className } = this.props;
    const {
      submitFailed,
      submitSucceeded,
      submitting,
      horizontal,
      style
    } = this.props;
    const { children } = this.props;

    return (
      <FormContext.Provider
        value={{
          submitFailed,
          submitSucceeded,
          submitting,
          horizontal
        }}
      >
        <form
          onSubmit={handleSubmit(values => onSubmit(values))}
          name={name}
          className={className}
          style={{...style,width:"100%"}}
        >
          <Stack gap={2.5}>
            {children}
          </Stack>
        </form>
      </FormContext.Provider>
    );
  }
}

Form.propTypes = {
  onSubmit:PropTypes.func,
  initialValues:PropTypes.object,
}
export default reduxForm({
  form: Form.name,
  initialValues: Form.initialValues,
})(Form);
