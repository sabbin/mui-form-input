import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, } from '@material-ui/core';

export default ({ field: { name, options, label, ...otherFieldProps }, formData, ...props }) => (
  <Controller
    as={
      <FormControl component="fieldset" required={otherFieldProps.required}>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup aria-label="position" row {...otherFieldProps}>
          {options.map(option => (
            <FormControlLabel
              key={option.value}
              control={<Radio color="primary" />}
              {...option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    }
    name={name}
    {...props}
  />
)
