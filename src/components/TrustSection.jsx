/**
 * TrustSection — reusable logo/name wall.
 *
 * Har page pe alag content dikhana ho to bas props badal do.
 * Component ek jaisa rehta hai, data alag.
 *
 * PROPS:
 *  columns  → array of { title, items[] }   (1 ya 2 columns, dono chalte hain)
 *  id       → optional section id (scroll ke liye)
 *
 * Example:
 *  <TrustSection
 *    columns={[
 *      { title: "Trusted by Enterprises", items: ["Infosys", "Amazon"] },
 *      { title: "Chosen by Institutions", items: ["IIM Mumbai", "IIT Mandi"] },
 *    ]}
 *  />
 */

const TrustSection = ({ columns = [], id }) => {
  // Agar data hi nahi aaya to kuch render mat karo (page tootega nahi)
  if (!columns.length) return null;

  return (
    <section
      id={id}
      className="bg-[#F7F2EC] border-t border-b border-[#DED8D2] px-6 py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid gap-12 lg:gap-16 ${
            columns.length > 1 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {columns.map((col) => (
            <div key={col.title}>
              {/* Small uppercase label + underline */}
              <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8A5A4A] pb-4 border-b border-[#DED8D2]">
                {col.title}
              </h3>

              {/* Wrapping list of names */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6">
                {col.items.map((item) => (
                  <span
                    key={item}
                    className="text-lg font-semibold text-[#222222] whitespace-nowrap"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;