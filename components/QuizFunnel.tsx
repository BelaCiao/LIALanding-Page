import React, { useState, useEffect } from 'react';
import { BackArrowIcon, ChevronRightIcon, SuccessIcon } from './icons';
import ParticleBackground from './ParticleBackground';

interface QuizFunnelProps {
    onClose: () => void;
}

const quizSteps = [
    {
        id: 1,
        theme: 'dark',
        key: 'bottleneck',
        question: 'Qual destas opções está sendo o maior gargalo na sua clínica?',
        subtitle: 'Selecione uma opção para personalizar a demonstração',
        options: [
            'Não consigo gerar demanda',
            'Leads não respondem',
            'Baixo volume de agendamentos',
            'Poucos comparecimentos',
            'Outros',
        ],
    },
    {
        id: 2,
        theme: 'dark',
        key: 'leadsPerDay',
        question: 'Quantos novos Leads você recebe por dia no Whatsapp?',
        subtitle: 'Selecione uma opção',
        options: [
            'Menos de 10 por Dia',
            'Entre 11 e 20 por Dia',
            'Entre 21 e 30 por Dia',
            'Entre 31 e 50 por Dia',
            'Acima de 50 por Dia',
        ],
    },
    {
        id: 3,
        theme: 'dark',
        key: 'secretaries',
        question: 'Quantas Secretárias?',
        options: ['Apenas 1', '2', '3', '4', '5 ou mais'],
    },
];

const TOTAL_STEPS = quizSteps.length + 2; // Questions + Loading + Form

const QuizFunnel: React.FC<QuizFunnelProps> = ({ onClose }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({ name: '', whatsapp: '', instagram: '', email: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [progress, setProgress] = useState(0);
    
    const isDarkTheme = step < 2 || step >= quizSteps.length;

    useEffect(() => {
        // Handle loading simulation
        if (step === quizSteps.length) {
            setIsLoading(true);
            let loadingProgress = (quizSteps.length / TOTAL_STEPS) * 100;
            setProgress(loadingProgress);
            const interval = setInterval(() => {
                loadingProgress += 5;
                if (loadingProgress >= 99) {
                    clearInterval(interval);
                    setProgress(100);
                    setTimeout(() => {
                        setIsLoading(false);
                        setStep(step + 1);
                    }, 500);
                } else {
                    setProgress(loadingProgress);
                }
            }, 150);
            return () => clearInterval(interval);
        }
        setProgress(((step) / TOTAL_STEPS) * 100);
    }, [step]);


    const handleSelectOption = (key: string, option: string) => {
        setAnswers(prev => ({ ...prev, [key]: option }));
        setTimeout(() => setStep(prev => prev + 1), 300);
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(prev => prev - 1);
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
            _subject: "Você tem um novo LEAD! - LIA IA CRM",
            _sms: "+5553999335369",
            _smsMessage: `Você tem um novo LEAD! Nome: ${formData.name}, WhatsApp: ${formData.whatsapp}.`,
            Nome: formData.name,
            Whatsapp: formData.whatsapp,
            Email: formData.email,
            Instagram: formData.instagram,
            ...Object.fromEntries(
                Object.entries(answers).map(([key, value]) => [`Resposta Quiz (${key})`, value])
            )
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
            setStep(step + 1); // Go to success screen

        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepContent = () => {
        if (step < quizSteps.length) {
            const currentQuestion = quizSteps[step];
            return (
                <div key={currentQuestion.id} className="w-full max-w-2xl px-6 text-center animate-fade-in-up">
                    <h1 className={`text-3xl sm:text-4xl font-bold ${currentQuestion.theme === 'dark' ? 'text-white' : 'text-content-100'}`}>{currentQuestion.question}</h1>
                    {currentQuestion.subtitle && <p className={`mt-3 text-lg ${currentQuestion.theme === 'dark' ? 'text-gray-300' : 'text-content-200'}`}>{currentQuestion.subtitle}</p>}
                    <div className="mt-10 grid grid-cols-1 gap-3">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectOption(currentQuestion.key, option)}
                                className={`w-full text-left p-4 rounded-lg text-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                                    currentQuestion.theme === 'dark'
                                    ? 'bg-gray-800/50 hover:bg-gray-700/80 text-white flex justify-between items-center backdrop-blur-sm'
                                    : 'bg-base-100 hover:bg-base-300 border border-base-300 text-content-100'
                                }`}
                            >
                                {option}
                                {currentQuestion.theme === 'dark' && <ChevronRightIcon />}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        if (isLoading) {
             return (
                <div className="w-full max-w-lg px-6 text-center animate-fade-in text-white">
                    <h2 className="text-3xl font-bold">Analisando suas respostas...</h2>
                    <p className="mt-2 text-gray-300">Estamos preparando uma demonstração personalizada para você.</p>
                    <div className="mt-6 w-full bg-white/20 rounded-full h-2.5">
                        <div className="bg-white h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="mt-3 text-lg font-semibold">{Math.round(progress)}%</p>
                </div>
            );
        }
        
        if (step === quizSteps.length + 1) { // Form step
            return (
                <div className="w-full max-w-md bg-base-100 p-8 rounded-xl shadow-2xl animate-fade-in-up mx-4">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-content-100">Demonstração Pronta!</h1>
                        <p className="mt-2 text-content-200">Preencha seus dados para receber uma demonstração com o especialista.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div className="relative">
                            <label className="absolute -top-2 left-2 inline-block bg-base-100 px-1 text-xs font-medium text-content-200">Qual seu nome?</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-transparent rounded-lg border-2 border-base-300 focus:ring-1 focus:ring-primary focus:outline-none focus:border-primary transition" placeholder="Digite seu nome..." />
                        </div>
                        <div className="relative">
                            <label className="absolute -top-2 left-2 inline-block bg-base-100 px-1 text-xs font-medium text-content-200">Qual seu Whatsapp?</label>
                            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required className="w-full px-4 py-3 bg-transparent rounded-lg border-2 border-base-300 focus:ring-1 focus:ring-primary focus:outline-none focus:border-primary transition" placeholder="Digite seu whatsapp..." />
                        </div>
                        <div className="relative">
                            <label className="absolute -top-2 left-2 inline-block bg-base-100 px-1 text-xs font-medium text-content-200">@ do Instagram da sua Clínica</label>
                            <input type="text" name="instagram" value={formData.instagram} onChange={handleInputChange} required className="w-full px-4 py-3 bg-transparent rounded-lg border-2 border-base-300 focus:ring-1 focus:ring-primary focus:outline-none focus:border-primary transition" placeholder="Digite seu instagram..." />
                        </div>
                         <div className="relative">
                            <label className="absolute -top-2 left-2 inline-block bg-base-100 px-1 text-xs font-medium text-content-200">Seu E-mail Profissional</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-transparent rounded-lg border-2 border-base-300 focus:ring-1 focus:ring-primary focus:outline-none focus:border-primary transition" placeholder="Digite seu e-mail" />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-brand-dark text-white px-6 py-3.5 rounded-lg text-lg font-bold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg shadow-gray-500/20 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100">
                            {isSubmitting ? 'ENVIANDO...' : 'QUERO VER UMA DEMONSTRAÇÃO'}
                        </button>
                        {message && message.type === 'error' && <p className="text-red-500 text-sm text-center">{message.text}</p>}
                    </form>
                </div>
            )
        }
        
        if (step === quizSteps.length + 2) { // Success step
            return (
                 <div className="w-full max-w-lg px-6 text-center animate-fade-in-up flex flex-col items-center">
                    <SuccessIcon />
                    <h1 className="mt-8 text-4xl font-bold text-white">Deu tudo certo!</h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-md">
                        Em até 12 horas nossa equipe vai te ligar e agendar uma demonstração com um de nossos especialistas.
                    </p>
                    <button onClick={onClose} className="mt-10 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all">
                        Fechar
                    </button>
                </div>
            )
        }
        
        return null;
    };

    const isCurrentStepDark = () => {
        if (step < quizSteps.length) {
            return quizSteps[step].theme === 'dark';
        }
        // Form step is light, success is dark
        return step === quizSteps.length || step === quizSteps.length + 2;
    };

    const isBgDark = isCurrentStepDark();

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
                    {step > 0 && step <= quizSteps.length && !isLoading && (
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
                    &copy; {new Date().getFullYear()} LIA IA CRM.
                </div>
            </div>
        </div>
    );
};

export default QuizFunnel;