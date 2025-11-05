import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import ParticleBackground from './components/ParticleBackground';
import { LianetLogo, WhatsappIcon } from './components/icons';
import QuizFunnel from './components/QuizFunnel';

const Header: React.FC<{ onScheduleClick: () => void }> = ({ onScheduleClick }) => {
    return (
        <header className="bg-brand-dark-end/80 shadow-sm sticky top-0 z-50 backdrop-blur-lg">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <LianetLogo />
                    <span className="text-2xl font-bold text-white">LIANET Soluções</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4">
                     <a 
                        href="https://wa.me/5553999335369" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Contact on WhatsApp"
                        className="text-white p-2 rounded-lg hover:bg-white/10 transition-all"
                     >
                        <WhatsappIcon className="h-6 w-6"/>
                    </a>
                     <button onClick={onScheduleClick} className="bg-secondary text-white px-5 py-2.5 rounded-lg hover:bg-green-600 transition-all font-semibold shadow-lg shadow-green-500/20 hover:shadow-xl hover:-translate-y-0.5">
                        FAÇA UM ORÇAMENTO
                    </button>
                </div>
            </nav>
        </header>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-brand-dark text-white">
        <div className="container mx-auto px-6 py-12 text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
                <LianetLogo />
                <span className="text-2xl font-bold">LIANET Soluções</span>
            </div>
            <p className="text-gray-400">Seu parceiro estratégico de Field Service e Suporte NOC na Região Sul.</p>
            <p className="mt-8 text-sm text-gray-500">&copy; {new Date().getFullYear()} LIANET Soluções. Todos os direitos reservados.</p>
        </div>
    </footer>
);

const LoadingScreen: React.FC = () => (
    <div className="fixed inset-0 bg-brand-dark-start flex flex-col items-center justify-center z-50">
        <LianetLogo />
        <p className="mt-4 text-lg text-white/70 animate-pulse">Carregando...</p>
    </div>
);

const ErrorScreen: React.FC<{ message: string }> = ({ message }) => (
    <div className="fixed inset-0 bg-brand-dark-start flex flex-col items-center justify-center z-50 p-6 text-center">
         <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">Ocorreu um Erro na Inicialização</h1>
        <p className="mt-2 text-gray-300 max-w-md">{message}</p>
        <button 
            onClick={() => window.location.reload()}
            className="mt-6 bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-all"
        >
            Tentar Novamente
        </button>
    </div>
);


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  useEffect(() => {
    const initializeApp = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
        } catch (err) {
            console.warn("Falha na inicialização.", err);
        } finally {
            setIsLoading(false);
            setIsInitialized(true);
        }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  if (isInitialized) {
    return (
      <div className="relative min-h-screen font-sans bg-gradient-to-br from-brand-dark-start to-brand-dark-end overflow-hidden">
        <ParticleBackground particleColor="rgba(255, 255, 255, 0.2)" lineColor="rgba(255, 255, 255, 0.1)" />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header onScheduleClick={() => setShowQuiz(true)} />
          <main className="flex-grow">
            <HomePage onScheduleClick={() => setShowQuiz(true)} />
          </main>
          <Footer />
        </div>
        {showQuiz && <QuizFunnel onClose={() => setShowQuiz(false)} />}
      </div>
    );
  }

  return null;
};

export default App;