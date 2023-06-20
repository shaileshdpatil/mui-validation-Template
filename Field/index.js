import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    styled,
    TextField,
} from "@mui/material";
import {FormContext} from "../Form/context";
import {Field as ReduxFormField} from 'redux-form';
import React from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

const required = value => value || value === 0 || value === '0' ? undefined : 'This field is required';
const textField = value => value && value.trim().length ? undefined : 'This field is required';
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Email is not valid email'
    : undefined;
const password = value => value && !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)
    ? 'Email is not valid email'
    : undefined;
const matchesPassword = (value, allValues) =>
    value === allValues.new_password
        ? undefined
        : 'Conform Password must be same as Password';

const renderField = props => {
    const {
        type,
        label,
        input,
        placeholder,
        invalid,x``
        disabled,
        InputProps,
        defaultValue,
        options,
    } = props;

    const value = props.input ? props.input.value : "";
    let touched, error;
    if (props.error && props.error !== null) {
        touched = true;
        error = props.error;
    } else {
        touched = props.meta.touched;
        error = props.meta.error;
    }

    let feedback = null;
    let validity = null;

    if (touched) {
        if (error || invalid) {
            feedback = error;
            validity = true;
        } else {
            validity = false;
        }
    }

    const StyledLabel = styled(InputLabel)(({ theme }) => ({
        color: "#515B6F",
        fontWeight:600,
        marginBottom:4
    }))

    // const validationError = (
    //     <Stack>
    //         <Typography variant="caption" color="error" mx={`14px`} mt={`3px`}>
    //             {feedback}
    //         </Typography>
    //     </Stack>
    // )

    let field = (
        <TextField
            {...input}
            sx={props.sx}
            type={type}
            error={validity}
            helperText={feedback}
            multiline={props.multiline}
            placeholder={placeholder}
            disabled={disabled}
            InputProps={InputProps}
            rows={props.rows}
            id={props.name}
        />
    )

    if (type === "checkbox") {
        field = (
            <Box>
                <Checkbox
                    {...validity}
                    color="success"
                    icon={<AddCircleOutlineIcon/>}
                    checkedIcon={<TaskAltIcon/>}
                    value={value}
                    onChange={input.onChange}
                />
            </Box>
        )
    }

    if (type === "select") {
        field = (
            <FormControl error={validity}>
                {label && <InputLabel id={`form-group-label`}>{label}</InputLabel>}
                <Select
                    {...validity}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={input.onChange}
                    label={label}
                    onBlur={() => input.onBlur(input.value)}
                >
                    {(options || []).map((item,index) =>
                        <MenuItem value={item.value} key={index}>{item.label}</MenuItem>
                    )}
                </Select>
                {feedback && <FormHelperText>{feedback}</FormHelperText>}
            </FormControl>
        )
    }

    return (
        <Stack sx={props.styledStack}>
            {label && <StyledLabel>{label}</StyledLabel>}
            {field}
        </Stack>
    );
}

const Field = props => {
    const validations = [];
    let requiredField = false;
    if (_.indexOf(props.validation, 'required') !== -1) {
        validations.push(required);
        requiredField = true;
    }
    if (_.indexOf(props.validation, 'textField') !== -1) {
        validations.push(textField);
    }
    if (_.indexOf(props.validation, 'email') !== -1) {
        validations.push(email);
    }
    if (_.indexOf(props.validation, 'matchesPassword') !== -1) {
        validations.push(matchesPassword);
    }
    return (
        <FormContext.Consumer>
            {context => {
                const newProps = {
                    ...props,
                    horizontal: context.horizontal
                };
                return (
                    <ReduxFormField
                        component={renderField}
                        validate={validations}
                        required={requiredField}
                        {...newProps}
                    />
                );
            }}
        </FormContext.Consumer>
    );
}


Field.propTypes = {
    name: PropTypes.string.isRequired,
    InputProps: PropTypes.object,
    validation: PropTypes.array,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf([
        'text',
        'number',
        'email',
        'password',
        'textarea',
        'select',
        'file'
    ]).isRequired,
}
export default Field;

