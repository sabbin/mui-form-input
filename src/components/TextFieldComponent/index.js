import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

export default ({ field: { name, ...otherFieldProps }, formData, ...props }) => (
  <Controller
    as={
      <TextField
        margin="dense"
        fullWidth
        {...otherFieldProps}
      />
    }
    name={name}
    defaultValue={formData?.[name] || ''}
    {...props}
  />
);
