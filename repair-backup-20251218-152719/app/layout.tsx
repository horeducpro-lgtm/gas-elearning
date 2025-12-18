import './globals.css'
import type { Metadata } from 'next'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'GAS - Global Academy of Skills',
  description: 'Plateforme pÃ©dagogique pour lâ€™apprentissage technique et architectural',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-white text-black font-sans">
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-6 overflow-y-auto flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}


