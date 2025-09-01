import React from 'react';

// Define a type for props that have an onClick and an optional className
type ButtonProps = {
  onClick: () => void;
  className?: string; // className is an optional string
};

// Define a type for props that also include a 'disabled' state
type NavButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

// --- DotButton Component ---
export const DotButton: React.FC<ButtonProps> = ({ onClick, className }) => (
  <button type="button" onClick={onClick} className={className} />
);

// --- PrevButton Component ---
export const PrevButton: React.FC<NavButtonProps> = ({ onClick, disabled }) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={disabled}
  >
    <svg className="embla__button__svg" viewBox="0 0 24 24">
      <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  </button>
);

// --- NextButton Component ---
export const NextButton: React.FC<NavButtonProps> = ({ onClick, disabled }) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={disabled}
  >
    <svg className="embla__button__svg" viewBox="0 0 24 24">
      <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  </button>
);