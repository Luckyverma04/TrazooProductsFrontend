const Contact = () => {
  return (
    <section className="p-10">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>

      <form className="flex flex-col gap-4 max-w-lg">
        <input type="text" placeholder="Your Name" className="border p-2" />
        <input type="email" placeholder="Your Email" className="border p-2" />
        <textarea placeholder="Message" className="border p-2 h-32"></textarea>
        <button className="bg-blue-600 text-white py-2 rounded">Send</button>
      </form>
    </section>
  );
};

export default Contact;
