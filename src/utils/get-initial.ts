export const getInitials = (fullName: string): string => {
  if (!fullName) return "";

  const words = fullName.trim().split(" ");
  const initials =
    words.length > 1
      ? words[0][0] + words[1][0] // First letter of first and last word
      : words[0][0]; // If only one word, just use its first letter

  return initials.toUpperCase();
};
