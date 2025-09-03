// src/components/HomePage.tsx

import React, { useState, useEffect, useRef } from 'react';
import { CrmIcon, CheckCircleIcon, ClockIcon, DoubleCheckIcon, LiaAiIcon } from './icons';

// ==================================================================
// DEFINIÇÃO DOS COMPONENTES QUE ESTAVAM FALTANDO
// ==================================================================

const ChatBubble: React.FC<{ message: string; sender: 'user' | 'ia'; timestamp: string; showChecks?: boolean; }> = ({ message, sender, timestamp, showChecks }  ) => {
    const isUser = sender === 'user';
    return (
        <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative max-w-[85%] px-3 py-2 rounded-xl shadow-md ${isUser ? 'bg-[#dcf8c6] text-content-100 rounded-br-none' : 'bg-base-100 text-content-100 rounded-bl-none'}`}>
                <p className="text-xs leading-snug break-all">{message}</p>
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
    <div className="relative mx-auto border-gray-700 bg-black border-[8px] sm:border-[10px] rounded-[2rem] sm:rounded-[2.5rem] h-[480px] w-[240px] sm:h-[550px] sm:w-[280px] shadow-2xl shadow-blue-500/10">
        <div className="w-[100px] sm:w-[140px] h-[16px] sm:h-[18px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[30px] sm:h-[40px] w-[3px] bg-gray-600 absolute -start-[11px] sm:-start-[13px] top-[80px] sm:top-[100px] rounded-s-lg"></div>
        <div className="h-[30px] sm:h-[40px] w-[3px] bg-gray-600 absolute -start-[11px] sm:-start-[13px] top-[120px] sm:top-[150px] rounded-s-lg"></div>
        <div className="h-[50px] sm:h-[60px] w-[3px] bg-gray-600 absolute -end-[11px] sm:-end-[13px] top-[100px] sm:top-[120px] rounded-e-lg"></div>
        <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden w-full h-full bg-white flex flex-col">
            <div className="bg-[#005e54] text-white px-3 pt-3 pb-1 flex items-center gap-3 shadow-md h-[56px] flex-shrink-0">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                    <svg viewBox="0 0 512 512" className="w-8 h-8 text-blue-500" fill="currentColor"><path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 368c-92.84 0-168-75.16-168-168S163.16 88 256 88s168 75.16 168 168-75.16 168-168 168z"/><path d="M298.33 194.55a53.82 53.82 0 00-42.33-22.18h-29.4c-32.51 0-58.93 26.42-58.93 58.93v0c0 20.33 10.53 39.11 27.24 49.91l46.25 30.83c6.74 4.5 15.61 1.25 18.5-6.35l1.24-3.3c3-8.31-4-17-12.8-19.9l-30.33-10c-4.63-1.52-7.6-6-7.6-10.8v-9.53c0-9.53 7.73-17.26 17.26-17.26h29.4c16.14 0 29.4-13.26 29.4-29.4s-13.26-29.4-29.4-29.4z"/></svg>
                 </div>
                 <div className="truncate">
                    <h3 className="font-semibold text-sm">Clínica Sorriso Ideal</h3>
                    <p className="text-xs text-gray-200">online</p>
                 </div>
            </div>
            <div className="flex-grow h-[calc(100%-56px)] bg-[#e5ddd5] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'  )] bg-center p-3 sm:p-4 space-y-4 flex flex-col justify-end">
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

const useAnimateOnScroll = (options?: IntersectionObserverInit) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            }
        }, { threshold: 0.1, ...options });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options]);

    return [ref, isVisible] as const;
};


const HomePage: React.FC<{ onStartQuiz: () => void }> = ({ onStartQuiz }) => {
    const [isTyping, setIsTyping] = useState(false);
    const [showIaResponse, setShowIaResponse] = useState(false);
    const [showUserMessage, setShowUserMessage] = useState(false);

    const [demoRef, isDemoVisible] = useAnimateOnScroll();
    const [crmRef, isCrmVisible] = useAnimateOnScroll();
    const [ctaRef, isCtaVisible] = useAnimateOnScroll();

    useEffect(() => {
        if (isDemoVisible) {
            // Inicia a sequência de animação do chat quando a seção fica visível
            setTimeout(() => setShowUserMessage(true), 300);
            setTimeout(() => setIsTyping(true), 1200);
            setTimeout(() => {
                setIsTyping(false);
                setShowIaResponse(true);
            }, 3000);
        }
    }, [isDemoVisible]);

    const sectionBaseClasses = "transition-all duration-700 ease-in-out py-16 sm:py-24 px-6 container mx-auto";

    return (
        <div className="overflow-x-hidden animate-fade-in">
            {/* Seção Hero */}
            <section className={`${sectionBaseClasses} min-h-[70vh] flex flex-col justify-center text-center`}>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight">
                    Sua agenda lotada, <span className="text-primary">sem tocar no telefone.</span>
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
                    A Lia IA qualifica, agenda e confirma seus pacientes 24/7, para que sua equipe possa focar no que realmente importa: o atendimento humanizado.
                </p>
                <div className="mt-10">
                    <button onClick={onStartQuiz} className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 shadow-2xl shadow-blue-500/30">
                        Iniciar Diagnóstico Gratuito
                    </button>
                </div>
            </section>

            {/* Demonstração Interativa */}
            <section ref={demoRef} id="demo" className={`${sectionBaseClasses} transition-opacity duration-1000 ${isDemoVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                 <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
                        Sua clínica sofre com algum destes problemas?
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-left space-y-6">
                         <div className={`flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-700 ease-out ${isDemoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '200ms' }}>
                             <div className="bg-blue-100 text-primary rounded-full p-3 flex-shrink-0"><CheckCircleIcon /></div>
                             <div>
                                 <h3 className="font-bold text-lg text-white">Leads não respondem?</h3>
                                 <p className="text-gray-300">A Lia aborda cada novo contato em menos de 5 segundos via WhatsApp, aumentando em até 70% a chance de agendamento.</p>
                             </div>
                         </div>
                         <div className={`flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-700 ease-out ${isDemoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '400ms' }}>
                             <div className="bg-green-100 text-secondary rounded-full p-3 flex-shrink-0"><ClockIcon /></div>
                             <div>
                                 <h3 className="font-bold text-lg text-white">Agenda com buracos e faltas?</h3>
                                 <p className="text-gray-300">Nossa IA confirma as consultas de forma inteligente e preenche cancelamentos automaticamente, recuperando sua receita perdida.</p>
                             </div>
                         </div>
                         <div className={`flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-700 ease-out ${isDemoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '600ms' }}>
                             <div className="bg-purple-100 text-purple-500 rounded-full p-3 flex-shrink-0"><LiaAiIcon /></div>
                             <div>
                                 <h3 className="font-bold text-lg text-white">Secretária sobrecarregada?</h3>
                                 <p className="text-gray-300">Liberte sua equipe de tarefas repetitivas. Deixe a Lia cuidar do online para que sua secretária possa encantar os pacientes no balcão.</p>
                             </div>
                         </div>
                    </div>
                    <div>
                        <PhoneMockup showUserMessage={showUserMessage} showIaResponse={showIaResponse} isTyping={isTyping} />
                    </div>
                </div>
            </section>

             {/* Como Funciona */}
            <section ref={crmRef} id="how-it-works" className={`${sectionBaseClasses} text-center transition-opacity duration-1000 ${isCrmVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Veja a Lia em Ação em 3 Passos Simples</h2>
                <p className="text-gray-300 mb-12 max-w-3xl mx-auto">
                    O paciente entra em contato, a LIA agenda, e você vê sua clínica lotar. Simples assim.
                </p>
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-left">
                    {/* Step 1 */}
                    <div className={`p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg transition-all duration-700 ease-out ${isCrmVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '100ms' }}>
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-black text-primary opacity-50">1</span>
                            <h3 className="font-bold text-xl text-white">O Paciente Chama</h3>
                        </div>
                        <p className="mt-3 text-gray-300">Seja por WhatsApp, Instagram ou Site, a Lia está pronta para atender instantaneamente, 24/7.</p>
                    </div>
                     {/* Step 2 */}
                    <div className={`p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg transition-all duration-700 ease-out ${isCrmVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '300ms' }}>
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-black text-primary opacity-50">2</span>
                            <h3 className="font-bold text-xl text-white">A Lia Agenda</h3>
                        </div>
                        <p className="mt-3 text-gray-300">Ela consulta sua agenda em tempo real, oferece horários livres e marca a consulta sem intervenção humana.</p>
                    </div>
                     {/* Step 3 */}
                     <div className={`p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg transition-all duration-700 ease-out ${isCrmVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '500ms' }}>
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-black text-primary opacity-50">3</span>
                            <h3 className="font-bold text-xl text-white">Você Vê a Agenda Lotar</h3>
                        </div>
                        <p className="mt-3 text-gray-300">Acompanhe novos agendamentos entrando direto no seu CRM, enquanto sua equipe foca nos pacientes.</p>
                    </div>
                </div>
                 <div className={`mt-12 max-w-5xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl shadow-2xl p-2 border border-white/10 transition-all duration-700 ease-out ${isCrmVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                     <div className="bg-gray-800/50 rounded-t-lg p-2 flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <img src="https://i.imgur.com/NBT3STA.png" alt="Painel do LIA CRM mostrando a lista de leads" className="rounded-b-lg w-full" />
                </div>
            </section>

            {/* Seção CTA Final */}
            <section ref={ctaRef} id="cta" className={`${sectionBaseClasses} transition-opacity duration-1000 ${isCtaVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl max-w-6xl mx-auto p-12 sm:p-16 text-center">
                    <CrmIcon />
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">Transforme o caos em lucro.</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                       Chega de perder pacientes por falta de tempo ou falha humana. Deixe a Lia IA ser sua máquina de agendamentos 24/7.
                    </p>
                    <div className="mt-8 flex justify-center">
                         <button onClick={onStartQuiz} className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-transform transform hover:scale-105 w-full sm:w-auto shadow-2xl shadow-blue-500/30">
                            Iniciar Diagnóstico Gratuito
                        </button>
                    </div>
                </div>
            </section>
        </div>
      );
};

export default HomePage;