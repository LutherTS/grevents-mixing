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
