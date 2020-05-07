import React from 'react';
import { MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';

interface SelectInputProps {
  onChange: (event: React.ChangeEvent<any>) => void;
  className?: string;
  styles?: object;
  defaultValue?: string;
  selectorId: string;
  value: string;
  options: string[];
  name: string;
  label: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  styles,
  options,
  onChange,
  className,
  selectorId,
  defaultValue,
  value,
  name,
  label,
}) => {
  const optionItems = () => {
    return options.map((value: string, index: number) => (
      <MenuItem value={value} key={index}>
        {value}
      </MenuItem>
    ));
  };

  return (
    <>
      <FormControl style={styles} className={className}>
        <InputLabel htmlFor={selectorId} id={selectorId}>
          {label}
        </InputLabel>
        <Select
          labelId={selectorId}
          onChange={onChange}
          name={name}
          defaultValue={defaultValue}
          value={value}
        >
          {optionItems()}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectInput;
