interface Props {
  children: React.ReactNode;
}

const GridLayout = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
};

export default GridLayout;
