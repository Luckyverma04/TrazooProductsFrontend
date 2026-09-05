import { useState } from "react";

const INDIA_PATH =
  "M148.7 0.0 L168.2 6.9 L185.3 20.8 L187.7 27.7 L197.5 30.0 L199.9 34.6 L209.6 34.6 L224.3 27.7 L238.9 27.7 L253.5 34.6 L248.7 50.8 L238.9 57.7 L236.5 64.6 L226.7 67.0 L226.7 78.5 L236.5 83.1 L234.0 87.7 L238.9 92.4 L229.1 99.3 L221.8 94.7 L217.0 97.0 L224.3 115.4 L221.8 120.1 L226.7 124.7 L229.1 122.4 L238.9 133.9 L243.8 131.6 L253.5 143.1 L260.8 143.1 L265.7 147.8 L256.0 157.0 L248.7 177.8 L280.3 198.6 L299.8 203.2 L302.3 207.8 L331.5 207.8 L353.5 224.0 L360.8 219.3 L363.2 226.3 L368.1 224.0 L380.3 228.6 L407.1 228.6 L414.4 219.3 L409.5 212.4 L409.5 198.6 L419.3 189.3 L424.2 205.5 L421.7 210.1 L431.5 219.3 L448.5 219.3 L455.9 214.7 L482.7 217.0 L492.4 212.4 L492.4 203.2 L480.2 196.2 L499.7 191.6 L509.5 175.5 L521.7 170.9 L536.3 157.0 L550.9 161.6 L563.1 150.1 L568.0 154.7 L565.6 159.3 L572.9 159.3 L572.9 173.2 L589.9 173.2 L589.9 180.1 L585.1 184.7 L589.9 196.2 L585.1 191.6 L572.9 193.9 L550.9 214.7 L553.4 224.0 L548.5 235.5 L543.6 237.8 L548.5 249.4 L541.2 258.6 L538.7 270.1 L521.7 270.1 L524.1 290.9 L519.2 293.2 L521.7 307.1 L516.8 314.0 L509.5 307.1 L504.6 281.7 L499.7 277.1 L492.4 281.7 L490.0 293.2 L485.1 288.6 L482.7 293.2 L482.7 286.3 L477.8 281.7 L480.2 274.7 L492.4 270.1 L504.6 254.0 L499.7 249.4 L448.5 247.0 L448.5 235.5 L443.7 228.6 L436.4 233.2 L429.0 224.0 L426.6 228.6 L419.3 224.0 L409.5 237.8 L429.0 249.4 L416.9 258.6 L414.4 256.3 L409.5 263.2 L426.6 274.7 L421.7 284.0 L431.5 300.1 L433.9 327.9 L426.6 327.9 L426.6 323.2 L419.3 323.2 L416.9 318.6 L409.5 327.9 L392.5 334.8 L392.5 350.9 L387.6 357.9 L377.9 367.1 L365.7 371.7 L360.8 367.1 L338.8 397.1 L292.5 431.7 L292.5 441.0 L275.5 443.3 L265.7 454.8 L258.4 452.5 L251.1 457.1 L246.2 466.4 L246.2 503.3 L251.1 512.6 L236.5 547.2 L238.9 572.6 L231.6 572.6 L224.3 579.5 L217.0 593.4 L219.4 595.7 L202.3 602.6 L197.5 611.8 L199.9 614.1 L190.1 621.1 L180.4 621.1 L165.8 607.2 L148.7 551.8 L134.1 535.6 L124.3 494.1 L99.9 447.9 L97.5 413.3 L90.2 387.9 L90.2 360.2 L97.5 346.3 L92.6 339.4 L92.6 314.0 L90.2 311.7 L85.3 316.3 L78.0 337.1 L60.9 344.0 L48.8 344.0 L14.6 309.4 L24.4 311.7 L41.4 307.1 L48.8 293.2 L46.3 290.9 L36.6 297.8 L21.9 297.8 L0.0 277.1 L2.4 272.4 L12.2 272.4 L14.6 265.5 L34.1 270.1 L48.8 265.5 L58.5 270.1 L65.8 265.5 L56.1 237.8 L46.3 233.2 L48.8 221.6 L34.1 212.4 L36.6 203.2 L51.2 189.3 L56.1 189.3 L60.9 196.2 L82.9 193.9 L92.6 177.8 L102.4 173.2 L114.6 161.6 L117.0 152.4 L129.2 145.5 L129.2 138.5 L141.4 127.0 L141.4 113.1 L148.7 106.2 L158.5 103.9 L158.5 99.3 L146.3 94.7 L143.8 87.7 L126.8 80.8 L124.3 50.8 L126.8 53.1 L139.0 39.2 L117.0 20.8 L109.7 20.8 L109.7 16.2 L119.5 6.9 L134.1 6.9 L148.7 0.0 Z";

const CITIES = [
  { id: 0, name: "Delhi", left: "31.24%", top: "27.95%" },
  { id: 1, name: "Mumbai", left: "16.5%", top: "59.32%" },
  { id: 2, name: "Bengaluru", left: "32.53%", top: "79.43%" },
  { id: 3, name: "Hyderabad", left: "35.59%", top: "64.88%" },
  { id: 4, name: "Chennai", left: "41.65%", top: "79.07%" },
  { id: 5, name: "Kolkata", left: "69.17%", top: "47.83%" },
  { id: 6, name: "Pune", left: "19.84%", top: "61.16%" },
  { id: 7, name: "Ahmedabad", left: "15.48%", top: "46.31%" },
  { id: 8, name: "Jaipur", left: "26.4%", top: "33.54%" },
  { id: 9, name: "Lucknow", left: "43.96%", top: "33.74%" },
  { id: 10, name: "Guwahati", left: "80.67%", top: "36.08%" },
  { id: 11, name: "Kochi", left: "28.04%", top: "89.43%" },
  { id: 12, name: "Chandigarh", left: "29.77%", top: "20.97%" },
  { id: 13, name: "Indore", left: "26.64%", top: "47.33%" },
  { id: 14, name: "Bhopal", left: "31.92%", top: "45.56%" },
  { id: 15, name: "Nagpur", left: "37.63%", top: "52.5%" },
  { id: 16, name: "Surat", left: "16.33%", top: "52.44%" },
  { id: 17, name: "Patna", left: "58.22%", top: "37.89%" },
  { id: 18, name: "Bhubaneswar", left: "60.53%", top: "55.3%" },
  { id: 19, name: "Coimbatore", left: "30.38%", top: "85.85%" },
  { id: 20, name: "Visakhapatnam", left: "51.68%", top: "63.89%" },
  { id: 21, name: "Dehradun", left: "34.03%", top: "22.32%" },
];

const IndiaMap = () => {
  const [activePin, setActivePin] = useState(null);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Soft client-style orange glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[8%_8%]
          rounded-full
          bg-[radial-gradient(circle,rgba(243,111,33,0.10)_0%,rgba(243,111,33,0.035)_35%,rgba(243,111,33,0)_70%)]
        "
      />

      <div className="relative mx-auto h-full w-full max-w-[430px]">
        <svg
          viewBox="0 0 594 638"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="block h-full w-full"
          aria-hidden="true"
        >
          <defs>
            {/* Grey dot pattern */}
            <pattern
              id="indiaDots"
              width="9"
              height="9"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="2.5"
                cy="2.5"
                r="1.8"
                fill="#D8D3CB"
              />
            </pattern>

            {/* Clip dots inside India */}
            <clipPath id="indiaClip">
              <path d={INDIA_PATH} />
            </clipPath>

            {/* Soft orange glow */}
            <filter
              id="orangeGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* Dotted India silhouette */}
          <rect
            x="0"
            y="0"
            width="594"
            height="638"
            fill="url(#indiaDots)"
            clipPath="url(#indiaClip)"
          />

          {/* Very soft orange glow behind outline */}
          <path
            d={INDIA_PATH}
            stroke="#F36F21"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.10"
            filter="url(#orangeGlow)"
          />

          {/* Animated orange India outline */}
          <path
            d={INDIA_PATH}
            pathLength="1"
            stroke="#F36F21"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0.16 0.84"
            strokeDashoffset="0"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-1"
              dur="5s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        {/* City pins */}
        {CITIES.map((city) => (
          <div
            key={city.id}
            className="absolute z-20"
            style={{
              left: city.left,
              top: city.top,
              transform: "translate(-50%, -50%)",
            }}
            onMouseEnter={() => setActivePin(city.id)}
            onMouseLeave={() => setActivePin(null)}
          >
            {/* 
              44x44px touch target.
              The visible orange pin remains 7x7px,
              so the map appearance does not change.
            */}
            <button
              type="button"
              aria-label={`Show location for ${city.name}`}
              className="
                group
                flex
                h-11
                w-11
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border-0
                bg-transparent
                p-0
                touch-manipulation
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#B84D0D]
                focus-visible:ring-offset-2
              "
              onFocus={() => setActivePin(city.id)}
              onBlur={() => setActivePin(null)}
            >
              <span
                aria-hidden="true"
                className="
                  block
                  h-[7px]
                  w-[7px]
                  rounded-full
                  bg-[#F36F21]
                  shadow-[0_0_7px_rgba(243,111,33,0.30)]
                  transition-[width,height,transform]
                  duration-200
                  group-hover:h-[9px]
                  group-hover:w-[9px]
                  group-focus-visible:h-[9px]
                  group-focus-visible:w-[9px]
                "
              />
            </button>

            {activePin === city.id && (
              <div
                role="tooltip"
                className="
                  pointer-events-none
                  absolute
                  bottom-[calc(100%+3px)]
                  left-1/2
                  -translate-x-1/2
                  whitespace-nowrap
                  rounded-[5px]
                  border
                  border-[#B84D0D]
                  bg-white
                  px-2
                  py-1
                  text-[9px]
                  font-semibold
                  text-[#111]
                  shadow-md
                "
              >
                {city.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndiaMap;