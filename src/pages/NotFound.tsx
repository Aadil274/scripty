import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-6xl gradient-text mb-4">404</h1>
        <p className="text-muted-foreground mb-8">This scene doesn't exist in our script.</p>
        <Link
          to="/"
          className="gradient-button inline-flex items-center gap-2 px-6 py-3 rounded-xl"
        >
          <Home className="w-4 h-4" />
          Back to Scriptoria
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
