// components/inputs/Select.tsx
import React from 'react';
import ReactSelect, { MultiValue } from 'react-select';

interface SelectOption {
  value: string;
  label: string;
}

interface SimpleSelectProps {
  label: string;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
  options: SelectOption[];
  disabled?: boolean;
}

const SimpleSelect: React.FC<SimpleSelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  const handleChange = (newValue: MultiValue<SelectOption>) => {
    onChange(newValue as SelectOption[]);
  };

  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={handleChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 })
          }}
          classNames={{
            control: () => 'text-sm',
          }}
        />
      </div>
    </div>
  );
};

export default SimpleSelect;