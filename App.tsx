import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { LiaLogo } from './components/icons';

const whatsappLink = "https://wa.me/555399640159";

interface HeaderProps {
  setCurrentPage: (page: 'home' | 'about' | 'contact') => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage }) => (
  <header className="bg-base-100/80 shadow-sm sticky top-0 z-50 backdrop-blur-lg">
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
        <LiaLogo />
        <span className="text-2xl font-bold text-content-100">Lia CRM AI</span>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-content-200 hover:text-primary transition-colors font-medium">Demonstração</a>
        <button onClick={() => setCurrentPage('about')} className="text-content-200 hover:text-primary transition-colors font-medium">Sobre</button>
        <button onClick={() => setCurrentPage('contact')} className="text-content-200 hover:text-primary transition-colors font-medium">Contato</button>
      </div>
       <div className="flex items-center space-x-4">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-all font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5">
          Quero a LIA IA
        </a>
      </div>
    </nav>
  </header>
);

const Footer: React.FC = () => (
    <footer className="bg-brand-dark text-white mt-16">
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
  
  // Estados para gerenciar o ciclo de vida da inicialização da aplicação.
  // Isso é crucial para evitar a "tela branca" em caso de falhas de rede.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para rodar a lógica de inicialização uma vez, quando o componente é montado.
  useEffect(() => {
    const initializeApp = async () => {
        try {
            // 1. Início da tentativa de inicialização.
            // Aqui seria o local ideal para chamadas de API (fetch) essenciais para a aplicação.
            // Para este exemplo, simulamos uma operação assíncrona que pode falhar.
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Para testar o tratamento de erro, podemos simular uma falha.
                    // Descomente a linha abaixo para ver a tela de erro em ação.
                    // if (Math.random() > 0.5) {
                    //   return reject(new Error("Falha simulada ao buscar dados. Verifique sua conexão com a internet e tente novamente."));
                    // }
                    resolve(true);
                }, 1500);
            });
            // 2. Sucesso: Se a operação acima for bem-sucedida, não fazemos nada aqui.
            // O `finally` cuidará de remover a tela de carregamento.

        } catch (err) {
            // 3. Falha: Se a promessa for rejeitada (simulando um erro de fetch),
            // capturamos o erro e atualizamos o estado de erro.
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocorreu um erro inesperado durante a inicialização.");
            }
        } finally {
            // 4. Conclusão: Este bloco é executado tanto em caso de sucesso quanto de falha.
            // Definimos isLoading como false para remover a tela de carregamento e
            // exibir a aplicação ou a tela de erro.
            setIsLoading(false);
        }
    };

    initializeApp();
  }, []);


  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };
  
  // Renderização Condicional: A chave para uma UX robusta.
  // Com base nos estados, decidimos o que renderizar.
  
  if (isLoading) {
    // Se estiver carregando, exibe a tela de loading.
    return <LoadingScreen />;
  }

  if (error) {
    // Se houver um erro, exibe a tela de erro com uma mensagem clara.
    return <ErrorScreen message={error} />;
  }

  // Se não estiver carregando e não houver erro, renderiza a aplicação principal.
  return (
    <div className="min-h-screen bg-base-200 font-sans text-content-100">
      <Header setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;