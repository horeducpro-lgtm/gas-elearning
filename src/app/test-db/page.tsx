'use client'
import { registerStudent } from '@/app/actions/user'

export default function TestPage() {
  const testConnexion = async () => {
    try {
      // On teste l'enregistrement d'un élève fictif
      const user = await registerStudent("test@gas-academy.com", "Jean De La Fontaine");
      alert(`Succès ! L'élève ${user.name} a été créé dans Supabase.`);
    } catch (e) {
      alert("Erreur : Vérifiez la console");
      console.error(e);
    }
  }

  return (
    <div className="p-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Test de Connexion GAS Academy</h1>
      <button 
        onClick={testConnexion}
        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700"
      >
        Vérifier la connexion Supabase
      </button>
    </div>
  )
}