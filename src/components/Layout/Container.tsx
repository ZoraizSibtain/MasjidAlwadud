const Container = ({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) => {
  return (
    <div className={`${wide ? 'max-w-5xl' : 'max-w-3xl'} mx-auto grow px-8 py-12 md:px-12 md:py-16`}>
      {children}
    </div>
  );
};

export default Container;
