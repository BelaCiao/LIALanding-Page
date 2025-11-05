import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const FallbackErrorScreen: React.FC<{ error: Error | null }> = ({ error }) => {
    const errorMessage = error?.message || "Ocorreu um erro inesperado.";
    const isFetchError = errorMessage.toLowerCase().includes('failed to fetch');
    
    // Custom message for fetch errors, which might be caused by extensions or network issues.
    const displayMessage = isFetchError 
        ? "Não foi possível carregar os recursos da aplicação. Verifique sua conexão com a internet. Se o problema persistir, tente desativar as extensões do navegador (como ad-blockers ou outras) e recarregue a página."
        : `Ocorreu um erro crítico que impediu o carregamento da aplicação. Por favor, tente novamente. Detalhes técnicos: ${errorMessage}`;

    return (
        <div className="fixed inset-0 bg-base-100 flex flex-col items-center justify-center z-50 p-6 text-center" role="alert" aria-live="assertive">
             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-content-100">Ops! Algo deu errado.</h1>
            <p className="mt-2 text-content-200 max-w-md">{displayMessage}</p>
            <button 
                onClick={() => window.location.reload()}
                className="mt-6 bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-all"
            >
                Tentar Novamente
            </button>
        </div>
    );
};


class ErrorBoundary extends Component<Props, State> {
  // FIX: Replaced the constructor with a state class property to properly initialize state. This resolves TypeScript errors where 'state' and 'props' were not recognized on the component instance.
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <FallbackErrorScreen error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;