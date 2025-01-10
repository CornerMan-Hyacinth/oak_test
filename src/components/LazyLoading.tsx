export const CardLoading = ({ className }: { className: string }) => {
  return (
    <div
      className={`${className} rounded-lg bg-my-gray bg-opacity-50 animate-pulse`}
    />
  );
};

export const SingleLoading = () => {
  return (
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-my-blue border-opacity-75" />
  );
};

export const LoadingModal = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="rounded-md bg-white p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-my-red border-opacity-75" />
      </div>
    </div>
  );
};
