import { useSEO } from "../hooks/useSEO";
import { seoMetadata } from "../utils/seo";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Image as ImageIcon,
  Package,
  Pencil,
  Upload,
} from "lucide-react";

import Footer from "../components/Footer";

const API = import.meta.env.VITE_API_URL;

const customizationTypes = [
  {
    value: "logo_printing",
    label: "Logo Printing",
    description: "Add your company logo to the product.",
  },
  {
    value: "color_change",
    label: "Color Change",
    description: "Customize the product color.",
  },
  {
    value: "packaging",
    label: "Packaging",
    description: "Customize packaging, box or wrapping.",
  },
  {
    value: "material",
    label: "Material",
    description: "Request a different material or finish.",
  },
  {
    value: "other",
    label: "Other",
    description: "Something else? Tell us in the notes.",
  },
];

const Customization = () => {
  useSEO(seoMetadata.customisation);
  const location = useLocation();
  
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [preSelectedProduct, setPreSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productId: "",
    category: "",
    price: "",
    quantity: "",
    customizationType: "",
    notes: "",
    needsLogo: false,
    brandLogo: "",
    referenceImage: "",
  });

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==================================================
  // LOAD PRODUCTS
  // ==================================================

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`${API}/api/products`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "Failed to load products"
          );
        }

        const productList = Array.isArray(data)
          ? data
          : data.products || data.data || [];

        setProducts(productList);
      } catch (error) {
        console.error("Products loading error:", error);

        setAlert({
          type: "error",
          message:
            "Unable to load products. Please try again later.",
        });
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  // ==================================================
  // AUTO-SELECT PRODUCT FROM ROUTE STATE
  // ==================================================

  useEffect(() => {
    if (location.state?.preSelectedProduct) {
      const preSelected = location.state.preSelectedProduct;

      console.log("✅ Pre-selected product:", preSelected);

      setPreSelectedProduct(preSelected);

      // Auto-select the product from route state
      setFormData((prev) => ({
        ...prev,
        productId: preSelected.id,
        category: preSelected.category || "",
        price: preSelected.price || "",
      }));
    }
  }, [location.state]);

  // ==================================================
  // CHANGE HANDLER
  // ==================================================

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setAlert({
      type: "",
      message: "",
    });
  };

  // ==================================================
  // PRODUCT SELECT
  // ==================================================

  const handleProductSelect = (product) => {
    setFormData((prev) => ({
      ...prev,
      productId: product._id,
      category: product.category || "",
      price: product.unitPrice ?? "",
    }));

    setAlert({
      type: "",
      message: "",
    });
  };

  // ==================================================
  // LOGO CHANGE
  // ==================================================

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      brandLogo: file.name,
    }));
  };

  // ==================================================
  // REFERENCE IMAGE
  // ==================================================

  const handleReferenceImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      referenceImage: file.name,
    }));
  };

  // ==================================================
  // SUBMIT
  // ==================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAlert({
      type: "",
      message: "",
    });

    // ==================================================
    // FRONTEND VALIDATION
    // ==================================================

    if (!formData.name.trim()) {
      setAlert({
        type: "error",
        message: "Please enter your name.",
      });
      return;
    }

    if (!formData.email.trim()) {
      setAlert({
        type: "error",
        message: "Please enter your email.",
      });
      return;
    }

    if (!formData.phone.trim()) {
      setAlert({
        type: "error",
        message: "Please enter your phone number.",
      });
      return;
    }

    if (!formData.productId) {
      setAlert({
        type: "error",
        message: "Please select a product.",
      });
      return;
    }

    if (!formData.customizationType) {
      setAlert({
        type: "error",
        message: "Please select the customization type.",
      });
      return;
    }

    if (formData.needsLogo && !formData.brandLogo) {
      setAlert({
        type: "error",
        message: "Please upload your logo.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedProduct = products.find(
        (product) =>
          String(product._id) === String(formData.productId)
      );

      if (!selectedProduct) {
        throw new Error("Selected product not found.");
      }

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),

        productId: formData.productId,

        category:
          formData.category ||
          selectedProduct.category ||
          "",

        price:
          formData.price !== ""
            ? Number(formData.price)
            : selectedProduct.unitPrice,

        quantity: formData.quantity
          ? Number(formData.quantity)
          : undefined,

        customizationType:
          formData.customizationType,

        notes: formData.notes.trim(),

        needsLogo: Boolean(formData.needsLogo),

        brandLogo:
          formData.brandLogo || undefined,

        referenceImage:
          formData.referenceImage || undefined,
      };

      const response = await fetch(
        `${API}/api/kit-enquiry/customization`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      // ==================================================
      // SAFE RESPONSE HANDLING
      // ==================================================

      const contentType =
        response.headers.get("content-type") || "";

      let data = {};

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        console.error(
          "Backend returned non-JSON response:",
          text
        );

        throw new Error(
          `Server error (${response.status}). Please try again.`
        );
      }

      // ==================================================
      // ERROR
      // ==================================================

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to submit customization request."
        );
      }

      // ==================================================
      // SUCCESS
      // ==================================================

      setAlert({
        type: "success",
        message:
          data?.message ||
          "✅ Customization request submitted successfully!",
      });

      alert(
        data?.message ||
          "✅ Customization request submitted successfully!"
      );

      // ==================================================
      // RESET FORM
      // ==================================================

      setFormData({
        name: "",
        email: "",
        phone: "",
        productId: "",
        category: "",
        price: "",
        quantity: "",
        customizationType: "",
        notes: "",
        needsLogo: false,
        brandLogo: "",
        referenceImage: "",
      });

      // ==================================================
      // SCROLL TOP
      // ==================================================

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Customization submission error:",
        error
      );

      setAlert({
        type: "error",
        message:
          error?.message ||
          "Something went wrong. Please try again.",
      });

      alert(
        `❌ ${
          error?.message ||
          "Something went wrong. Please try again."
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==================================================
  // FILTER PRODUCTS - Show only pre-selected if exists
  // ==================================================

  const displayProducts = preSelectedProduct
    ? products.filter(
        (product) =>
          String(product._id) === String(preSelectedProduct.id)
      )
    : products;

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#222222]">
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* ==================================================
              HERO
          ================================================== */}

          <section className="grid lg:grid-cols-[1.4fr_0.8fr] gap-12 items-center mb-20">

            <div>
              <p className="text-[#DF4607] text-xs font-semibold tracking-widest uppercase mb-4">
                CUSTOMISATION
              </p>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-[#111111]">
                Make it yours.
                <br />
                <span className="text-[#DF4607]">
                  Your way.
                </span>
              </h1>

              <p className="text-[#77716C] text-lg mt-5 max-w-2xl leading-relaxed">
                Choose a product, tell us how you want it
                customized, and our team will take care of
                the rest.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5DED7] rounded-full text-sm">
                  <Pencil size={16} className="text-[#DF4607]" />
                  Custom branding
                </div>

                <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5DED7] rounded-full text-sm">
                  <Package
                    size={16}
                    className="text-[#DF4607]"
                  />
                  Custom packaging
                </div>

                <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5DED7] rounded-full text-sm">
                  <ImageIcon
                    size={16}
                    className="text-[#DF4607]"
                  />
                  Reference images
                </div>
              </div>
            </div>

            <div className="bg-[#F5F0EA] rounded-3xl p-8 min-h-[300px] flex flex-col justify-center">
              <Pencil
                size={42}
                strokeWidth={1.5}
                className="text-[#DF4607] mb-6"
              />

              <h2 className="text-2xl font-semibold">
                Built around your brand
              </h2>

              <p className="text-[#77716C] mt-3 leading-relaxed">
                From logo placement to packaging and
                material changes, share exactly what you
                have in mind.
              </p>
            </div>
          </section>

          {/* ==================================================
              FORM
          ================================================== */}

          <section className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">

            <form
              onSubmit={handleSubmit}
              className="bg-white border border-[#E3DDD7] rounded-2xl p-6 md:p-10"
            >

              <div className="mb-8">
                <p className="text-[#DF4607] text-xs font-semibold tracking-widest uppercase">
                  REQUEST CUSTOMISATION
                </p>

                <h2 className="text-3xl font-semibold mt-2">
                  Tell us what you need
                </h2>

                <p className="text-[#88817B] mt-2">
                  We will review your request and contact
                  you with the next steps.
                </p>
              </div>

              {/* ALERT */}

              {alert.message && (
                <div
                  className={`mb-6 rounded-lg px-4 py-3 text-sm ${
                    alert.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {alert.message}
                </div>
              )}

              {/* PERSONAL DETAILS */}

              <div className="grid md:grid-cols-2 gap-5">

                <Field
                  label="Full Name"
                  required
                  value={formData.name}
                  placeholder="John Doe"
                  onChange={(e) =>
                    handleChange("name", e.target.value)
                  }
                />

                <Field
                  label="Work Email"
                  required
                  type="email"
                  value={formData.email}
                  placeholder="john@company.com"
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
                />

                <Field
                  label="Phone Number"
                  required
                  value={formData.phone}
                  placeholder="+91 98765 43210"
                  onChange={(e) =>
                    handleChange("phone", e.target.value)
                  }
                />

                <Field
                  label="Quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  placeholder="e.g. 100"
                  onChange={(e) =>
                    handleChange(
                      "quantity",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* PRODUCT */}

              <div className="mt-8">

                <label className="block text-sm font-medium mb-3">
                  Select Product
                  <span className="text-[#DF4607] ml-1">
                    *
                  </span>
                </label>

                {loadingProducts ? (
                  <div className="border border-[#DDD6D0] rounded-xl px-4 py-4 text-[#88817B]">
                    Loading products...
                  </div>
                ) : displayProducts.length === 0 ? (
                  <div className="border border-red-200 bg-red-50 rounded-xl px-4 py-4 text-red-600">
                    No products available.
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">

                    {displayProducts.map((product) => {
                      const selected =
                        String(formData.productId) ===
                        String(product._id);

                      return (
                        <button
                          type="button"
                          key={product._id}
                          onClick={() =>
                            handleProductSelect(product)
                          }
                          className={`text-left p-4 rounded-xl border-2 transition-all ${
                            selected
                              ? "border-[#DF4607] bg-[#FFF5EF]"
                              : "border-[#E5DED7] hover:border-[#DF4607]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">

                            <div>
                              <h3 className="font-semibold">
                                {product.name}
                              </h3>

                              {product.category && (
                                <p className="text-xs text-[#8A817A] mt-1">
                                  {product.category}
                                </p>
                              )}

                              {product.unitPrice !==
                                undefined && (
                                <p className="text-sm mt-3 font-medium">
                                  ₹{product.unitPrice}
                                </p>
                              )}
                            </div>

                            {selected && (
                              <CheckCircle2
                                size={20}
                                className="text-[#DF4607] shrink-0"
                              />
                            )}

                          </div>
                        </button>
                      );
                    })}

                  </div>
                )}
              </div>

              {/* CUSTOMIZATION TYPE */}

              <div className="mt-8">

                <label className="block text-sm font-medium mb-3">
                  What would you like to customize?
                  <span className="text-[#DF4607] ml-1">
                    *
                  </span>
                </label>

                <div className="grid sm:grid-cols-2 gap-3">

                  {customizationTypes.map((item) => {
                    const selected =
                      formData.customizationType ===
                      item.value;

                    return (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() =>
                          handleChange(
                            "customizationType",
                            item.value
                          )
                        }
                        className={`text-left p-4 rounded-xl border-2 transition-all ${
                          selected
                            ? "border-[#DF4607] bg-[#FFF5EF]"
                            : "border-[#E5DED7] hover:border-[#DF4607]"
                        }`}
                      >
                        <div className="flex items-start gap-3">

                          <div
                            className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center ${
                              selected
                                ? "border-[#DF4607]"
                                : "border-[#BDB5AE]"
                            }`}
                          >
                            {selected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#DF4607]" />
                            )}
                          </div>

                          <div>
                            <p className="font-medium">
                              {item.label}
                            </p>

                            <p className="text-xs text-[#88817B] mt-1">
                              {item.description}
                            </p>
                          </div>

                        </div>
                      </button>
                    );
                  })}

                </div>
              </div>

              {/* LOGO */}

              <div className="mt-8 border border-[#E5DED7] rounded-xl p-5">

                <div className="flex items-center justify-between gap-4">

                  <div>
                    <h3 className="font-medium">
                      Do you need your logo?
                    </h3>

                    <p className="text-sm text-[#88817B] mt-1">
                      We will use it for the customization.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleChange(
                        "needsLogo",
                        !formData.needsLogo
                      )
                    }
                    className={`relative w-12 h-7 rounded-full transition ${
                      formData.needsLogo
                        ? "bg-[#DF4607]"
                        : "bg-[#C9C3BE]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                        formData.needsLogo
                          ? "left-6"
                          : "left-1"
                      }`}
                    />
                  </button>

                </div>

                {formData.needsLogo && (
                  <div className="mt-5">

                    <label className="block text-sm font-medium mb-2">
                      Upload Logo
                      <span className="text-[#DF4607] ml-1">
                        *
                      </span>
                    </label>

                    <label className="flex items-center gap-3 border-2 border-dashed border-[#D9D1CA] rounded-xl p-5 cursor-pointer hover:border-[#DF4607] transition">
                      <Upload
                        size={20}
                        className="text-[#DF4607]"
                      />

                      <div>
                        <p className="text-sm font-medium">
                          Choose logo file
                        </p>

                        <p className="text-xs text-[#88817B] mt-1">
                          PNG, JPG or SVG
                        </p>
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
                    </label>

                    {formData.brandLogo && (
                      <p className="text-xs text-green-600 mt-2">
                        Logo selected:{" "}
                        {formData.brandLogo}
                      </p>
                    )}

                  </div>
                )}

              </div>

              {/* REFERENCE IMAGE */}

              <div className="mt-6">

                <label className="block text-sm font-medium mb-2">
                  Reference Image
                  <span className="text-[#88817B] ml-1">
                    (Optional)
                  </span>
                </label>

                <label className="flex items-center gap-3 border-2 border-dashed border-[#D9D1CA] rounded-xl p-5 cursor-pointer hover:border-[#DF4607] transition">

                  <ImageIcon
                    size={20}
                    className="text-[#DF4607]"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      Upload a reference
                    </p>

                    <p className="text-xs text-[#88817B] mt-1">
                      Show us what you have in mind.
                    </p>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleReferenceImageChange}
                  />

                </label>

                {formData.referenceImage && (
                  <p className="text-xs text-green-600 mt-2">
                    Reference selected:{" "}
                    {formData.referenceImage}
                  </p>
                )}

              </div>

              {/* NOTES */}

              <div className="mt-6">

                <label className="block text-sm font-medium mb-2">
                  Additional Instructions
                </label>

                <textarea
                  rows={5}
                  value={formData.notes}
                  onChange={(e) =>
                    handleChange(
                      "notes",
                      e.target.value
                    )
                  }
                  placeholder="Tell us about colors, placement, packaging, material, finish, or anything else..."
                  className="w-full border border-[#D9D1CA] rounded-xl px-4 py-3 outline-none focus:border-[#DF4607] resize-none"
                />

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8 bg-[#DF4607] hover:bg-[#C93E05] disabled:opacity-60 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition"
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Customization Request"}

                {!isSubmitting && (
                  <ArrowRight size={18} />
                )}
              </button>

            </form>

            {/* ==================================================
                SIDE INFO
            ================================================== */}

            <aside className="lg:sticky lg:top-28">

              <div className="bg-[#F5F0EA] rounded-2xl p-7">

                <p className="text-xs tracking-widest text-[#DF4607] font-semibold uppercase">
                  How it works
                </p>

                <div className="mt-6 space-y-6">

                  <InfoStep
                    number="01"
                    title="Choose a product"
                    text="Select the product you want customized."
                  />

                  <InfoStep
                    number="02"
                    title="Tell us your idea"
                    text="Choose the customization type and add your instructions."
                  />

                  <InfoStep
                    number="03"
                    title="Share references"
                    text="Add your logo or a reference image if required."
                  />

                  <InfoStep
                    number="04"
                    title="We take it forward"
                    text="Our team reviews your request and contacts you with the next steps."
                  />

                </div>

              </div>

            </aside>

          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// ==================================================
// FIELD
// ==================================================

const Field = ({
  label,
  required,
  type = "text",
  value,
  placeholder,
  onChange,
  min,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}

        {required && (
          <span className="text-[#DF4607] ml-1">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        min={min}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border border-[#D9D1CA] rounded-xl px-4 py-3 outline-none focus:border-[#DF4607]"
      />
    </div>
  );
};

// ==================================================
// INFO STEP
// ==================================================

const InfoStep = ({ number, title, text }) => {
  return (
    <div className="flex gap-4">

      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-xs font-bold text-[#DF4607] shrink-0">
        {number}
      </div>

      <div>
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-[#77716C] mt-1 leading-relaxed">
          {text}
        </p>
      </div>

    </div>
  );
};

export default Customization;