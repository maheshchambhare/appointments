import React, { useState, ChangeEvent, FocusEvent, KeyboardEvent } from "react";

interface Props {
  inputError?: any;
  value: string;
  inputLabel: string;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  inputId: string;
  inputOnFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputTouched: any;
  inputType?: string;
  onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  passwordEye?: React.ReactNode;
  inputOnKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
  required?: boolean;
  iconName?: string;
  placeholder?: string;
  inputHeight?: number;
  isAutoFocus?: boolean;
  name?: string;
  marginTop?: string;
  inputMaxLength?: number;
  link?: string;
  inputOnKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const CustomTextArea: React.FC<Props> = ({
  inputError,
  value,
  inputLabel,
  inputRef,
  inputId,
  inputOnFocus,
  onChange,
  inputTouched,
  inputType,
  onBlur,
  passwordEye,
  inputOnKeyPress,
  isDisabled,
  required,
  iconName,
  placeholder,
  inputHeight,
  isAutoFocus,
  name,
  marginTop,
  inputMaxLength,
  link,
  inputOnKeyDown,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [focusedInput, setFocusedInput] = useState<boolean>(false);

  return (
    <div className="relative">
      <label
        className={`font-sans text-md  font-medium  transition-all duration-200 ease-in-out left-4`}
      >
        {inputLabel}{" "}
        {inputLabel && required && <label className="text-red-500"> *</label>}{" "}
      </label>

      <div className="relative flex flex-row items-center cursor-pointer  	hover:shadow-md transition-shadow duration-300 ease-in-out">
        <textarea
          ref={inputRef}
          name={name}
          autoFocus={isAutoFocus ? true : false}
          autoComplete="off"
          disabled={isDisabled ? true : false}
          placeholder={placeholder ? placeholder : inputLabel}
          id={inputId}
          style={{
            marginTop: marginTop && marginTop,
            cursor: isDisabled ? "not-allowed" : "default",
            borderColor: focusedInput
              ? "black"
              : (inputTouched && inputError && "#f46a6a") || "none",
          }}
          className={`text-md  pr-4 h-[80px] xsm:h-[80px] sm:h-[80px] md:h-[80px] appearance-none mt-[5px] border-[1px] rounded-md px-2 ${
            isDisabled ? "bg-[#eeeeee80]" : "bg-zinc-800 dark:bg-zinc-800"
          }   border-gray-300  text-white leading-tight focus:outline-none
         flex h-12 w-full border-none   dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400ß
          `}
          onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => {
            if (inputOnFocus) {
              inputOnFocus(e);
            }
            setFocusedInput(true);
          }}
          onKeyPress={inputOnKeyPress}
          onKeyDown={inputOnKeyDown}
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
            onBlur(e);
            setFocusedInput(false);
          }}
          maxLength={inputMaxLength}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e)}
          value={value || ""}
        />
      </div>
      {inputTouched && inputError ? (
        <span className="text-[#f46a6a] absolute font-sans text-[10px] bottom-[-18px]">
          {inputError}
        </span>
      ) : null}
    </div>
  );
};

export default CustomTextArea;
