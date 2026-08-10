function LoadingState({ message = "Loading..." }) {
  return (
    <div className="flex min-h-[250px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-foreground" />

        <p className="mt-3 text-sm text-muted-foreground">
          {message}
        </p>
      </div>
    </div>
  );
}

export default LoadingState;