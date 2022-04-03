const FoodsWrapper: React.FC = ({ children }) => {
  return (
    <section className="w-full max-w-lg px-8 m-auto">
      <h1 className="text-3xl font-bold underline mb-12">Foods</h1>
      {children}
    </section>
  );
};

export default FoodsWrapper;
