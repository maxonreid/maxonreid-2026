interface Props {
  id?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabelledBy?: string;
}

export default function SectionContainer({ id, children, className = '', ariaLabelledBy }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`py-24 px-0 w-[92%] max-w-[1200px] mx-auto ${className}`}
    >
      {children}
    </section>
  );
}
