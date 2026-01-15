export default function Header() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 fixed top-0 right-0 left-64 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-sm font-medium text-slate-500">Plateforme de formation active</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right mr-2">
          <p className="text-sm font-bold text-slate-800">Apprenant GAS</p>
          <p className="text-[10px] text-blue-600 font-bold uppercase">Niveau Expert</p>
        </div>
        <div className="h-10 w-10 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold shadow-sm">
          A
        </div>
      </div>
    </header>
  );
}