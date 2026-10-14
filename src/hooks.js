import { useCallback, useEffect, useState } from "react";

export function useDebounce(value, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export function useToast() {
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(null), 2600);
  }, []);
  return { toast, showToast };
}
