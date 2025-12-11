const Services = () => {
  return (
    <section className="p-10">
      <h2 className="text-3xl font-bold mb-6">Our Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 shadow-lg rounded-lg bg-white">Service 1</div>
        <div className="p-6 shadow-lg rounded-lg bg-white">Service 2</div>
        <div className="p-6 shadow-lg rounded-lg bg-white">Service 3</div>
      </div>
    </section>
  );
};

export default Services;
