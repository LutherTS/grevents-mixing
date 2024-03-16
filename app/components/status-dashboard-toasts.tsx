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
      {statusDashboard === "APPWIDENAMEUPDATED" && (
        <ToastForm
          action="/reset-user-status-dashboard"
          specifiedClasses="text-black-500 disabled:text-gray-500"
        >
          App-wide name updated
        </ToastForm>
      )}
      {statusDashboard === "EMAILUPDATED" && (
        <ToastForm
          action="/reset-user-status-dashboard"
          specifiedClasses="text-black-500 disabled:text-gray-500"
        >
          Email updated
        </ToastForm>
      )}
    </>
  );
}
