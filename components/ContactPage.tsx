import React from 'react';
import { LiaLogo, LiaAiIcon } from './icons';

const ContactPage: React.FC = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Em um app real, aqui haveria a lógica de envio do formulário.
        alert('Obrigado pelo seu contato! Em breve retornaremos.');
    };

    return (
        <div className="animate-fade-in container mx-auto px-6 py-16 sm:py-24">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-bold text-content-100 sm:text-5xl">Fale Conosco</h1>
                <p className="mt-4 text-xl text-content-200">
                    Tem alguma dúvida ou quer saber mais? Escolha o melhor canal para você.
                </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
                {/* Formulário de Contato */}
                <div className="bg-base-100 p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-content-100 mb-1">Deixe sua mensagem</h2>
                    <p className="text-content-200 mb-6">Nossa equipe responderá o mais rápido possível.</p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-content-100 mb-1">Nome</label>
                            <input type="text" id="name" required className="w-full px-4 py-2.5 bg-base-200 rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:outline-none transition-shadow" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-content-100 mb-1">Email</label>
                            <input type="email" id="email" required className="w-full px-4 py-2.5 bg-base-200 rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:outline-none transition-shadow" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-content-100 mb-1">Mensagem</label>
                            <textarea id="message" rows={4} required className="w-full px-4 py-2.5 bg-base-200 rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-primary text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20">
                            Enviar Mensagem
                        </button>
                    </form>
                </div>
                
                {/* Chat da LIA (Protótipo) */}
                <div className="bg-base-100 p-8 rounded-xl shadow-lg h-full flex flex-col">
                     <h2 className="text-2xl font-bold text-content-100 mb-1">Fale com a LIA IA</h2>
                    <p className="text-content-200 mb-6">Experimente uma conversa com nossa assistente virtual.</p>
                    <div className="flex-grow bg-base-200 rounded-lg p-4 flex flex-col border border-base-300">
                        <div className="flex-grow space-y-4">
                             <div className="flex items-end gap-2.5 justify-start">
                                <div className="relative max-w-[80%] p-3 rounded-xl shadow-sm bg-white text-content-100 rounded-bl-none">
                                    <p className="text-sm">Olá! Sou a LIA, sua assistente virtual. Como posso te ajudar hoje?</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 bg-white rounded-lg p-3 text-center text-sm text-content-200">
                           <p><strong>Chat em desenvolvimento.</strong></p>
                           <p>Em breve, você poderá interagir com a LIA diretamente por aqui!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
