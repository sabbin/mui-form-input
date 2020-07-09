import React from 'react';

import { Controller } from 'react-hook-form';
import { TextField, } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

export default ({ field: { name, optionsRef, viewRef, inputProps, ...rest }, autocomplete, formData, control, ...props }) => {
  const filter = createFilterOptions();

  return (
    <Controller
      name={name}
      as={
        <Autocomplete
          options={autocomplete.options[optionsRef]}
          getOptionLabel={o => {
            if (typeof o === 'string') {
              if (autocomplete?.props?.freeSolo) {
                return o;
              }
              return autocomplete.options[optionsRef].find(a => a._id === o)[viewRef];
            }
            return o[viewRef]
          }}
          renderOption={(option, state) => {
            return option.title || option[viewRef]
          }}
          getOptionSelected={(option, value) => option._id === value._id}
          renderInput={params => <TextField {...params} {...inputProps} />}

          {...rest}
          {...autocomplete.props}
        />
      }
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '' && autocomplete?.props?.freeSolo) {
          filtered.push({
            title: `Add "${params.inputValue}"`,
            name: params.inputValue,
            isNew: true,
          });
        }

        return filtered;
      }}
      defaultValue={formData?.[name] ? autocomplete.options[optionsRef].find(c => c._id === formData[name]) : null}
      onChange={([, obj]) => obj ? obj._id : obj}
      control={control}
      {...props}
    />
  )
}
