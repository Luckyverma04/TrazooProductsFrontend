import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  X,
  Loader2,
  ArrowLeft,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import API from "../../config/api";

const ALLOWED_CATEGORIES = [
  "Diary",
  "Stationery",
  "Drinkware",
  "Packaging",
  "Electronics",
  "Bags",
];

const BUDGET_OPTIONS = [100, 200, 300, 500, 750, 1000, 1500, 2000];

const ProductsManager = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    unitPrice: "",
    brandingPrice: "",
    minOrderQty: "",
    customBrandingMOQ: "",
    brandingSupported: false,
    budgetTags: [],
  });

  useEffect(() => {
    // Check admin authentication
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/auth");
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await API.get("/api/products");
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBudgetTagToggle = (budget) => {
    setFormData((prev) => {
      const currentTags = prev.budgetTags || [];
      const hasTag = currentTags.includes(budget);
      
      return {
        ...prev,
        budgetTags: hasTag
          ? currentTags.filter((tag) => tag !== budget)
          : [...currentTags, budget],
      };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("category", formData.category);
      submitData.append("unitPrice", formData.unitPrice);
      submitData.append("brandingPrice", formData.brandingPrice || 0);
      submitData.append("minOrderQty", formData.minOrderQty || 20);
      submitData.append("customBrandingMOQ", formData.customBrandingMOQ || 0);
      submitData.append("brandingSupported", formData.brandingSupported);
      submitData.append("budgetTags", JSON.stringify(formData.budgetTags));

      if (imageFile) {
        submitData.append("productImage", imageFile);
      }

      if (editingProduct) {
        // Update product
        await API.put(`/api/products/${editingProduct._id}`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Product updated successfully!");
      } else {
        // Create product
        await API.post("/api/products", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Product created successfully!");
      }

      // Reset form
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert(error.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      unitPrice: product.unitPrice,
      brandingPrice: product.brandingPrice || "",
      minOrderQty: product.minOrderQty || "",
      customBrandingMOQ: product.customBrandingMOQ || "",
      brandingSupported: product.brandingSupported || false,
      budgetTags: product.budgetTags || [],
    });
    setImagePreview(product.images?.[0] || "");
    setShowAddForm(true);
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      await API.patch(`/api/products/${productId}/toggle`);
      alert(
        `Product ${currentStatus ? "deactivated" : "activated"} successfully!`
      );
      fetchProducts();
    } catch (error) {
      console.error("Error toggling product status:", error);
      alert("Failed to toggle product status");
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/api/products/${productId}`);
        alert("Product deleted successfully!");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      unitPrice: "",
      brandingPrice: "",
      minOrderQty: "",
      customBrandingMOQ: "",
      brandingSupported: false,
      budgetTags: [],
    });
    setImageFile(null);
    setImagePreview("");
    setShowAddForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="p-2 hover:bg-white rounded-lg transition"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Package className="text-purple-600" size={36} />
                Manage Products
              </h1>
              <p className="text-gray-600 mt-1">
                Add, edit, or remove products from your catalog
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* PRODUCT GRID */}
        {loading && !showAddForm ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-purple-600" size={40} />
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <Package className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 text-lg">No products found</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition ${
                  !product.isActive ? "opacity-60" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={
                      product.images?.[0] ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {!product.isActive && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Inactive
                    </div>
                  )}
                  {product.brandingSupported && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Branding ✓
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-2xl font-bold text-purple-600">
                        ₹{product.unitPrice?.toLocaleString()}
                      </span>
                      {product.brandingSupported && product.brandingPrice > 0 && (
                        <p className="text-xs text-gray-500">
                          +₹{product.brandingPrice} branding
                        </p>
                      )}
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
                    <span>
                      MOQ: <strong>{product.minOrderQty || 20}</strong>
                    </span>
                    {product.customBrandingMOQ > 0 && (
                      <span className="text-xs">
                        Custom MOQ: {product.customBrandingMOQ}
                      </span>
                    )}
                  </div>
                  {product.budgetTags && product.budgetTags.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Budget Tags:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.budgetTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                          >
                            ₹{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-1"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() =>
                        handleToggleStatus(product._id, product.isActive)
                      }
                      className={`${
                        product.isActive
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white py-2 rounded-lg transition flex items-center justify-center gap-1`}
                      title={product.isActive ? "Deactivate" : "Activate"}
                    >
                      {product.isActive ? (
                        <ToggleRight size={16} />
                      ) : (
                        <ToggleLeft size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-1"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ADD/EDIT FORM MODAL */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-5 border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white sticky top-0 z-10">
                <h2 className="text-2xl font-bold">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={resetForm}
                  className="hover:bg-white/20 p-2 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                      placeholder="Enter product description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">Select Category</option>
                      {ALLOWED_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Unit Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="unitPrice"
                      value={formData.unitPrice}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Branding Info */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Branding Options
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="brandingSupported"
                          checked={formData.brandingSupported}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-purple-600"
                        />
                        <span className="text-sm font-semibold text-gray-700">
                          Branding Supported
                        </span>
                      </label>
                    </div>

                    {formData.brandingSupported && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Branding Price (₹)
                          </label>
                          <input
                            type="number"
                            name="brandingPrice"
                            value={formData.brandingPrice}
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                            placeholder="0.00"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Custom Branding MOQ
                          </label>
                          <input
                            type="number"
                            name="customBrandingMOQ"
                            value={formData.customBrandingMOQ}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                            placeholder="0"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Order Info */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Order Information
                  </h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Minimum Order Quantity
                    </label>
                    <input
                      type="number"
                      name="minOrderQty"
                      value={formData.minOrderQty}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                      placeholder="20"
                    />
                  </div>
                </div>

                {/* Budget Tags */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Budget Tags *
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Select the budget ranges this product fits into
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => handleBudgetTagToggle(budget)}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                          formData.budgetTags.includes(budget)
                            ? "bg-purple-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        ₹{budget}
                      </button>
                    ))}
                  </div>
                  {formData.budgetTags.length === 0 && (
                    <p className="text-red-500 text-sm mt-2">
                      Please select at least one budget tag
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Image {!editingProduct && "*"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editingProduct}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || formData.budgetTags.length === 0}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="animate-spin" size={20} />
                        Saving...
                      </span>
                    ) : editingProduct ? (
                      "Update Product"
                    ) : (
                      "Add Product"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsManager;