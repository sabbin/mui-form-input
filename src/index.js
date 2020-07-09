import React from 'react';
import * as PropTypes from 'prop-types';

import AutoCompleteComponent from './components/AutocompleteComponent';
import AutoCompleteMultipleComponent from './components/AutocompleteMultipleComponent';
import TextFieldComponent from './components/TextFieldComponent';
import RadioComponent from './components/RadioComponent';

const FormInput = props => {
  const { item: { type, field }, autocomplete, control, formData, ...otherProps } = props;

  switch (type) {
    case 'autocomplete':
      return <AutoCompleteComponent
        field={field}
        autocomplete={autocomplete}
        control={control}
        formData={formData}
        {...otherProps}
      />
    case 'autocompleteMultiple':
      return <AutoCompleteMultipleComponent
        field={field}
        autocomplete={autocomplete}
        control={control}
        formData={formData}
        {...otherProps}
      />
    case 'textField':
      return <TextFieldComponent field={field} control={control} {...otherProps} />
    case 'radio':
      return <RadioComponent
        field={field}
        control={control}
        formData={formData}
        {...otherProps}
      />
    default:
      return null
  }
};

FormInput.propTypes = {
  item: PropTypes.object.isRequired,
  autocomplete: PropTypes.object,
  control: PropTypes.object.isRequired,
  formData: PropTypes.object,
}

FormInput.defaultProps = {
  autocomplete: {},
  formData: {},
}

export default FormInput;
