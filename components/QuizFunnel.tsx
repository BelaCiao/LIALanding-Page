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
    key: 'serviceType',
    question: 'Qual tipo de solução de TI você precisa hoje?',
    subtitle: 'Escolha a opção que melhor descreve sua necessidade para começarmos.',
    options: [
        { text: 'Suporte Rápido e Remoto (para software, redes e sistemas).', path: 'remoteSupport' as const },
        { text: 'Atendimento Presencial (para cabos, Wi-Fi, instalação e reparo).', path: 'onSiteService' as const },
        { text: 'Montagem ou Reparo de Computadores (PCs Gamer, notebooks).', path: 'hardware' as const },
        { text: 'Sou um Provedor de Internet e preciso de suporte especializado.', path: 'ispNoc' as const },
    ],
};

const quizPaths = {
    remoteSupport: [
        { id: 2, key: 'userType', question: 'Este suporte é para qual finalidade?', options: ['Para minha empresa ou negócio', 'Para meu uso pessoal (residencial)'] },
        { id: 3, key: 'problemType', question: 'Qual o principal desafio que você enfrenta?', options: ['Computador lento ou com vírus', 'Problemas de conexão com a internet/rede', 'Ajuda com um software ou sistema específico', 'Preciso de uma consultoria geral de TI'] },
    ],
    onSiteService: [
        { id: 2, key: 'serviceType', question: 'Qual serviço presencial você precisa?', options: ['Instalação de rede de cabos ou fibra', 'Melhoria da cobertura e velocidade do Wi-Fi', 'Instalação de equipamentos (impressora, totem, etc)', 'Reparo físico em um computador ou servidor'] },
        { id: 3, key: 'locationType', question: 'Onde será o atendimento?', options: ['Em um escritório ou loja comercial', 'Em minha residência', 'Em um condomínio (áreas comuns ou apartamentos)', 'Em um ambiente industrial ou Data Center'] },
    ],
    hardware: [
        { id: 2, key: 'hardwareService', question: 'Qual serviço de hardware você busca?', options: ['Montar um PC novo (Gamer ou para Trabalho)', 'Fazer um upgrade no meu PC atual', 'Consertar meu notebook ou desktop que não liga', 'Receber uma consultoria para escolher as melhores peças'] },
        { id: 3, key: 'partsStatus', question: 'Você já possui as peças?', options: ['Sim, só preciso do serviço de montagem/instalação', 'Não, preciso de ajuda para escolher e comprar', 'É para um conserto, não sei qual é o problema/peça'] },
    ],
    ispNoc: [
        { id: 2, key: 'nocNeed', question: 'Qual sua maior necessidade como provedor?', options: ['Suporte NOC remoto (N1/N2) para minha equipe', 'Configuração de ativos de rede (OLT, MikroTik, etc)', 'Um técnico de campo (Field Service) para atuar na região', 'Planejamento e otimização da minha rede'] },
        { id: 3, key: 'supportModel', question: 'Qual modelo de suporte se encaixa melhor?', options: ['Contínuo durante o horário comercial (8h-14h)', 'Sob demanda, para projetos ou picos de trabalho', 'Apenas para emergências e chamados pontuais', 'Busco uma parceria estratégica de longo prazo'] },
    ]
};


type QuizPath = keyof typeof quizPaths;

const TOTAL_STEPS = 1 + 2 + 1; // 1 initial, 2 path questions, 1 form

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
            let loadingProgress = ((1 + 2) / TOTAL_STEPS) * 100;
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
            _subject: "Novo Lead LIANET",
            _captcha: "false",
            Nome: formData.name,
            Whatsapp: formData.whatsapp,
            Email: formData.email,
            Empresa: formData.company,
            [initialStep.question]: answers[initialStep.key],
            ...(currentPath && Object.fromEntries(
                quizPaths[currentPath].map(q => [q.question, answers[q.key] || 'Não respondido'])
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
                 console.error("Form submission failed:", data);
                 throw new Error(data.message || 'Ocorreu um erro ao enviar seus dados.');
            }

            setMessage({ type: 'success', text: 'Dados recebidos!' });
            setScreen('success');

        } catch (error: any) {
            console.error("An error occurred during form submission:", error);
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
                                <label className="absolute -top-2 left-2 inline-block bg-base-100 px-1 text-xs font-medium text-content-200">Nome da sua Empresa (Opcional)</label>
                                <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 bg-transparent rounded-lg border-2 border-base-300 focus:ring-1 focus:ring-primary focus:outline-none focus:border-primary transition" placeholder="Digite o nome da empresa..." />
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
                                    href="https://wa.me/555399640159?text=Ol%C3%A1!%20Respondi%20o%20quiz%20da%20LIANET%20e%20gostaria%20de%20conversar."
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