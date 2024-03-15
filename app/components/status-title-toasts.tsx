import { ToastForm } from "./toast-form";

export function StatusTitleToasts({ statusTitle }: { statusTitle: string }) {
  return (
    <>
      {statusTitle === "WELCOMETOGREVENTS" && (
        <ToastForm
          action="/reset-user-status-title"
          specifiedClasses="text-yellow-500 disabled:text-gray-500"
        >
          Welcome to Grevents
        </ToastForm>
      )}
      {statusTitle === "WELCOMEBACKTOGREVENTS" && (
        <ToastForm
          action="/reset-user-status-title"
          specifiedClasses="text-yellow-500 disabled:text-gray-500"
        >
          Welcome back to Grevents
        </ToastForm>
      )}
    </>
  );
}
