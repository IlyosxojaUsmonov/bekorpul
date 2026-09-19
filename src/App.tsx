import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import Products from "./components/Products";
import CertificateModal from "./components/CertificateModal";
import { GIFT_PLAN, PLANS } from "./data/plans";
import type { CertLevel } from "./types";
import { useToast } from "./hooks/useToast";
import {
  consumePendingCertificate,
  generateCertificate,
} from "./lib/certificate";

interface CertificateState {
  planName: string;
  certLevel: CertLevel;
  amount: number | null;
  per: string;
  initialName: string;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function findDetailValue(detail: unknown, keys: string[]): string {
  if (!detail || typeof detail !== "object") return "";
  const source = detail as Record<string, unknown>;
  for (const key of keys) {
    const value = readString(source[key]);
    if (value) return value;
  }
  if (source.data && typeof source.data === "object") {
    return findDetailValue(source.data, keys);
  }
  return "";
}

export default function App() {
  const { message, showToast } = useToast();
  const [certificate, setCertificate] = useState<CertificateState | null>(null);

  function openCertificate(detail: unknown, target?: EventTarget | null) {
    const tokenFromDetail = findDetailValue(detail, [
      "token",
      "buttonToken",
      "paymentToken",
    ]);
    const targetToken =
      target instanceof HTMLElement
        ? target.closest("inpay-button")?.getAttribute("token") || ""
        : "";
    const token = tokenFromDetail || targetToken;
    const plan =
      [...PLANS, GIFT_PLAN].find((item) => item.inpayToken === token) ||
      PLANS[1];
    const planName =
      findDetailValue(detail, ["planName", "tariffName"]) || plan.name;
    const initialName = findDetailValue(detail, [
      "recipientName",
      "customerName",
      "userName",
      "name",
    ]);

    setCertificate({
      planName,
      certLevel: plan.certLevel,
      amount: plan.price,
      per: plan.per,
      initialName,
    });
  }

  function openTestCertificate() {
    const plan = PLANS.find((item) => item.id === "start") || PLANS[0];
    setCertificate({
      planName: plan.name,
      certLevel: plan.certLevel,
      amount: plan.price,
      per: plan.per,
      initialName: "",
    });
  }

  useEffect(() => {
    const eventNames = [
      "inpay:success",
      "inpay-success",
      "inpay.payment.success",
      "payment-success",
      "payment_success",
    ];
    const handleSuccess = (event: Event) => {
      const detail = event instanceof CustomEvent ? event.detail : undefined;
      openCertificate(detail, event.target);
    };
    const handleMessage = (event: MessageEvent) => {
      const detail = event.data;
      const type = findDetailValue(detail, [
        "type",
        "event",
        "status",
      ]).toLowerCase();
      if (
        type === "success" ||
        type === "payment_success" ||
        type === "inpay:success"
      ) {
        openCertificate(detail);
      }
    };

    eventNames.forEach((name) =>
      document.addEventListener(name, handleSuccess),
    );
    window.addEventListener("message", handleMessage);
    return () => {
      eventNames.forEach((name) =>
        document.removeEventListener(name, handleSuccess),
      );
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  function downloadPendingCertificate() {
    const pending = consumePendingCertificate();
    if (!pending) return;

    generateCertificate(pending);
    showToast("Xush kelibsiz! Sertifikatingiz PDF sifatida yuklab olindi.");
  }

  useEffect(() => {
    downloadPendingCertificate();

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") downloadPendingCertificate();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", downloadPendingCertificate);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", downloadPendingCertificate);
    };
  }, []);

  function scrollTo(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <Nav onScrollTo={scrollTo} />
      <Hero onScrollTo={scrollTo} />
      <Pricing onCertificateTest={openTestCertificate} />
      <Products />
      <Footer onJoke={showToast} onScrollTo={scrollTo} />

      <Toast message={message} />
      {certificate && (
        <CertificateModal
          {...certificate}
          onClose={() => setCertificate(null)}
        />
      )}
    </>
  );
}
