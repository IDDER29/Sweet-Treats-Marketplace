"use client";

import { CakeSlice } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              backgroundColor: "#fef3c7",
              border: "3px solid #fde68a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.25rem",
            }}
          >
            <CakeSlice
              style={{ width: 36, height: 36, color: "#d97706" }}
              strokeWidth={1.5}
            />
          </div>

          {/* Brand */}
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#d97706",
              marginBottom: "0.75rem",
            }}
          >
            Sweet Treats Marketplace
          </p>

          {/* Heading */}
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#111827",
              marginBottom: "0.75rem",
            }}
          >
            Critical error
          </h1>

          {/* Body */}
          <p
            style={{
              fontSize: "1rem",
              color: "#6b7280",
              lineHeight: 1.6,
              maxWidth: 400,
              marginBottom: "2rem",
            }}
          >
            Something went seriously wrong. Please refresh the page.
          </p>

          {/* Error digest */}
          {error.digest && (
            <p
              style={{
                fontSize: "0.7rem",
                color: "#9ca3af",
                fontFamily: "monospace",
                marginBottom: "1.5rem",
              }}
            >
              Error ID: {error.digest}
            </p>
          )}

          {/* Button */}
          <button
            onClick={reset}
            style={{
              backgroundColor: "#f59e0b",
              color: "#ffffff",
              border: "none",
              borderRadius: 9999,
              padding: "0.75rem 2rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#d97706";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f59e0b";
            }}
          >
            Refresh page
          </button>
        </div>
      </body>
    </html>
  );
}
