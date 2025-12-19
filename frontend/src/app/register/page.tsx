'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(\\/auth/register\, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name: fullName })
    });
    if (!res.ok) {
      alert('Erreur lors de l’inscription');
      return;
    }
    router.push('/login');
  }

  return (
    <main className='p-6 max-w-sm mx-auto'>
      <h1 className='text-2xl font-bold'>Inscription</h1>
      <form className='mt-4 space-y-3' onSubmit={onSubmit}>
        <input className='border p-2 w-full' placeholder='Nom complet' value={fullName} onChange={e => setFullName(e.target.value)} />
        <input className='border p-2 w-full' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        <input className='border p-2 w-full' type='password' placeholder='Mot de passe' value={password} onChange={e => setPassword(e.target.value)} />
        <button className='bg-black text-white px-4 py-2 rounded' type='submit'>S’inscrire</button>
      </form>
    </main>
  );
}
