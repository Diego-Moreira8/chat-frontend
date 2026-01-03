interface FormInputProps {
  changeHandler: (value: React.SetStateAction<string>) => void;
  value: string;
  required?: boolean;
  type: "text" | "password";
  label: string;
  id: string;
  name: string;
  placeholder?: string;
}

function FormInput({
  changeHandler,
  value,
  required = false,
  type,
  label,
  id,
  name,
  placeholder,
}: FormInputProps) {
  return (
    <div className="my-4 flex flex-col">
      <label className="text-sm" htmlFor={id}>
        {label}:{" "}
        {required ? (
          <span className="text-red-500">*</span>
        ) : (
          <span>(opcional)</span>
        )}
      </label>

      <input
        className="rounded-sm border px-2 py-1"
        onChange={(e) => changeHandler(e.target.value)}
        value={value}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export { FormInput };
