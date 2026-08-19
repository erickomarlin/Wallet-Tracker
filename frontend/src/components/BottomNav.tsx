interface BottomNavProps {
  onAddClick: () => void;
}

function BottomNav({ onAddClick }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-center">
      <div className="w-full max-w-md bg-white border-t border-gray-100 h-16 flex items-center justify-between px-6 relative">
        <button className="w-8 h-8 rounded border border-gray-300 text-gray-400" />
        <button className="w-8 h-8 rounded border border-gray-300 text-gray-400" />

        {/* Floating add button */}
        <button
          onClick={onAddClick}
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl shadow-lg"
        >
          +
        </button>

        <button className="w-8 h-8 rounded border border-gray-300 text-gray-400" />
        <button className="w-8 h-8 rounded border border-gray-300 text-gray-400" />
      </div>
    </nav>
  );
}

export default BottomNav;
