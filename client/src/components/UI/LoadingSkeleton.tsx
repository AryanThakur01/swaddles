const LoadingSkeleton = () => {
  return (
    <div className="shadow-md rounded-md p-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md self-center bg-secondary_white h-20 w-20"></div>
        <div className="flex-1 space-y-6 py-1 self-center">
          <div className="h-7 bg-tertiary_white rounded-full"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-secondary_white rounded col-span-2"></div>
              <div className="h-2 bg-secondary_white rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-secondary_white rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
