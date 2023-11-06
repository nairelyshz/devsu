import React from 'react';
import {TextInput} from 'react-native';
import {formStyle} from '../../styles/globalStyle';

export default function InputText({
  value,
  onChange,
  placeholder = '',
  editable = true,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  editable?: boolean;
}) {
  return (
    <TextInput
      value={value}
      style={[formStyle.formInput]}
      placeholder={placeholder}
      editable={editable}
      onChangeText={onChange}></TextInput>
  );
}
