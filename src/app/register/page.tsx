"use client";
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold">Inscription</h2>
        <input type="text" placeholder="Nom complet" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Mot de passe" className="w-full p-2 border rounded" />
        <button className="w-full bg-green-600 text-white p-2 rounded">S'inscrire</button>
      </form>
    </div>
  );
}
