import React, { useState, useEffect, useRef } from 'react';
import {
    FieldServiceIcon, NocSupportIcon, BreakFixIcon, SiteSurveyIcon, RolloutIcon,
    ProvisioningIcon, TroubleshootingIcon, ShieldIcon, BrainIcon, ClockIcon, WhatsappIcon,
    WifiIcon
} from './icons';


const useAnimateOnScroll = (options?: IntersectionObserverInit) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (ref.current) observer.unobserve(ref.current);
            }
        }, { threshold: 0.1, ...options });

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [options]);

    return [ref, isVisible] as const;
};


const HomePage: React.FC<{ onScheduleClick: () => void }> = ({ onScheduleClick }) => {
    const [servicesRef, isServicesVisible] = useAnimateOnScroll();
    const [advantageRef, isAdvantageVisible] = useAnimateOnScroll();
    const [processRef, isProcessVisible] = useAnimateOnScroll();
    const [ctaRef, isCtaVisible] = useAnimateOnScroll();

    const sectionBaseClasses = "transition-all duration-1000 ease-in-out py-16 sm:py-24 px-6 container mx-auto";

    const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; text: string; subServices: { icon: React.ReactNode; name: string }[] }> = ({ icon, title, text, subServices }) => (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 h-full">
            <div className="flex items-center gap-4">
                {icon}
                <h3 className="text-2xl font-bold text-white">{title}</h3>
            </div>
            <p className="mt-4 text-gray-300">{text}</p>
            <div className="mt-6 space-y-3">
                {subServices.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-200">
                        {s.icon}
                        <span>{s.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="overflow-x-hidden animate-fade-in text-white">
            {/* Seção 1: Herói */}
            <section className="py-16 sm:py-24 px-6 container mx-auto min-h-[90vh] flex items-center">
                <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                    <div className="animate-fade-in-up text-center md:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                            Soluções de TI e Redes em Rio Grande e Pelotas. <span className="text-secondary">Suporte Remoto e Atendimento Presencial.</span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto md:mx-0 text-lg text-gray-300">
                            Resolvemos seus problemas de tecnologia, da configuração remota de servidores à instalação de uma rede Wi-Fi de alta performance na sua casa ou empresa.
                        </p>
                         <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                            <button onClick={onScheduleClick} className="bg-secondary text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg shadow-secondary/20">
                                FAÇA UM ORÇAMENTO
                            </button>
                             <a 
                                href="https://wa.me/555399640159" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white/20 transition-all transform hover:scale-105 flex items-center justify-center gap-3"
                            >
                                <WhatsappIcon className="h-6 w-6"/>
                                <span>Fale no WhatsApp</span>
                            </a>
                        </div>
                    </div>
                    <div className="hidden md:flex justify-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                       <div className="w-full max-w-md h-96 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center p-8">
                           <div className="text-center">
                               <p className="text-lg text-gray-400 mb-2">Como Ajudamos</p>
                               <p className="text-2xl font-bold text-white mb-6">Provedores ↔ LIANET ↔ Empresas e Residências</p>
                               <p className="text-base text-gray-300">Conectamos soluções de alta tecnologia com a necessidade local, oferecendo suporte remoto ágil e atendimento presencial especializado.</p>
                           </div>
                       </div>
                    </div>
                </div>
            </section>

            {/* Seção 2: Nossos Serviços */}
            <section ref={servicesRef} id="services" className={`${sectionBaseClasses} ${isServicesVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
                        Nossos Serviços
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <ServiceCard
                        icon={<NocSupportIcon />}
                        title="💻 SUPORTE REMOTO E NOC"
                        text="A agilidade que você precisa, de onde estiver. Das 8h às 14h, nossa equipe está online para gerenciar, configurar e resolver problemas à distância."
                        subServices={[
                            { icon: <ProvisioningIcon />, name: 'Gerência de Redes para Provedores (NOC)' },
                            { icon: <TroubleshootingIcon />, name: 'Suporte a Servidores e Computadores' },
                            { icon: <BrainIcon />, name: 'Otimização de Sistemas e Consultoria' },
                        ]}
                    />
                    <ServiceCard
                        icon={<FieldServiceIcon />}
                        title="🔧 ATENDIMENTO PRESENCIAL (FIELD SERVICE)"
                        text="Seu especialista local na Região Sul. Vamos até você para projetos de infraestrutura, instalação, manutenção e reparos."
                        subServices={[
                            { icon: <RolloutIcon />, name: 'Infraestrutura de Redes e Fibra Óptica' },
                            { icon: <WifiIcon />, name: 'Redes Wi-Fi Profissionais (Ubiquiti UniFi)' },
                            { icon: <BreakFixIcon />, name: 'Montagem e Manutenção de Hardware' },
                        ]}
                    />
                </div>
            </section>

            {/* Seção 3: A Vantagem LIANET */}
            <section ref={advantageRef} id="advantage" className={`${sectionBaseClasses} text-center ${isAdvantageVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">Por que escolher a LIANET?</h2>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-left">
                     <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg flex items-start gap-4">
                        <div className="flex-shrink-0"><ShieldIcon /></div>
                        <div>
                            <h3 className="font-bold text-xl text-white">Experiência Prática e Confiável</h3>
                            <p className="mt-2 text-gray-300">Com atuação em grandes operações de field service e gestão de redes para provedores, unimos o profissionalismo de grandes projetos com a agilidade de um especialista local.</p>
                        </div>
                    </div>
                     <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg flex items-start gap-4">
                        <div className="flex-shrink-0"><BrainIcon /></div>
                        <div>
                            <h3 className="font-bold text-xl text-white">Soluções Completas em TI e Redes</h3>
                            <p className="mt-2 text-gray-300">De infraestrutura de fibra óptica e redes Wi-Fi UniFi à montagem de PCs e manutenção de servidores, temos o conhecimento para resolver seu desafio.</p>
                        </div>
                    </div>
                     <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg flex items-start gap-4">
                        <div className="flex-shrink-0"><ClockIcon /></div>
                        <div>
                            <h3 className="font-bold text-xl text-white">Atendimento Focado no Cliente</h3>
                            <p className="mt-2 text-gray-300">Seja remotamente ou em uma visita técnica, nosso foco é entender sua necessidade e entregar a solução certa com agilidade e comunicação transparente.</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Seção 4: Como Funciona */}
            <section ref={processRef} id="process" className={`${sectionBaseClasses} ${isProcessVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">Como Funciona</h2>
                </div>
                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center relative">
                    {/* Linha Conectora */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2" style={{ zIndex: -1 }}></div>
                     <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-4 border-white/10">1</div>
                        <h3 className="font-bold text-xl text-white mt-2">Diagnóstico Inicial</h3>
                        <p className="mt-2 text-gray-300">Você entra em contato via WhatsApp ou formulário, explica sua necessidade e agendamos o atendimento.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-4 border-white/10">2</div>
                        <h3 className="font-bold text-xl text-white mt-2">Execução da Solução</h3>
                        <p className="mt-2 text-gray-300">Nossa equipe executa o serviço, seja configurando seu sistema remotamente ou atuando presencialmente no local.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-4 border-white/10">3</div>
                        <h3 className="font-bold text-xl text-white mt-2">Suporte e Validação</h3>
                        <p className="mt-2 text-gray-300">Entregamos a solução, validamos com você e ficamos à disposição para garantir que tudo funcione perfeitamente.</p>
                    </div>
                </div>
            </section>

            {/* Seção 5: CTA Final */}
            <section ref={ctaRef} id="cta" className={`${sectionBaseClasses} ${isCtaVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-primary/90 backdrop-blur-sm border border-white/10 rounded-xl max-w-5xl mx-auto p-12 sm:p-16 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">Pronto para resolver seu problema de TI?</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-200">
                       Seja para uma emergência, um novo projeto ou uma consultoria, estamos a um clique de distância. Entre em contato e vamos encontrar a melhor solução para você.
                    </p>
                     <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button onClick={onScheduleClick} className="w-full sm:w-auto bg-secondary text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg shadow-secondary/20">
                            FAÇA UM ORÇAMENTO
                        </button>
                        <a 
                            href="https://wa.me/555399640159" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto bg-white/10 border border-white/20 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white/20 transition-all transform hover:scale-105 flex items-center justify-center gap-3"
                        >
                            <WhatsappIcon className="h-6 w-6"/>
                            <span>Falar no WhatsApp</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
      );
};

export default HomePage;