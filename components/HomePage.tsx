import React, { useState } from 'react';
import { LiaAiIcon, UserIcon, CrmIcon, CheckCircleIcon, ClockIcon, DoubleCheckIcon } from './icons';

const whatsappLink = "https://wa.me/555399640159";

interface ChatBubbleProps {
    message: string;
    sender: 'user' | 'ia';
    timestamp: string;
    showChecks?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender, timestamp, showChecks }) => {
    const isUser = sender === 'user';
    return (
        <div className={`flex items-end gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative max-w-[80%] p-3 rounded-xl shadow-sm ${isUser ? 'bg-[#dcf8c6] text-content-100 rounded-br-none' : 'bg-base-100 text-content-100 rounded-bl-none'}`}>
                <p className="text-sm">{message}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                    <p className="text-xs text-gray-400">{timestamp}</p>
                    {isUser && showChecks && <DoubleCheckIcon />}
                </div>
            </div>
        </div>
    );
};


interface PhoneMockupProps {
    showResponse: boolean;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ showResponse }) => (
    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[550px] w-[280px] shadow-2xl">
        <div className="w-[140px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[40px] w-[3px] bg-gray-800 absolute -start-[13px] top-[100px] rounded-s-lg"></div>
        <div className="h-[40px] w-[3px] bg-gray-800 absolute -start-[13px] top-[150px] rounded-s-lg"></div>
        <div className="h-[60px] w-[3px] bg-gray-800 absolute -end-[13px] top-[120px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
            <div className="bg-[#005e54] text-white px-4 py-2 flex items-center gap-3 shadow-md">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src="https://i.imgur.com/bB1p95b.png" alt="Logo da Clínica Sorriso Ideal" className="w-full h-full object-cover" />
                 </div>
                 <div className="truncate translate-y-2">
                    <h3 className="font-semibold text-xs lowercase">clínica sorriso ideal</h3>
                    <p className="text-[10px] lowercase">online</p>
                 </div>
            </div>
            <div className="h-[calc(100%-52px)] bg-[#e5ddd5] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-center p-4 space-y-4 flex flex-col justify-end">
                <div className="animate-bubble-pop">
                    <ChatBubble 
                        sender="user" 
                        message="Olá, gostaria de saber mais sobre o tratamento de clareamento dental. Vocês poderiam me passar o valor?" 
                        timestamp="10:30" 
                        showChecks
                    />
                </div>
                {showResponse && (
                    <div className="animate-bubble-pop" style={{animationDelay: '0.5s'}}>
                      <ChatBubble 
                          sender="ia" 
                          message="Olá! Claro. O clareamento dental é um dos nossos procedimentos mais populares. Para te passar um valor exato e um plano de tratamento ideal, precisamos fazer uma avaliação inicial. Qual o melhor dia e horário para você agendar uma consulta sem compromisso?" 
                          timestamp="10:31" 
                      />
                    </div>
                )}
            </div>
        </div>
    </div>
);


const HomePage: React.FC = () => {
    const [step, setStep] = useState(0);

    const sectionBaseClasses = "transition-all duration-700 ease-in-out py-16 sm:py-24 px-6 container mx-auto text-center";
    const sectionVisibleClasses = "opacity-100 translate-y-0";
    const sectionHiddenClasses = "opacity-0 translate-y-5 pointer-events-none";

    return (
        <div className="overflow-x-hidden animate-fade-in">
            {/* Step 0: Hero Section */}
            <section className={`${sectionBaseClasses} ${step >= 0 ? sectionVisibleClasses : sectionHiddenClasses} min-h-[70vh] flex flex-col justify-center`}>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-content-100 tracking-tight leading-tight">
                    Não Perca Mais Nenhum Paciente do <span className="text-primary">WhatsApp</span>.
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-content-200">
                    LIA IA qualifica, agenda e gerencia seus leads 24/7, transformando conversas em pacientes fiéis para sua clínica.
                </p>
                <div className="mt-10">
                    <button
                        onClick={() => {
                            setStep(1);
                            document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 shadow-2xl shadow-blue-500/30"
                    >
                        Iniciar Demonstração Interativa
                    </button>
                </div>
            </section>

            {/* Step 1 & 2: Interactive Demo */}
            <section id="demo" className={`py-16 sm:py-24 px-6 container mx-auto ${step >= 1 ? 'animate-fade-in-up' : 'opacity-0'}`}>
                 <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-content-100 mb-2">
                        {step < 2 ? '1. Um novo paciente entra em contato...' : '2. LIA IA responde instantaneamente!'}
                    </h2>
                    <p className="text-content-200 mb-12 max-w-2xl mx-auto">
                        {step < 2 
                            ? 'Veja como um simples contato no WhatsApp se torna uma oportunidade de negócio, sem que sua equipe precise parar o que está fazendo.'
                            : 'Com inteligência e personalização, a LIA qualifica o lead e sugere o próximo passo, mantendo o paciente engajado.'
                        }
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-left space-y-6 animate-slide-in-right">
                         <div className="flex items-start gap-4 p-5 rounded-xl bg-base-100 shadow-sm">
                             <div className="bg-blue-100 text-primary rounded-full p-3 flex-shrink-0">
                                 <CheckCircleIcon />
                             </div>
                             <div>
                                 <h3 className="font-bold text-lg text-content-100">Qualificação Automática</h3>
                                 <p className="text-content-200">LIA entende a necessidade do paciente e coleta as informações essenciais para a clínica.</p>
                             </div>
                         </div>
                         <div className="flex items-start gap-4 p-5 rounded-xl bg-base-100 shadow-sm">
                             <div className="bg-green-100 text-secondary rounded-full p-3 flex-shrink-0">
                                 <ClockIcon />
                             </div>
                             <div>
                                 <h3 className="font-bold text-lg text-content-100">Agendamento Inteligente 24/7</h3>
                                 <p className="text-content-200">A IA sugere horários e realiza o pré-agendamento da consulta, direto na conversa, a qualquer hora do dia.</p>
                             </div>
                         </div>
                    </div>
                    <div>
                        <PhoneMockup showResponse={step >= 2} />
                    </div>
                </div>
                <div className="mt-12 text-center">
                    {step === 1 && (
                        <button onClick={() => setStep(2)} className="bg-secondary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-500 animate-fade-in transition-all transform hover:scale-105 shadow-lg shadow-teal-500/20">
                            Ver a Resposta da LIA
                        </button>
                    )}
                    {step === 2 && (
                         <button onClick={() => {
                            setStep(3);
                            document.getElementById('crm-view')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                         }} className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 animate-fade-in transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20">
                            Ver Lead no CRM
                        </button>
                    )}
                </div>
            </section>

             {/* Step 3: CRM View */}
            <section id="crm-view" className={`${sectionBaseClasses} ${step >= 3 ? sectionVisibleClasses : sectionHiddenClasses}`}>
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
                    <img 
                        src="https://i.imgur.com/NBT3STA.png"
                        alt="Painel do LIA CRM mostrando a lista de leads com status e informações de contato"
                        className="rounded-b-lg w-full"
                    />
                </div>
            </section>


            {/* Step 4: CTA */}
            <section id="cta" className={`bg-base-100 rounded-xl max-w-6xl my-16 mx-auto ${step >= 3 ? 'animate-fade-in-up' : 'opacity-0'} ${sectionBaseClasses}`}>
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