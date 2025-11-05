import React, { useState, useEffect, useRef } from 'react';
import {
    FieldServiceIcon, NocSupportIcon, BreakFixIcon, SiteSurveyIcon, RolloutIcon,
    ProvisioningIcon, TroubleshootingIcon, ShieldIcon, BrainIcon, ClockIcon, WhatsappIcon
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
                            Domine a Região Sul: <span className="text-secondary">Field Service & Suporte NOC</span> para Operações de Alta Performance.
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto md:mx-0 text-lg text-gray-300">
                            Reduza custos operacionais e garanta o cumprimento de SLAs. Somos a extensão da sua equipe técnica em campo, com expertise em ambientes de alta criticidade.
                        </p>
                         <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                            <button onClick={onScheduleClick} className="bg-secondary text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg shadow-secondary/20">
                                FAÇA UM ORÇAMENTO
                            </button>
                             <a 
                                href="https://wa.me/5553999335369" 
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
                               <p className="text-lg text-gray-400 mb-2">Diagrama de Conexão</p>
                               <p className="text-2xl font-bold text-white mb-6">Empresa de TI/Provedor ↔ LIANET ↔ Cliente Final</p>
                               <p className="text-base text-gray-300">Foco em atendimento Field Service para grandes empresas e ambientes de missão crítica como POPs e geradores.</p>
                           </div>
                       </div>
                    </div>
                </div>
            </section>

            {/* Seção 2: Para Quem Servimos */}
            <section ref={servicesRef} id="services" className={`${sectionBaseClasses} ${isServicesVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
                        Soluções para Operações de TI e Provedores de Internet
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <ServiceCard
                        icon={<FieldServiceIcon />}
                        title="Para Integradoras (Field Service)"
                        text="Atuamos como Smart Hands para sua equipe remota, executando demandas de instalação, movimentação, adição e troca (IMAC) de ativos de TI em ambientes de alta criticidade como agências bancárias, governo e varejo."
                        subServices={[
                            { icon: <BreakFixIcon />, name: 'Break-Fix' },
                            { icon: <SiteSurveyIcon />, name: 'Site Survey' },
                            { icon: <RolloutIcon />, name: 'Rollout de Equipamentos' },
                        ]}
                    />
                    <ServiceCard
                        icon={<NocSupportIcon />}
                        title="Para Provedores de Internet (Suporte NOC)"
                        text="Oferecemos suporte remoto Nível 1 e 2, configurando CPEs, diagnosticando falhas na rede e atuando como um reforço técnico para sua equipe, otimizando seu NOC e permitindo foco em problemas de maior complexidade."
                        subServices={[
                            { icon: <ProvisioningIcon />, name: 'Provisionamento Remoto' },
                            { icon: <TroubleshootingIcon />, name: 'Troubleshooting de Conexão' },
                            { icon: <NocSupportIcon />, name: 'Suporte à Equipe Técnica' },
                        ]}
                    />
                </div>
            </section>

            {/* Seção 3: A Vantagem LIANET */}
            <section ref={advantageRef} id="advantage" className={`${sectionBaseClasses} text-center ${isAdvantageVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">A Confiança que sua Operação Exige.</h2>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-left">
                     <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg flex items-start gap-4">
                        <div className="flex-shrink-0"><ShieldIcon /></div>
                        <div>
                            <h3 className="font-bold text-xl text-white">Experiência em Ambientes Críticos</h3>
                            <p className="mt-2 text-gray-300">Com vivência na reestruturação de TI para agências bancárias, entendemos os protocolos de segurança e a necessidade de execução sem falhas.</p>
                        </div>
                    </div>
                     <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg flex items-start gap-4">
                        <div className="flex-shrink-0"><BrainIcon /></div>
                        <div>
                            <h3 className="font-bold text-xl text-white">Conhecimento Técnico Abrangente</h3>
                            <p className="mt-2 text-gray-300">Expertise em redes, hardware, servidores (Linux/Windows) e sistemas embarcados para atender qualquer demanda, de roteadores Cisco a modems de fibra.</p>
                        </div>
                    </div>
                     <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg flex items-start gap-4">
                        <div className="flex-shrink-0"><ClockIcon /></div>
                        <div>
                            <h3 className="font-bold text-xl text-white">Agilidade e Comunicação Clara</h3>
                            <p className="mt-2 text-gray-300">Atuamos com agilidade para cumprir seus SLAs, com cada passo documentado e reportado em tempo real para total visibilidade da operação.</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Seção 4: Como Funciona */}
            <section ref={processRef} id="process" className={`${sectionBaseClasses} ${isProcessVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">Processo de Ativação Simplificado</h2>
                </div>
                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center relative">
                    {/* Linha Conectora */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2" style={{ zIndex: -1 }}></div>
                     <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-4 border-white/10">1</div>
                        <h3 className="font-bold text-xl text-white mt-2">Contato e Alinhamento</h3>
                        <p className="mt-2 text-gray-300">Agendamos uma chamada para entender suas necessidades, SLAs e protocolos.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-4 border-white/10">2</div>
                        <h3 className="font-bold text-xl text-white mt-2">Cadastro e Onboarding</h3>
                        <p className="mt-2 text-gray-300">Cadastre a LIANET como seu fornecedor local. Integramo-nos às suas ferramentas.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-4 border-white/10">3</div>
                        <h3 className="font-bold text-xl text-white mt-2">Acionamento Sob Demanda</h3>
                        <p className="mt-2 text-gray-300">Abra um chamado via e-mail ou canal combinado. Executamos e enviamos o relatório.</p>
                    </div>
                </div>
            </section>

            {/* Seção 5: CTA Final */}
            <section ref={ctaRef} id="cta" className={`${sectionBaseClasses} ${isCtaVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-primary/90 backdrop-blur-sm border border-white/10 rounded-xl max-w-5xl mx-auto p-12 sm:p-16 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">Pronto para Começar?</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-200">
                       Nosso processo é ágil e direto. Após o primeiro contato, agendamos uma chamada via <span className="font-bold text-white">WhatsApp</span> ou <span className="font-bold text-white">Google Meet</span> para entender suas necessidades e fechar a parceria.
                    </p>
                     <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button onClick={onScheduleClick} className="w-full sm:w-auto bg-secondary text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg shadow-secondary/20">
                            FAÇA UM ORÇAMENTO
                        </button>
                        <a 
                            href="https://wa.me/5553999335369" 
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