"use client";

import { useState } from "react";
import type { DocumentRecord, DocumentType } from "@/lib/types";
import { compressImage } from "@/lib/image";
import { SuccessFeedback } from "@/components/SuccessFeedback";

const SAMPLE_PATH: Record<DocumentType, string> = {
  photo: "/sample-docs/sample-photo.jpg",
  signature: "/sample-docs/sample-signature.jpg",
};

export function DocumentUploader({
  type,
  label,
  hint,
  onVerified,
}: {
  type: DocumentType;
  label: string;
  hint: string;
  onVerified: (doc: DocumentRecord) => void;
}) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<DocumentRecord["check"]>(null);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setResult(null);
    try {
      const url = await compressImage(file);
      setDataUrl(url);
      setFileName(file.name);
      await runCheck(url, file.name);
    } catch {
      setError("Couldn't read that image. Try a different file.");
    }
  }

  async function useSample() {
    setError("");
    setResult(null);
    const res = await fetch(SAMPLE_PATH[type]);
    const blob = await res.blob();
    const file = new File([blob], `sample-${type}.jpg`, { type: blob.type });
    const url = await compressImage(file);
    setDataUrl(url);
    setFileName(file.name);
    await runCheck(url, file.name);
  }

  async function runCheck(url: string, name: string) {
    setChecking(true);
    try {
      const res = await fetch("/api/ai/check-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, dataUrl: url }),
      });
      const check = await res.json();
      setResult(check);
      onVerified({ id: `doc-${type}-${Date.now()}`, type, fileName: name, dataUrl: url, check });
    } catch {
      setError("Could not reach the check service. Try again.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-semibold text-ink">{label}</p>
        <span className="rounded-full bg-stop-light px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-stop">
          Required
        </span>
      </div>
      <p className="mt-1 text-[13px] text-ink/55">{hint}</p>

      <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-stamp border-2 border-dashed border-line bg-paper py-6 text-center">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUrl} alt={`${label} preview`} className="h-20 w-20 rounded object-cover" />
        ) : (
          <span className="text-[13.5px] font-medium text-ink/50">Tap to upload {label.toLowerCase()}</span>
        )}
        <input type="file" accept="image/*" capture={type === "photo" ? "user" : "environment"} className="hidden" onChange={handleFile} />
      </label>

      <button
        type="button"
        onClick={useSample}
        className="mt-2 w-full text-center text-[12.5px] font-medium text-trust underline underline-offset-2"
      >
        Use a sample {label.toLowerCase()} instead (for testing)
      </button>

      {checking && <div className="mt-3" role="status" aria-live="polite"><p className="text-[13.5px] font-medium text-trust">Checking your document…</p><div className="inline-progress mt-2" /></div>}

      {result && !checking && (
        <div
          className={`mt-3 rounded-stamp p-3 text-[13.5px] leading-snug ${
            result.passed ? "bg-go-light text-go" : "bg-stop-light text-stop"
          }`}
        >
          {result.passed ? <SuccessFeedback title="Document check passed" /> : <p className="font-semibold">Needs attention</p>}
          {result.issues.length > 0 && (
            <ul className="mt-1 list-disc pl-4">
              {result.issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          )}
          <p className="mt-1">{result.guidance}</p>
          <p className="mt-1.5 text-[11px] uppercase tracking-wide opacity-60">
            {result.mode === "live" ? "Checked live by GPT-4o" : "Demo mode check"}
          </p>
        </div>
      )}

      {error && <p className="mt-2 text-[13px] font-medium text-stop">{error}</p>}
    </div>
  );
}
