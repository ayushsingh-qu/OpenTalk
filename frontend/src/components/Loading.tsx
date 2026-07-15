import Logo from "./Logo";


const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-(--bg-main) px-6">
      <div className="animate-pulse">
        <Logo />
      </div>

      <div className="mt-8 h-10 w-10 animate-spin rounded-full border-4 border-(--bg-card) border-t-(--primary-color)" />

      <h2 className="mt-6 text-xl font-semibold text-(--text-main)">
        Loading...
      </h2>

      <p className="mt-2 text-center text-(--text-body)">
        Preparing your experience...
      </p>
    </div>
  );
};

export default Loading;