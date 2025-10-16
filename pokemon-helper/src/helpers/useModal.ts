import { useState } from "react";

export const useModal = (
  defaultValue = false
): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(defaultValue);
  return [isOpen, () => setIsOpen(true), () => setIsOpen(false)];
};
