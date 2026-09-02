export default function Loading({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-border border-t-accent" />
      <p className="text-sm text-text-muted">{label}</p>
    </div>
  );
}
