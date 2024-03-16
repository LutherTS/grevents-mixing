export function SignInput({
  id,
  name,
  placeholder,
  specifiedType,
}: {
  id: string;
  name: string;
  placeholder: string;
  specifiedType?: string;
}) {
  return (
    <>
      <input
        className="mt-2 w-[32ch] max-w-[40ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white sm:w-[40ch]"
        type={specifiedType ? specifiedType : "text"}
        id={id}
        name={name}
        placeholder={placeholder}
      />
    </>
  );
}
