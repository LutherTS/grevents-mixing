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
          specifiedClasses="text-black-500 disabled:!text-gray-500"
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
      {statusDashboard === "PASSWORDUPDATED" && (
        <ToastForm action="/reset-user-status-dashboard">
          Password updated
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
      {statusDashboard === "CRITERIAPINNEDFORSELF" && (
        <ToastForm action="/reset-user-status-dashboard">
          Criteria pinned for self
        </ToastForm>
      )}
      {statusDashboard === "CRITERIAUNPINNEDFORSELF" && (
        <ToastForm action="/reset-user-status-dashboard">
          Criteria unpinned for self
        </ToastForm>
      )}
      {statusDashboard === "CRITERIAREPINNEDFORSELF" && (
        <ToastForm action="/reset-user-status-dashboard">
          Criteria repinned for self
        </ToastForm>
      )}
      {statusDashboard === "FRIENDPINNED" && (
        <ToastForm action="/reset-user-status-dashboard">
          Friend pinned to dashboard
        </ToastForm>
      )}
      {statusDashboard === "FRIENDUNPINNED" && (
        <ToastForm action="/reset-user-status-dashboard">
          Friend unpinned from dashboard
        </ToastForm>
      )}
      {statusDashboard === "USERQUESTIONFRIENDREPINNED" && (
        <ToastForm action="/reset-user-status-dashboard">
          Friend criteria repinned by you
        </ToastForm>
      )}
      {statusDashboard === "USERQUESTIONFRIENDUNPINNED" && (
        <ToastForm action="/reset-user-status-dashboard">
          Friend criteria unpinned by you
        </ToastForm>
      )}
    </>
  );
}
