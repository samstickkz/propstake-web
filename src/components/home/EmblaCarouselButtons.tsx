// EmblaCarouselButtons.js
import React from 'react';

export const DotButton = ({ onClick, className }) => (
  <button type="button" onClick={onClick} className={className} />
);

export const PrevButton = ({ onClick, disabled }) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={disabled}
  >
    <svg className="embla__button__svg" viewBox="0 0 24 24">
      <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  </button>
);

export const NextButton = ({ onClick, disabled }) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={disabled}
  >
    <svg className="embla__button__svg" viewBox="0 0 24 24">
       <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  </button>
);