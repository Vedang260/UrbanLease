export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50">
      <div className="relative w-24 h-24 mb-6">
        {/* House outline animation */}
        <div className="absolute w-full h-full border-4 border-accent-DEFAULT rounded-lg animate-pulse"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-8 bg-accent-DEFAULT clip-roof animate-pulse"></div>
        
        {/* Window animations */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-primary-light rounded-sm animate-[pulse_1.5s_infinite]"></div>
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-primary-light rounded-sm animate-[pulse_1.5s_infinite_0.3s]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-6 h-6 bg-primary-light rounded-sm animate-[pulse_1.5s_infinite_0.6s]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-primary-light rounded-sm animate-[pulse_1.5s_infinite_0.9s]"></div>
      </div>
      
      <p className="text-secondary-800 font-serif text-xl animate-pulse">
        Loading your property journey...
      </p>
    </div>
  );
};
