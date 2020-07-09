import React from 'react';

import { Controller } from 'react-hook-form';
import { Chip, TextField, } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

export default ({ field: { name, optionsRef, viewRef, ...inputProps }, autocomplete, chipProps, formData, ...props }) => {
  const filter = createFilterOptions();

  const options = autocomplete?.customProps?.selectAll && autocomplete.options[optionsRef].length ? [{
    title: '*** SELECT ALL ***',
    selectAll: true
  }, ...autocomplete.options[optionsRef]] : autocomplete.options[optionsRef];

  return (
    <Controller
      name={name}
      defaultValue={formData?.[name] ? autocomplete.options[optionsRef].find(c => c._id === formData[name]) : []}
      as={(
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={option => option.title || option[viewRef]}
          renderTags={(value, getTagProps) => value.map((option, index) => (
            <Chip variant="outlined" label={option.name} {...getTagProps({ index })} {...chipProps} />
          ))
          }
          renderInput={params => (
            <TextField {...params} {...inputProps} />
          )}
          {...autocomplete.props}
        />
      )}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '' && autocomplete.props.freeSolo) {
          filtered.push({
            title: `Add "${params.inputValue}"`,
            name: params.inputValue,
            isNew: true,
          });
        }

        return filtered;
      }}
      onChange={([, obj]) => obj}
      {...props}

    />
  )
}
