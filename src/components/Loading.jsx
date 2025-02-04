import { Loader2 } from "lucide-react";

const LoadingOverlay = () => (
  <div className="fixed inset-0 backdrop-blur-xs z-50 flex items-center justify-center">
    <div className="bg-gray-400 rounded-lg p-4 flex items-center gap-3">
      <Loader2 className="h-6 w-6 text-white animate-spin" />
      <span className="text-gray-200">Processing...</span>
    </div>
  </div>
);

export default LoadingOverlay;