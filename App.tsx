import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import QuizFunnel from './components/QuizFunnel';
import { LiaLogo } from './components/icons';

interface HeaderProps {
  setCurrentPage: (page: 'home' | 'about' | 'contact') => void;
  onStartQuiz: () => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage, onStartQuiz }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Helper to handle navigation and close the mobile menu
    const handleNavigate = (page: 'home' | 'about' | 'contact') => {
        setCurrentPage(page);
        setIsMenuOpen(false);
    };

    const handleQuizAndCloseMenu = () => {
        onStartQuiz();
        setIsMenuOpen(false);
    }

    return (
        <header className="bg-brand-dark-end/80 shadow-sm sticky top-0 z-50 backdrop-blur-lg">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('home')}>
                    <LiaLogo />
                    <span className="text-2xl font-bold text-white">Lia CRM AI</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <button onClick={() => handleNavigate('home')} className="text-gray-300 hover:text-white transition-colors font-medium">Início</button>
                    <button onClick={onStartQuiz} className="text-gray-300 hover:text-white transition-colors font-medium">Demonstração</button>
                    <button onClick={() => handleNavigate('about')} className="text-gray-300 hover:text-white transition-colors font-medium">Sobre</button>
                    <button onClick={() => handleNavigate('contact')} className="text-gray-300 hover:text-white transition-colors font-medium">Contato</button>
                    <button onClick={onStartQuiz} className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-all font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5">
                        Fazer Diagnóstico
                    </button>
                </div>

                {/* Mobile Menu Button (Hamburger) */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        aria-label="Abrir menu" 
                        aria-expanded={isMenuOpen}
                        className="text-white p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-16 6h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Panel */}
            <div 
                className={`
                    md:hidden absolute top-full left-0 w-full bg-brand-dark-end shadow-lg transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-[120%]'}
                `}
            >
                <div className="px-4 pt-2 pb-4 space-y-2">
                    <button onClick={() => handleNavigate('home')} className="block w-full text-left px-4 py-2 text-lg text-gray-300 rounded-md hover:bg-white/10 hover:text-white">Início</button>
                    <button onClick={handleQuizAndCloseMenu} className="block w-full text-left px-4 py-2 text-lg text-gray-300 rounded-md hover:bg-white/10 hover:text-white">Demonstração</button>
                    <button onClick={() => handleNavigate('about')} className="block w-full text-left px-4 py-2 text-lg text-gray-300 rounded-md hover:bg-white/10 hover:text-white">Sobre</button>
                    <button onClick={() => handleNavigate('contact')} className="block w-full text-left px-4 py-2 text-lg text-gray-300 rounded-md hover:bg-white/10 hover:text-white">Contato</button>
                    <div className="pt-4 mt-2 border-t border-gray-700">
                         <button onClick={handleQuizAndCloseMenu} className="block w-full text-center bg-primary text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition-all font-semibold shadow-lg shadow-blue-500/20">
                            Fazer Diagnóstico
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-brand-dark text-white">
        <div className="container mx-auto px-6 py-12 text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
                <LiaLogo />
                <span className="text-2xl font-bold">Lia CRM AI</span>
            </div>
            <p className="text-gray-400">Simplificando a gestão de leads para clínicas.</p>
            <p className="mt-8 text-sm text-gray-500">&copy; {new Date().getFullYear()} LIA IA CRM. Todos os direitos reservados.</p>
        </div>
    </footer>
);

// Componente para a tela de carregamento, exibido enquanto os dados iniciais são buscados.
const LoadingScreen: React.FC = () => (
    <div className="fixed inset-0 bg-base-200 flex flex-col items-center justify-center z-50">
        <LiaLogo />
        <p className="mt-4 text-lg text-content-200 animate-pulse">Carregando sistema...</p>
    </div>
);

// Componente para a tela de erro, exibido se a busca de dados iniciais falhar.
const ErrorScreen: React.FC<{ message: string }> = ({ message }) => (
    <div className="fixed inset-0 bg-base-100 flex flex-col items-center justify-center z-50 p-6 text-center">
         <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        </div>
        <h1 className="text-2xl font-bold text-content-100">Ocorreu um Erro na Inicialização</h1>
        <p className="mt-2 text-content-200 max-w-md">{message}</p>
        <button 
            onClick={() => window.location.reload()}
            className="mt-6 bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-all"
        >
            Tentar Novamente
        </button>
    </div>
);


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact'>('home');
  const [isQuizVisible, setQuizVisible] = useState(false);
  
  // Estados para gerenciar o ciclo de vida da inicialização da aplicação.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // useEffect para rodar a lógica de inicialização uma vez, quando o componente é montado.
  useEffect(() => {
    const initializeApp = async () => {
        try {
            // Aqui é onde uma chamada de API (fetch) essencial aconteceria.
            // A simulação abaixo demonstra como a aplicação se comporta.
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Em um cenário real, um erro de rede (CORS, offline, etc.) causaria uma rejeição aqui.
                    // Para testar, você pode descomentar a linha abaixo para simular a falha:
                    // return reject(new Error("Falha simulada ao buscar dados iniciais."));
                    resolve(true); // Simula uma conexão bem-sucedida.
                }, 1500);
            });

        } catch (err) {
            // ESTRATÉGIA DE RESILIÊNCIA: Em vez de bloquear a UI com uma tela de erro,
            // registramos o erro para depuração e permitimos que o app continue a renderizar.
            // Isso torna a aplicação resiliente a problemas de conectividade com o backend no início.
            console.warn("Falha ao conectar ao backend durante a inicialização. A aplicação continuará em um estado desconectado.", err);
            // Propositalmente não chamamos setError() aqui, para evitar a tela de erro e a tela branca.
        } finally {
            // Ao final, independentemente de sucesso ou falha,
            // marcamos a inicialização como concluída e removemos a tela de carregamento.
            setIsLoading(false);
            setIsInitialized(true);
        }
    };

    initializeApp();
  }, []);

  const handleStartQuiz = () => setQuizVisible(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage onStartQuiz={handleStartQuiz} />;
    }
  };
  
  // Renderização Condicional Robusta
  
  if (isLoading) {
    // 1. Enquanto carrega, exibe a tela de loading.
    return <LoadingScreen />;
  }

  if (error) {
    // 2. Se houver um erro *crítico* (que não seja da chamada inicial), exibe a tela de erro.
    return <ErrorScreen message={error} />;
  }

  // 3. Renderiza a aplicação principal assim que a inicialização for concluída (com ou sem sucesso da chamada de API).
  if (isInitialized) {
    return (
      <div className="relative min-h-screen font-sans bg-gradient-to-br from-brand-dark-start to-brand-dark-end overflow-hidden">
        {/* The animated background element */}
        <div className="absolute top-0 left-0 w-[200%] h-[200%] z-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.1)_1px,_transparent_0)] [background-size:40px_40px] animate-particles" />
        
        {/* The actual content, positioned above the background */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header setCurrentPage={setCurrentPage} onStartQuiz={handleStartQuiz} />
          <main className="flex-grow">
            {renderPage()}
          </main>
          <Footer />
        </div>

        {/* Quiz Funnel is outside the main content flow to overlay everything */}
        {isQuizVisible && <QuizFunnel onClose={() => setQuizVisible(false)} />}
      </div>
    );
  }

  // Fallback para o caso de a aplicação não estar carregando, sem erro, mas não inicializada.
  return null;
};

export default App;