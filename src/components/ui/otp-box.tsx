"use client";

import type React from "react";

import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

interface OtpBoxProps {
  length?: number;
  onComplete?: (code: string) => void;
}

export default function OtpBox({ length = 6, onComplete }: OtpBoxProps) {
  const [code, setCode] = useState<string[]>(new Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const setRef = useCallback(
    (element: HTMLInputElement | null, index: number) => {
      inputs.current[index] = element;
    },
    []
  );

  const processInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: number
  ) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1 && num) {
      inputs.current[slot + 1]?.focus();
    }
    if (newCode.every((num) => num !== "")) {
      onComplete?.(newCode.join(""));
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.key === "Backspace" && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, length)
      .split("");
    if (pastedData.some((char) => /[^0-9]/.test(char))) return;
    const newCode = [...code];
    pastedData.forEach((value, i) => {
      newCode[i] = value;
      inputs.current[i]!.value = value;
      if (i === pastedData.length - 1) {
        inputs.current[i]?.focus();
      }
    });
    setCode(newCode);
    if (newCode.every((num) => num !== "")) {
      onComplete?.(newCode.join(""));
    }
  };

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="flex gap-3 items-center justify-center">
        {code.map((num, idx) => (
          <div key={idx} className="relative">
            <Input
              ref={(el) => setRef(el, idx)}
              value={num}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{1}"
              maxLength={1}
              className={`w-[64px] rounded-none h-[64px] px-4 text-center text-2xl font-bold font-spline focus:outline-none border border-[#CFD9E8] focus:ring-1 focus:ring-[#EE6306] ${
                idx === 3 ? "ml-0" : ""
              }`}
              onChange={(e) => processInput(e, idx)}
              onKeyUp={(e) => onKeyUp(e, idx)}
              onPaste={handlePaste}
            />
            {/* {idx === 2 && (
              <div className="absolute -right-9 top-1/2 transform -translate-y-1/2 text-[#CFD9E8] text-2xl">
                -
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
