import React, { useState } from 'react';
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


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact'>('home');

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