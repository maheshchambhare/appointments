import Select from "react-select";

import React, { ChangeEvent, CSSProperties, ReactNode, Ref } from "react";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectCompProps {
  title: string;
  onChange: (selectedOption: Option | Option[] | null) => void;
  isMulti?: boolean;
  placeholder?: string;
  options: Option[];
  styles?: CSSProperties;
  defaultValue?: Option | Option[];
  full?: boolean;
  error?: string;
  required?: boolean;
  refSelect?: Ref<HTMLSelectElement>;
  disabled?: boolean;
  addExpBtn?: ReactNode;
  selectedOption?: Option | Option[];
  menuPlacement?: "auto" | "bottom" | "top";
}

function MultiSelectComp({
  title,
  onChange,
  isMulti,
  placeholder,
  options,
  styles,
  defaultValue,
  full,
  error,
  required,
  refSelect,
  disabled,
  addExpBtn,
  selectedOption,
  menuPlacement = "bottom",
}: MultiSelectCompProps) {
  return (
    <div
      className="flex flex-col   relative
      w-full justify-between xsm:flex-col sm:flex-col md:flex-col"
    >
      <label
        className={`font-sans text-md font-medium  transition-all duration-200 ease-in-out left-4`}
      >
        {title} {required && <span className="text-[red]">*</span>}
        {addExpBtn}
      </label>
      <div
        className={`mt-[5px] h-auto border-[1px] ${
          !isMulti ? "h-[40px]" : "min-h-[40px]"
        }   border-gray-200 rounded-lg ${
          full ? "w-full" : "w-[49%]"
        }  xsm:w-full sm:w-full md:w-full`}
      >
        <Select
          onChange={(e) => {
            onChange(e);
          }}
          isMulti={isMulti}
          isSearchable={true}
          placeholder={placeholder}
          options={options}
          value={selectedOption}
          isDisabled={disabled}
          ref={refSelect}
          menuPlacement={menuPlacement || "auto"}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: error ? "#f46a6a" : "#E0E0E0",
              accentColor: "transparent",
              minHeight: 20,
              height: !isMulti ? 38 : "auto",
              borderRadius: 8,
              fontSize: "16px",
            }),
            option: (provided, state) => ({
              ...provided,
              fontSize: "16px", // Adjust the font size for the options in the list
            }),
            placeholder: (provided, state) => ({
              ...provided,
              fontSize: "16px", // Adjust the font size for the placeholder
            }),
          }}
          defaultValue={defaultValue}
        />
      </div>
      {error ? (
        <span className="text-[#f46a6a] absolute font-sans text-[10px] bottom-[-18px] md:bottom-[-16px] sm:bottom-[-16px] xsm:bottom-[-16px]">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export default MultiSelectComp;
