import React, { useState, useEffect } from 'react';
import { BackArrowIcon, ChevronRightIcon, SuccessIcon, WhatsappIcon, GoogleMeetIcon } from './icons';
import ParticleBackground from './ParticleBackground';

interface QuizFunnelProps {
    onClose: () => void;
}

// Definição da estrutura do Quiz
const initialStep = {
    id: 1,
    theme: 'dark',
    key: 'serviceInterest',
    question: 'Como podemos impulsionar seu negócio hoje?',
    subtitle: 'Escolha a opção que melhor descreve sua necessidade.',
    options: [
        { text: 'Resolver problemas técnicos com um especialista em campo (Field Service).', path: 'fieldService' as const },
        { text: 'Garantir suporte técnico ágil e remoto para minha operação (NOC/TI).', path: 'nocSupport' as const },
        { text: 'Criar ou modernizar meu site para atrair mais clientes (Web Design).', path: 'webDesign' as const },
        { text: 'Terceirizar minhas operações com um parceiro local estratégico no Sul-RS.', path: 'outsourcing' as const },
    ],
};

const quizPaths = {
    fieldService: [
        { id: 2, key: 'environment', question: 'Em que tipo de ambiente você precisa do nosso técnico?', options: ['Ambiente corporativo (escritórios, lojas)', 'Data Center ou POP de provedor', 'Residencial (atendendo seu cliente final)', 'Ambiente industrial ou externo'] },
        { id: 3, key: 'frequency', question: 'Qual a frequência ou urgência dessa demanda?', options: ['É um projeto pontual com data para começar', 'Preciso de um técnico de forma recorrente (contrato)', 'É uma emergência (Break-Fix) para agora!', 'Estou apenas cotando para futuras necessidades'] },
        { id: 4, key: 'serviceType', question: 'Qual o tipo de serviço mais comum que você precisa?', options: ['Instalação e configuração de equipamentos (IMAC)', 'Manutenção e reparo de hardware', 'Passagem de cabos e infraestrutura de rede', 'Site Survey (análise de local)'] },
        { id: 5, key: 'sla', question: 'Você trabalha com SLAs (Acordos de Nível de Serviço) definidos?', options: ['Sim, temos SLAs rígidos com nossos clientes', 'Temos alguma flexibilidade nos prazos', 'Não, o foco é apenas resolver o problema', 'Ainda não trabalhamos com SLAs'] },
    ],
    nocSupport: [
        { id: 2, key: 'focus', question: 'Qual será o foco principal do suporte remoto?', options: ['Atender e resolver problemas dos meus clientes finais', 'Monitorar minha infraestrutura de rede (servidores, switches)', 'Dar suporte para minha equipe técnica interna', 'Configurar equipamentos remotamente (CPEs, roteadores)'] },
        { id: 3, key: 'hours', question: 'Em qual horário você mais precisa de suporte?', options: ['Apenas em horário comercial (8h-18h)', 'Estendido (manhã, tarde e noite)', '24/7, incluindo finais de semana e feriados', 'Sob demanda, para picos de trabalho'] },
        { id: 4, key: 'teamSize', question: 'Como é sua equipe de NOC/TI hoje?', options: ['Sou eu ou uma equipe muito pequena', 'Temos uma equipe, mas está sobrecarregada', 'Não temos uma equipe dedicada para isso', 'Temos uma equipe, mas buscamos especialização'] },
        { id: 5, key: 'goal', question: 'O que você mais espera alcançar com nosso suporte?', options: ['Reduzir o tempo de espera no atendimento', 'Aumentar a satisfação dos meus clientes', 'Liberar minha equipe para focar em tarefas estratégicas', 'Prevenir problemas com monitoramento proativo'] },
    ],
    webDesign: [
        { id: 2, key: 'stage', question: 'Sobre seu projeto de site, em que estágio você está?', options: ['Estou começando do zero, não tenho nada', 'Já tenho um site, mas quero um totalmente novo', 'Quero apenas fazer melhorias e atualizações no meu site atual', 'Preciso de manutenção contínua e suporte'] },
        { id: 3, key: 'feature', question: 'Qual funcionalidade é mais importante para seu novo site?', options: ['Ser visualmente incrível e profissional', 'Formulários de contato fáceis para gerar leads', 'Vender produtos online (E-commerce)', 'Blog para postar conteúdo e atrair visitantes'] },
        { id: 4, key: 'content', question: 'Você já tem o conteúdo (textos, fotos) para o site?', options: ['Sim, tenho tudo pronto para começar', 'Tenho alguma coisa, mas vou precisar de ajuda', 'Não, preciso de ajuda para criar todo o conteúdo', 'Vou providenciar o conteúdo em breve'] },
        { id: 5, key: 'timeline', question: 'Qual o seu prazo ideal para ter o site no ar?', options: ['O mais rápido possível (menos de 30 dias)', 'Dentro de 1 a 3 meses', 'Não tenho pressa, estou planejando com calma', 'Depende do orçamento'] },
    ],
    outsourcing: [
        { id: 2, key: 'reason', question: 'Qual o principal motivo para buscar uma parceria de terceirização?', options: ['Expandir minha operação para o Sul do RS sem custo fixo', 'Reduzir custos com equipe e encargos trabalhistas', 'Garantir um parceiro técnico confiável para meus SLAs', 'Focar no meu negócio principal e deixar o TI com especialistas'] },
        { id: 3, key: 'partnershipType', question: 'Que tipo de parceria você imagina?', options: ['White label: A LIANET atua em nome da minha empresa', 'Indicação: A LIANET é apresentada como parceira técnica', 'Atuação sob demanda: aciono conforme a necessidade', 'Contrato fixo para cobertura total na região'] },
        { id: 4, key: 'volume', question: 'Qual o volume de chamados que você estima para a região?', options: ['Alto (mais de 10 chamados/mês)', 'Médio (entre 3 e 10 chamados/mês)', 'Baixo (até 3 chamados/mês)', 'Variável, depende de novos contratos'] },
        { id: 5, key: 'criticalFactor', question: 'O que é mais crítico na escolha de um parceiro local?', options: ['Qualidade técnica e conhecimento comprovado', 'Agilidade no atendimento e cumprimento de prazos', 'Comunicação clara e relatórios detalhados', 'Preço competitivo'] },
    ]
};

type QuizPath = keyof typeof quizPaths;

const TOTAL_STEPS = 1 + 4 + 1; // 1 initial, 4 path questions, 1 form

const QuizFunnel: React.FC<QuizFunnelProps> = ({ onClose }) => {
    const [screen, setScreen] = useState<'quiz' | 'loading' | 'form' | 'success'>('quiz');
    const [currentPath, setCurrentPath] = useState<QuizPath | null>(null);
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({ name: '', whatsapp: '', company: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (screen === 'loading') {
            let loadingProgress = ((1 + 4) / TOTAL_STEPS) * 100;
            setProgress(loadingProgress);
            const interval = setInterval(() => {
                loadingProgress += 5;
                if (loadingProgress >= 99) {
                    clearInterval(interval);
                    setProgress(100);
                    setTimeout(() => {
                        setScreen('form');
                    }, 500);
                } else {
                    setProgress(loadingProgress);
                }
            }, 150);
            return () => clearInterval(interval);
        } else {
            const currentStep = currentPath ? 1 + stepIndex : 0;
            const targetProgress = (currentStep / TOTAL_STEPS) * 100;
            setProgress(targetProgress);
        }
    }, [screen, currentPath, stepIndex]);

    const handleSelectOption = (key: string, option: string, path?: QuizPath) => {
        setAnswers(prev => ({ ...prev, [key]: option }));
        setTimeout(() => {
            if (path) {
                setCurrentPath(path);
                setStepIndex(0);
            } else if (currentPath) {
                if (stepIndex < quizPaths[currentPath].length - 1) {
                    setStepIndex(prev => prev + 1);
                } else {
                    setScreen('loading');
                }
            }
        }, 300);
    };

    const handleBack = () => {
        if (currentPath && stepIndex > 0) {
            setStepIndex(prev => prev - 1);
        } else {
            setCurrentPath(null);
            setStepIndex(0);
        }
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);
        
        const formPayload = {
            _subject: "Novo Lead Qualificado (Quiz) - LIANET Soluções",
            Nome: formData.name,
            Whatsapp: formData.whatsapp,
            Email: formData.email,
            Empresa: formData.company,
            "Interesse Principal": answers[initialStep.key],
            ...(currentPath && Object.fromEntries(
                quizPaths[currentPath].map(q => [`Q: ${q.question}`, answers[q.key] || 'Não respondido'])
            ))
        };

        try {
            const response = await fetch('https://formsubmit.co/ajax/maicongn@hotmail.com', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formPayload),
            });
            
            if (!response.ok) {
                 const data = await response.json();
                 throw new Error(data.message || 'Ocorreu um erro ao enviar seus dados.');
            }

            setMessage({ type: 'success', text: 'Dados recebidos!' });
            setScreen('success');

        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderQuiz = () => {
        const currentQuestion = !currentPath
            ? initialStep
            : quizPaths[currentPath][stepIndex];
        
        const options = 'options' in currentQuestion ? currentQuestion.options : [];

        return (
            <div key={currentQuestion.id} className="w-full max-w-2xl px-6 text-center animate-fade-in-up">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">{currentQuestion.question}</h1>
                {'subtitle' in currentQuestion && <p className="mt-3 text-lg text-gray-300">{currentQuestion.subtitle}</p>}
                <div className="mt-10 grid grid-cols-1 gap-3">
                    {options.map((option, index) => {
                        const optionText = typeof option === 'string' ? option : option.text;
                        const path = typeof option === 'object' ? option.path : undefined;
                        return (
                            <button
                                key={index}
                                onClick={() => handleSelectOption(currentQuestion.key, optionText, path)}
                                className="w-full text-left p-4 rounded-lg text-lg font-medium transition-all duration-200 transform hover:scale-105 bg-gray-800/50 hover:bg-gray-700/80 text-white flex justify-between items-center backdrop-blur-sm"
                            >
                                {optionText}
                                <ChevronRightIcon />
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    const renderStepContent = () => {
        switch (screen) {
            case 'quiz':
                return renderQuiz();
            case 'loading':
                return (
                    <div className="w-full max-w-lg px-6 text-center animate-fade-in text-white">
                        <h2 className="text-3xl font-bold">Analisando suas respostas...</h2>
                        <p className="mt-2 text-gray-300">Estamos preparando para te conectar com um especialista.</p>
                        <div className="mt-6 w-full bg-white/20 rounded-full h-2.5">
                            <div className="bg-white h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="mt-3 text-lg font-semibold">{Math.round(progress)}%</p>
                    </div>
                );
            case 'form':
                return (
                    <div className="w-full max-w-md bg-base-100 p-8 rounded-xl shadow-2xl animate-fade-in-up mx-4">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-content-100">Estamos quase lá!</h1>
                            <p className="mt-2 text-content-200">Preencha seus dados para que nosso especialista entre em contato.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div className="relative">
                                <label className="absolute -top-2 left-2 inline-block bg-base-100 px-1 text-xs font-medium text-content-200">Qual seu nome?</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-transparent rounded-lg border-2 border-base-300 focus:ring-1 focus:ring-primary focus:outline-none focus:border-primary transition" placeholder="Digite seu nome..." />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-2 inline-block bg-base-100 px-1 text-xs font-medium text-content-200">Qual seu Whatsapp?</label>
                                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required className="w-full px-4 py-3 bg-transparent rounded-lg border-2 border-base-300 focus:ring-1 focus:ring-primary focus:outline-none focus:border-primary transition" placeholder="(XX) XXXXX-XXXX" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-2 inline-block bg-base-100 px-1 text-xs font-medium text-content-200">Nome da sua Empresa</label>
                                <input type="text" name="company" value={formData.company} onChange={handleInputChange} required className="w-full px-4 py-3 bg-transparent rounded-lg border-2 border-base-300 focus:ring-1 focus:ring-primary focus:outline-none focus:border-primary transition" placeholder="Digite o nome da empresa..." />
                            </div>
                             <div className="relative">
                                <label className="absolute -top-2 left-2 inline-block bg-base-100 px-1 text-xs font-medium text-content-200">Seu E-mail Profissional</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-transparent rounded-lg border-2 border-base-300 focus:ring-1 focus:ring-primary focus:outline-none focus:border-primary transition" placeholder="Digite seu e-mail" />
                            </div>
                            
                            <div className="pt-2 space-y-4">
                                <button type="submit" disabled={isSubmitting} className="w-full bg-secondary text-white px-6 py-3.5 rounded-lg text-lg font-bold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg shadow-green-500/20 disabled:bg-green-400 disabled:cursor-not-allowed disabled:scale-100">
                                    {isSubmitting ? 'ENVIANDO...' : 'SOLICITAR ORÇAMENTO'}
                                </button>
                                <a 
                                    href="https://wa.me/5553999335369?text=Ol%C3%A1!%20Respondi%20o%20quiz%20da%20LIANET%20e%20gostaria%20de%20conversar."
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-50 transition-all transform hover:scale-105"
                                >
                                    <WhatsappIcon className="h-6 w-6"/>
                                    <span>Prefiro chamar no WhatsApp</span>
                                </a>
                            </div>
                            {message && message.type === 'error' && <p className="text-red-500 text-sm text-center mt-2">{message.text}</p>}
                        </form>
                    </div>
                );
            case 'success':
                return (
                     <div className="w-full max-w-lg px-6 text-center animate-fade-in-up flex flex-col items-center">
                        <SuccessIcon />
                        <h1 className="mt-8 text-4xl font-bold text-white">Deu tudo certo!</h1>
                        <p className="mt-4 text-lg text-gray-300 max-w-md">
                            Recebemos suas informações. Nossa equipe entrará em contato pelo WhatsApp para agendarmos uma conversa ou uma chamada de vídeo no Google Meet.
                        </p>
                         <div className="mt-6 flex items-center justify-center gap-4 text-gray-400">
                            <WhatsappIcon className="h-8 w-8" />
                            <span className="text-xl">+</span>
                            <GoogleMeetIcon className="h-8 w-8" />
                        </div>
                        <button onClick={onClose} className="mt-10 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all">
                            Fechar
                        </button>
                    </div>
                );
        }
        return null;
    };

    const isBgDark = screen !== 'form';

    return (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-colors duration-500 ${isBgDark ? 'bg-brand-dark' : 'bg-base-200'} overflow-hidden`}>
            {isBgDark ? (
                <ParticleBackground particleColor="rgba(255, 255, 255, 0.2)" lineColor="rgba(255, 255, 255, 0.1)" />
            ) : (
                <ParticleBackground particleColor="rgba(0, 0, 0, 0.2)" lineColor="rgba(0, 0, 0, 0.1)" />
            )}
            
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                 <div className="w-full absolute top-0 left-0 p-4 max-w-5xl mx-auto">
                    <div className="w-full bg-gray-500/30 rounded-full h-1.5">
                        <div className="bg-white h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    {screen === 'quiz' && (currentPath !== null) && (
                        <button onClick={handleBack} className={`absolute top-8 left-6 p-2 rounded-full transition-colors ${isBgDark ? 'text-white hover:bg-white/10' : 'text-content-100 hover:bg-black/10'}`} aria-label="Voltar">
                            <BackArrowIcon />
                        </button>
                    )}
                     <button onClick={onClose} className={`absolute top-8 right-6 p-2 rounded-full transition-colors text-2xl font-bold ${isBgDark ? 'text-white hover:bg-white/10' : 'text-content-100 hover:bg-black/10'}`} aria-label="Fechar">
                        &times;
                    </button>
                </div>
                
                <div className="flex-grow flex items-center justify-center w-full">
                    {renderStepContent()}
                </div>

                <div className={`absolute bottom-4 text-xs ${isBgDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    &copy; {new Date().getFullYear()} LIANET Soluções.
                </div>
            </div>
        </div>
    );
};

export default QuizFunnel;