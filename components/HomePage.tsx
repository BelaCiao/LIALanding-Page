// src/components/HomePage.tsx

import React, { useState } from 'react';
import { CrmIcon, CheckCircleIcon, ClockIcon, DoubleCheckIcon } from './icons';

const whatsappLink = "https://wa.me/555399640159";

// ==================================================================
// CORREÇÃO: DEFINIÇÃO DOS COMPONENTES QUE ESTAVAM FALTANDO
// ==================================================================

const ChatBubble: React.FC<{ message: string; sender: 'user' | 'ia'; timestamp: string; showChecks?: boolean; }> = ({ message, sender, timestamp, showChecks } ) => {
    const isUser = sender === 'user';
    return (
        <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative max-w-[85%] px-3 py-2 rounded-xl shadow-md ${isUser ? 'bg-[#dcf8c6] text-content-100 rounded-br-none' : 'bg-base-100 text-content-100 rounded-bl-none'}`}>
                <p className="text-sm leading-snug break-words">{message}</p>
                <div className="flex items-center justify-end gap-1 mt-1.5">
                    <p className="text-[10px] text-gray-400">{timestamp}</p>
                    {isUser && showChecks && <DoubleCheckIcon />}
                </div>
            </div>
        </div>
    );
};

const TypingIndicator: React.FC = () => (
    <div className="flex items-end gap-2 justify-start animate-bubble-pop">
        <div className="relative max-w-[80%] p-3 rounded-xl shadow-md bg-base-100 text-content-100 rounded-bl-none">
            <div className="flex items-center justify-center space-x-1 h-5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot" style={{ animationDelay: '0s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot" style={{ animationDelay: '0.4s' }}></span>
            </div>
        </div>
    </div>
);

// ==================================================================
// FIM DA CORREÇÃO
// ==================================================================


const PhoneMockup: React.FC<{ showUserMessage: boolean; isTyping: boolean; showIaResponse: boolean; }> = ({ showUserMessage, isTyping, showIaResponse }) => (
    <div className="relative mx-auto border-gray-900 bg-gray-900 border-[8px] sm:border-[10px] rounded-[2rem] sm:rounded-[2.5rem] h-[480px] w-[240px] sm:h-[550px] sm:w-[280px] shadow-2xl">
        <div className="w-[100px] sm:w-[140px] h-[16px] sm:h-[18px] bg-gray-900 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[30px] sm:h-[40px] w-[3px] bg-gray-900 absolute -start-[11px] sm:-start-[13px] top-[80px] sm:top-[100px] rounded-s-lg"></div>
        <div className="h-[30px] sm:h-[40px] w-[3px] bg-gray-900 absolute -start-[11px] sm:-start-[13px] top-[120px] sm:top-[150px] rounded-s-lg"></div>
        <div className="h-[50px] sm:h-[60px] w-[3px] bg-gray-900 absolute -end-[11px] sm:-end-[13px] top-[100px] sm:top-[120px] rounded-e-lg"></div>
        <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden w-full h-full bg-white flex flex-col">
            <div className="bg-[#005e54] text-white px-3 py-2 flex items-center gap-3 shadow-md h-[56px] flex-shrink-0">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                    <svg viewBox="0 0 512 512" className="w-8 h-8 text-blue-500" fill="currentColor"><path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 368c-92.84 0-168-75.16-168-168S163.16 88 256 88s168 75.16 168 168-75.16 168-168 168z"/><path d="M298.33 194.55a53.82 53.82 0 00-42.33-22.18h-29.4c-32.51 0-58.93 26.42-58.93 58.93v0c0 20.33 10.53 39.11 27.24 49.91l46.25 30.83c6.74 4.5 15.61 1.25 18.5-6.35l1.24-3.3c3-8.31-4-17-12.8-19.9l-30.33-10c-4.63-1.52-7.6-6-7.6-10.8v-9.53c0-9.53 7.73-17.26 17.26-17.26h29.4c16.14 0 29.4-13.26 29.4-29.4s-13.26-29.4-29.4-29.4z"/></svg>
                 </div>
                 <div className="truncate">
                    <h3 className="font-semibold text-base">Clínica Sorriso Ideal</h3>
                    <p className="text-xs text-gray-200">online</p>
                 </div>
            </div>
            <div className="flex-grow h-[calc(100%-56px)] bg-[#e5ddd5] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png' )] bg-center p-3 sm:p-4 space-y-4 flex flex-col justify-end">
                {showUserMessage && (
                    <div className="animate-bubble-pop">
                        <ChatBubble sender="user" message="Olá, gostaria de saber mais sobre o tratamento de clareamento dental. Vocês poderiam me passar o valor?" timestamp="10:30" showChecks />
                    </div>
                )}
                {isTyping && <TypingIndicator />}
                {showIaResponse && (
                    <div className="animate-bubble-pop" style={{animationDelay: '0.2s'}}>
                      <ChatBubble sender="ia" message="Olá! Claro. O clareamento dental é um dos nossos procedimentos mais populares. Para te passar um valor exato e um plano de tratamento ideal, precisamos fazer uma avaliação inicial. Qual o melhor dia e horário para você agendar uma consulta sem compromisso?" timestamp="10:31" />
                    </div>
                )}
            </div>
        </div>
    </div>
);

const HomePage: React.FC = () => {
    const [step, setStep] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [showIaResponse, setShowIaResponse] = useState(false);
    const [showUserMessage, setShowUserMessage] = useState(false);

    const handleStartDemo = () => {
        setStep(1);
        setTimeout(() => {
            setShowUserMessage(true);
            document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleShowIaResponse = () => {
        if (showIaResponse || isTyping) return;
        setStep(2);
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setShowIaResponse(true);
        }, 1800);
    };

    const handleShowCrm = () => {
        setStep(3);
        document.getElementById('crm-view')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const sectionBaseClasses = "transition-all duration-700 ease-in-out py-16 sm:py-24 px-6 container mx-auto";

    return (
        <div className="overflow-x-hidden animate-fade-in">
            {/* Seção Hero */}
            <section className={`${sectionBaseClasses} min-h-[70vh] flex flex-col justify-center text-center`}>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-content-100 tracking-tight leading-tight">
                    Não Perca Mais Nenhum Paciente do <span className="text-primary">WhatsApp</span>.
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-content-200">
                    LIA IA qualifica, agenda e gerencia seus leads 24/7, transformando conversas em pacientes fiéis para sua clínica.
                </p>
                <div className="mt-10">
                    <button onClick={handleStartDemo} className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 shadow-2xl shadow-blue-500/30">
                        Iniciar Demonstração Interativa
                    </button>
                </div>
            </section>

            {/* Demonstração Interativa */}
            <section id="demo" className={`${sectionBaseClasses} ${step >= 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                 <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-content-100 mb-2 transition-all duration-500">
                        {step < 2 ? '1. Um novo paciente entra em contato...' : '2. LIA IA responde instantaneamente!'}
                    </h2>
                    <p className="text-content-200 mb-12 max-w-2xl mx-auto transition-all duration-500">
                        {step < 2 
                            ? 'Veja como um simples contato no WhatsApp se torna uma oportunidade de negócio, sem que sua equipe precise parar o que está fazendo.'
                            : 'Com inteligência e personalização, a LIA qualifica o lead e sugere o próximo passo, mantendo o paciente engajado.'
                        }
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-left space-y-6">
                         <div className="flex items-start gap-4 p-5 rounded-xl bg-base-100 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                             <div className="bg-blue-100 text-primary rounded-full p-3 flex-shrink-0"><CheckCircleIcon /></div>
                             <div>
                                 <h3 className="font-bold text-lg text-content-100">Qualificação Automática</h3>
                                 <p className="text-content-200">LIA entende a necessidade do paciente e coleta as informações essenciais para a clínica.</p>
                             </div>
                         </div>
                         <div className="flex items-start gap-4 p-5 rounded-xl bg-base-100 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                             <div className="bg-green-100 text-secondary rounded-full p-3 flex-shrink-0"><ClockIcon /></div>
                             <div>
                                 <h3 className="font-bold text-lg text-content-100">Agendamento Inteligente 24/7</h3>
                                 <p className="text-content-200">A IA sugere horários e realiza o pré-agendamento da consulta, direto na conversa, a qualquer hora do dia.</p>
                             </div>
                         </div>
                    </div>
                    <div>
                        <PhoneMockup showUserMessage={showUserMessage} showIaResponse={showIaResponse} isTyping={isTyping} />
                    </div>
                </div>
                <div className="mt-12 text-center h-14">
                    {step === 1 && !isTyping && !showIaResponse && (
                        <button onClick={handleShowIaResponse} className="bg-secondary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-500 animate-fade-in transition-all transform hover:scale-105 shadow-lg shadow-teal-500/20">
                            Ver a Resposta da LIA
                        </button>
                    )}
                    {showIaResponse && (
                         <button onClick={handleShowCrm} className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 animate-fade-in transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20">
                            Ver Lead no CRM
                        </button>
                    )}
                </div>
            </section>

             {/* Visualização do CRM */}
            <section id="crm-view" className={`${sectionBaseClasses} text-center ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}>
                <h2 className="text-3xl sm:text-4xl font-bold text-content-100 mb-2">3. Tudo centralizado no seu CRM.</h2>
                <p className="text-content-200 mb-12 max-w-3xl mx-auto">
                    O novo lead é criado automaticamente no painel da LIA, com todo o histórico da conversa e status atualizado. Sua equipe só precisa agir.
                </p>
                <div className="max-w-5xl mx-auto bg-base-100 rounded-xl shadow-2xl p-2 border border-base-300">
                     <div className="bg-gray-200 rounded-t-lg p-2 flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <img src="https://i.imgur.com/NBT3STA.png" alt="Painel do LIA CRM mostrando a lista de leads" className="rounded-b-lg w-full" />
                </div>
            </section>

            {/* Seção CTA Final */}
            <section id="cta" className={`bg-base-100 rounded-xl max-w-6xl my-16 mx-auto transition-all duration-700 ${step >= 3 ? 'opacity-100' : 'opacity-0'} ${sectionBaseClasses} text-center`}>
                <CrmIcon />
                <h2 className="text-3xl sm:text-4xl font-bold text-content-100 mt-4">Pronto para automatizar sua clínica?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-content-200">
                   Deixe a LIA IA cuidar dos seus leads e foque no que você faz de melhor: atender seus pacientes.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                     <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-transform transform hover:scale-105 w-full sm:w-auto">
                        Quero a LIA IA na Minha Clínica
                    </a>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-base-200 text-content-100 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-base-300 transition-colors w-full sm:w-auto">
                        Agendar uma Demonstração
                    </a>
                </div>
            </section>
        </div>
     );
};

export default HomePage;