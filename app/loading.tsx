export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.3s]" />
        <div className="w-5 h-5 rounded-full bg-violet-500 animate-bounce [animation-delay:-0.15s]" />
        <div className="w-5 h-5 rounded-full bg-indigo-500 animate-bounce" />
      </div>
    </div>
  );
}
