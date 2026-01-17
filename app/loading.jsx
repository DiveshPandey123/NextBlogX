export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin h-10 w-10 rounded-full border-2 border-white border-t-transparent" />
        <p className="text-sm tracking-wide opacity-80">Loading NextBlogX...</p>
      </div>
    </div>
  );
}
