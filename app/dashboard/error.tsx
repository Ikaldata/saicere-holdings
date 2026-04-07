"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="max-w-md rounded-xl border border-border bg-bg-elevated p-8 text-center">
        <h2 className="mb-3 text-lg font-medium text-text">
          Something went wrong
        </h2>
        <p className="mb-2 text-sm text-text-muted">
          {error.message || "An unexpected error occurred."}
        </p>
        {error.digest && (
          <p className="mb-4 text-xs text-text-dim">
            Digest: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
