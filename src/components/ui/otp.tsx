import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  FocusEvent,
} from "react";

interface OtpBoxProps {
  numDigits: number;
  onComplete: (otp: string) => void;
}

export const OtpBox: React.FC<OtpBoxProps> = ({ numDigits, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(numDigits).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Update the refs when numDigits changes
  useCallback(() => {
    inputRefs.current = inputRefs.current.slice(0, numDigits);
  }, [numDigits])();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) {
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value !== "" && index < numDigits - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (updatedOtp.every((digit) => digit !== "")) {
      onComplete(updatedOtp.join(""));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index === 0) {
        return;
      }
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text/plain");
    const otpArray = pasteData.trim().slice(0, numDigits).split("");

    const updatedOtp = [...otp];
    otpArray.forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);
    onComplete(updatedOtp.join(""));
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const renderOtpInputs = () => {
    const inputs = [];

    for (let i = 0; i < numDigits; i++) {
      inputs.push(
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[i]}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          onFocus={handleFocus}
          ref={(ref) => {
            if (ref) inputRefs.current[i] = ref;
          }}
          className="w-full h-[70px] rounded-md bg-[#F9FAFC] focus:bg-white mx-2 flex items-center text-center justify-center text-[22px] font-extrabold focus:outline-none border-meta-4/30 border focus:border focus:border-[#8E8FFA] border-gray-500/30 font-inter"
        />
      );
    }
    return inputs;
  };

  return <div className="flex w-full justify-start">{renderOtpInputs()}</div>;
};
