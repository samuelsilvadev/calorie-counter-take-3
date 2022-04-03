const FoodsWrapper: React.FC = ({ children }) => {
  return (
    <section>
      <h1 className="text-3xl font-bold underline mb-12">Foods</h1>
      {children}
    </section>
  );
};

export default FoodsWrapper;
