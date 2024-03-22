import { ToastForm } from "./toast-form";

export function StatusPersonalInfoToasts({
  statusPersonalInfo,
}: {
  statusPersonalInfo: string;
}) {
  return (
    <>
      {statusPersonalInfo === "CRITERIAPINNED" && (
        <ToastForm action="/reset-user-status-personal-info">
          Criteria pinned
        </ToastForm>
      )}
      {statusPersonalInfo === "CRITERIAUNPINNED" && (
        <ToastForm action="/reset-user-status-personal-info">
          Criteria unpinned
        </ToastForm>
      )}
    </>
  );
}

export function StatusPersonalInfoCustomizedToasts({
  statusPersonalInfo,
}: {
  statusPersonalInfo: string;
}) {
  return (
    <>
      {statusPersonalInfo === "PSEUDONATIVECRITERIAUPPEDTOIRL" && (
        <ToastForm action="/reset-user-status-personal-info">
          Pseudonative criteria upped to irl
        </ToastForm>
      )}
      {statusPersonalInfo === "PSEUDONATIVECRITERIADOWNEDFROMIRL" && (
        <ToastForm action="/reset-user-status-personal-info">
          Pseudonative criteria downed from irl
        </ToastForm>
      )}
    </>
  );
}
