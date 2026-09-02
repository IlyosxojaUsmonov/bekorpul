import { useEffect, useRef } from "react";

/**
 * Foydalanuvchi boshqa ilova/oynaga o'tib (masalan, Payme'ga), keyin qayta
 * shu sahifaga qaytganini aniqlaydi. `arm()` chaqirilgandan keyingi birinchi
 * "chiqib-qaytish" holatida `onReturn` ishga tushadi.
 */
export function useReturnDetector(onReturn: () => void) {
  const awaiting = useRef(false);
  const hiddenAt = useRef(0);
  const onReturnRef = useRef(onReturn);
  onReturnRef.current = onReturn;

  useEffect(() => {
    function handleVisibility() {
      if (document.hidden) {
        if (awaiting.current) hiddenAt.current = Date.now();
        return;
      }
      if (awaiting.current && hiddenAt.current && Date.now() - hiddenAt.current > 800) {
        awaiting.current = false;
        hiddenAt.current = 0;
        onReturnRef.current();
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  function arm() {
    awaiting.current = true;
  }

  return { arm };
}
