import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

function ErrorState({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div className="flex min-h-[250px] items-center justify-center">
      <div className="max-w-md text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-destructive" />

        <h3 className="mt-4 text-lg font-semibold">
          Something went wrong
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          {message}
        </p>

        {onRetry && (
          <Button
            className="mt-4"
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}

export default ErrorState;