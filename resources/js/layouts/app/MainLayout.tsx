import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}

export default MainLayout 