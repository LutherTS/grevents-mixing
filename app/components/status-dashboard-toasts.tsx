import { ToastForm } from "./toast-form";

export function StatusDashboardToasts({
  statusDashboard,
}: {
  statusDashboard: string;
}) {
  return (
    <>
      {statusDashboard === "REDIRECTEDTODASHBOARD" && (
        <ToastForm
          action="/reset-user-status-dashboard"
          specifiedClasses="text-black-500 disabled:text-gray-500"
        >
          You've been redirected to your dashboard.
        </ToastForm>
      )}
    </>
  );
}
