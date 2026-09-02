import { useCallback, useEffect, useState } from "react";

const COUNT_KEY = "bekorpul_count";
const SUM_KEY = "bekorpul_sum";

/**
 * Shaxsiy, faqat shu brauzerga tegishli statistika.
 * Bu HAQIQIY umumiy (global) hisoblagich emas — chunki sayt hech qanday
 * backend/bazaga ulanmagan. Shuning uchun "jami" emas, "shu qurilmada" deb
 * ko'rsatilishi kerak.
 */
export function useLocalStats() {
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    try {
      setCount(parseInt(localStorage.getItem(COUNT_KEY) || "0", 10));
      setSum(parseInt(localStorage.getItem(SUM_KEY) || "0", 10));
    } catch {
      // localStorage mavjud emas (masalan, maxfiy rejim) — sukut bo'yicha 0
    }
  }, []);

  const recordPurchase = useCallback((amount: number | null) => {
    try {
      const nextCount = parseInt(localStorage.getItem(COUNT_KEY) || "0", 10) + 1;
      localStorage.setItem(COUNT_KEY, String(nextCount));
      setCount(nextCount);

      if (amount) {
        const nextSum = parseInt(localStorage.getItem(SUM_KEY) || "0", 10) + amount;
        localStorage.setItem(SUM_KEY, String(nextSum));
        setSum(nextSum);
      }
    } catch {
      // yozib bo'lmasa ham sahifa ishlashda davom etadi
    }
  }, []);

  return { count, sum, recordPurchase };
}
