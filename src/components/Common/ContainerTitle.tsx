type ContainerTitleProps = {
  title: string;
  subtitle?: string;
};

const ContainerTitle = ({ title, subtitle }: ContainerTitleProps) => {
  return (
    <div className="mb-8">
      <h1 className="font-['Inter'] font-extrabold text-5xl tracking-tighter text-on-surface leading-[0.95]">
        {title}
      </h1>
      {subtitle && (
        <p className="font-['Inter'] text-on-surface-variant mt-3 text-lg font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default ContainerTitle;
