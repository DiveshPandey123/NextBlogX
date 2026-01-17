export default function Loading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-700 rounded w-1/3" />
      <div className="h-64 bg-gray-800 rounded-xl" />
      <div className="h-4 bg-gray-700 rounded w-full" />
    </div>
  );
}
