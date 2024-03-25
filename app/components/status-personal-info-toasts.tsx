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

export function StatusPersonalInfoStandardizedToasts({
  statusPersonalInfo,
}: {
  statusPersonalInfo: string;
}) {
  return (
    <>
      {statusPersonalInfo === "CRITERIAHIDDEN" && (
        <ToastForm action="/reset-user-status-personal-info">
          Criteria hidden
        </ToastForm>
      )}
      {statusPersonalInfo === "CRITERIAREVEALED" && (
        <ToastForm action="/reset-user-status-personal-info">
          Criteria revealed
        </ToastForm>
      )}
      {statusPersonalInfo === "STANDARDIZEDANSWERUPDATED" && (
        <ToastForm action="/reset-user-status-personal-info">
          Answer updated
        </ToastForm>
      )}
      {statusPersonalInfo === "STANDARDIZEDANSWERDELETED" && (
        <ToastForm action="/reset-user-status-personal-info">
          Answer deleted
        </ToastForm>
      )}
      {statusPersonalInfo === "NATIVECRITERIANOTIRLADDED" && (
        <ToastForm action="/reset-user-status-personal-info">
          Native criteria added
        </ToastForm>
      )}
      {statusPersonalInfo === "NATIVECRITERIAIRLADDED" && (
        <ToastForm action="/reset-user-status-personal-info">
          Native irl criteria added
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
      {statusPersonalInfo === "CUSTOMIZEDANSWERUPDATED" && (
        <ToastForm action="/reset-user-status-personal-info">
          Answer updated
        </ToastForm>
      )}
      {statusPersonalInfo === "CUSTOMIZEDANSWERDELETED" && (
        <ToastForm action="/reset-user-status-personal-info">
          Answer deleted
        </ToastForm>
      )}
      {statusPersonalInfo === "PSEUDONATIVECRITERIANOTIRLADDED" && (
        <ToastForm action="/reset-user-status-personal-info">
          Pseudonative criteria added
        </ToastForm>
      )}
      {statusPersonalInfo === "PSEUDONATIVECRITERIAIRLADDED" && (
        <ToastForm action="/reset-user-status-personal-info">
          Pseudonative irl criteria added
        </ToastForm>
      )}
    </>
  );
}

export function StatusPersonalInfoCustomizedUserCriteriaToasts({
  statusPersonalInfo,
}: {
  statusPersonalInfo: string;
}) {
  return (
    <>
      {statusPersonalInfo === "USERQUESTIONFRIENDSHARED" && (
        <ToastForm action="/reset-user-status-personal-info">
          Criteria shared to friend
        </ToastForm>
      )}
      {statusPersonalInfo === "USERQUESTIONFRIENDUNSHARED" && (
        <ToastForm action="/reset-user-status-personal-info">
          Criteria unshared from friend
        </ToastForm>
      )}
    </>
  );
}
