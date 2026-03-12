type Props = {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function FormField({
  label,
  required,
  children,
  className,
}: Props) {
  return (
    <div className={className}>
      <label className="label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
