export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="border-l-2 border-gray-600 px-4">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-orange-400 font-bold border-l-2 border-orange-400 px-4">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="border-l-2 px-4 border-gray-600">{message.message}</div>
      )}
    </div>
  );
}
