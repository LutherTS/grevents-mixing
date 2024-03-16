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
          You&apos;ve been redirected to your dashboard.
        </ToastForm>
      )}
      {statusDashboard === "APPWIDENAMEUPDATED" && (
        <ToastForm action="/reset-user-status-dashboard">
          App-wide name updated
        </ToastForm>
      )}
      {statusDashboard === "EMAILUPDATED" && (
        <ToastForm action="/reset-user-status-dashboard">
          Email updated
        </ToastForm>
      )}
      {statusDashboard === "FRIENDCODEUPDATED" && (
        <ToastForm action="/reset-user-status-dashboard">
          Friend code updated
        </ToastForm>
      )}
      {statusDashboard === "NOWDEACTIVATED" && (
        <ToastForm action="/reset-user-status-dashboard">
          You&apos;ve deactivated your profile
        </ToastForm>
      )}
      {statusDashboard === "NOWREACTIVATED" && (
        <ToastForm action="/reset-user-status-dashboard">
          You&apos;ve reactivated your profile
        </ToastForm>
      )}
    </>
  );
}
