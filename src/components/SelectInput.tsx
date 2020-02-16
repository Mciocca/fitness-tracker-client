import React from 'react';
import { MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';

interface SelectInputProps {
  onChange: (event: React.ChangeEvent<any>) => void,
  className?: string,
  selectorId: string,
  defaultValue?: string
  value: string,
  options: string[],
  name: string,
  label: string
}

const SelectInput: React.FC<SelectInputProps> =
({ options, onChange, className, selectorId, defaultValue, value, name, label }) => {
  const optionItems = () => {
    return options.map((value: string, index: number) => <MenuItem value={value} key={index}>{value}</MenuItem>);
  }

  return (
    <>
      <FormControl className={className}>
        <InputLabel id={selectorId}>{label}</InputLabel>
        <Select labelId={selectorId} onChange={onChange} name={name} defaultValue={defaultValue} value={value}>
          {optionItems()}
        </Select>
      </FormControl>
    </>
  );
}

export default SelectInput;
