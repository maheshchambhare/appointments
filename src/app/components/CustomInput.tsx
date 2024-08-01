import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

interface CustomInputProps {
  error?: any;
  value?: string;
  label: string;
  ref?: React.Ref<HTMLInputElement>;
  id: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  touched?: any;
  type: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isFocused?: boolean;
  passwordEye?: (showPassword: boolean) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  required?: boolean;
  Icon?: string;
  placeholder?: string;
  inputHeight?: number;
  isAutoFocus?: boolean;
  name?: string;
  marginTop?: string;
  inputMaxLength?: number;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  autocomplete?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  error,
  value,
  label,
  ref,
  id,
  onFocus,
  onChange,
  touched,
  type,
  onBlur,
  passwordEye,
  onKeyPress,
  isDisabled,
  required,
  Icon,
  placeholder,
  inputHeight,
  isAutoFocus,
  name,
  marginTop,
  inputMaxLength,
  onKeyDown,
  autocomplete,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [focusedInput, setFocusedInput] = useState(false);

  return (
    <div className="relative">
      <label
        className={`font-sans text-md  font-medium  transition-all duration-200 ease-in-out left-4 text-foreground`}
      >
        {label}{" "}
        {label && required && <label className="text-red-500"> *</label>}{" "}
      </label>

      <div className="relative flex flex-row items-center cursor-pointer  	hover:shadow-md transition-shadow duration-300 ease-in-out">
        {Icon && (
          <div
            style={{
              borderColor: focusedInput
                ? "black"
                : (touched && error && "#f46a6a") || "none",
            }}
            className={`border-l-[1px] ${
              inputHeight
                ? `h-[${inputHeight}px] xsm:h-[37px] sm:h-[37px] md:h-[37px]`
                : "h-[40px] xsm:h-[37px] sm:h-[37px] md:h-[37px]"
            }  ${isDisabled ? "bg-[#eeeeee80]" : "bg-foreground"}
            
            border-y-[1px] ${
              focusedInput ? "border-black" : "border-gray-300"
            }  rounded-l-[7px]  mt-[5px] w-[50px] flex justify-center items-center
        
            `}
          >
            {Icon}
          </div>
        )}

        <input
          ref={ref}
          name={name}
          autoFocus={isAutoFocus ? true : false}
          autoComplete="off"
          disabled={isDisabled ? true : false}
          placeholder={placeholder ? placeholder : label}
          type={type}
          id={id}
          style={{
            marginTop: marginTop && marginTop,
            cursor: isDisabled ? "not-allowed" : "default",
            borderColor: focusedInput
              ? "black"
              : (touched && error && "#f46a6a") || "none",
          }}
          className={` text-md  pr-4 ${
            inputHeight
              ? `h-[${inputHeight}px] xsm:h-[37px] sm:h-[37px] md:h-[37px]`
              : "h-[40px] xsm:h-[37px] sm:h-[37px] md:h-[37px]"
          } appearance-none mt-[5px] ${
            Icon
              ? "border-r-[1px] border-y-[1px] rounded-l-none rounded-r-[7px]"
              : "border-[1px] rounded-md px-2"
          } ${
            isDisabled ? "bg-[#eeeeee80]" : "bg-input"
          }   border-gray-300  leading-tight focus:outline-none
         flex h-12 w-full border-none   text-foreground  rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-foreground/60 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400ß
          `}
          onFocus={(e) => {
            if (onFocus) {
              onFocus(e);
            }
            setFocusedInput(true);
          }}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          onBlur={(e) => {
            if (onBlur) {
              onBlur(e);
            }
            setFocusedInput(false);
          }}
          maxLength={inputMaxLength}
          onChange={(e) => {
            let value: any = e.target.value;

            if (!isNaN(value) && parseFloat(value) < 0) {
              e.preventDefault();
              return;
              // Valid positive value, continue
            }
            onChange(e);
          }}
          value={value || ""}
        />
      </div>
      {touched && error ? (
        <span className="text-[#f46a6a] absolute font-sans text-[10px] bottom-[-18px] md:bottom-[-16px] sm:bottom-[-16px] xsm:bottom-[-16px]">
          {error}
        </span>
      ) : null}
      {passwordEye && (
        <span
          className="absolute right-4 top-10 cursor-pointer"
          onClick={(e) => {
            passwordEye(showPassword);
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? (
            <EyeOff
              color={touched && error ? "#f46a6a" : "hsl(var(--foreground))"}
              size={18}
            />
          ) : (
            <Eye
              color={touched && error ? "#f46a6a" : "hsl(var(--foreground))"}
              size={18}
            />
          )}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
