export default function SimpleCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-base-white shadow-md p-5 rounded-xl w-full ${className || ""}`}
    >
      {children}
    </div>
  );
}
