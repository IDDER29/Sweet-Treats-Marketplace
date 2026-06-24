export default function RootLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">Loading…</p>
      </div>
    </div>
  );
}
