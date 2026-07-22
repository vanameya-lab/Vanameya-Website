"use client";
import { useState } from "react";
import { updateProductAction } from "../actions";

export default function ProductsClient({ products }) {
  const [loadingId, setLoadingId] = useState(null);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    setLoadingId(id);
    const formData = new FormData(e.target);
    const updates = {
      price: Number(formData.get("price")),
      compare_price: Number(formData.get("comparePrice")),
      stock: Number(formData.get("stock")),
      is_active: formData.get("isActive") === "true"
    };

    try {
      await updateProductAction(id, updates);
      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-primary-text mb-2">Products</h1>
          <p className="text-secondary-text">Manage your catalog pricing and stock.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-surface border border-border/20 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-32 h-32 bg-white/5 border border-border/20 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-secondary-text uppercase">Image</span>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-heading font-semibold text-primary-text">{product.name}</h2>
                    <p className="text-sm text-secondary-text">SKU: {product.sku || 'N/A'}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-lg uppercase tracking-wider font-bold ${
                    product.is_active ? 'bg-success/20 text-success border border-success/30' : 'bg-white/10 text-secondary-text border border-border/30'
                  }`}>
                    {product.is_active ? 'Active' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-secondary-text mb-6 line-clamp-2">{product.short_description}</p>
                
                <form onSubmit={(e) => handleSubmit(e, product.id)} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-secondary-text font-bold">Price (₹)</label>
                    <input type="number" step="0.01" name="price" defaultValue={product.price} className="bg-black/20 border border-border/30 rounded-xl px-4 py-2 text-primary-text focus:outline-none focus:border-accent" />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-secondary-text font-bold">Compare at (₹)</label>
                    <input type="number" step="0.01" name="comparePrice" defaultValue={product.compare_price} className="bg-black/20 border border-border/30 rounded-xl px-4 py-2 text-primary-text focus:outline-none focus:border-accent" />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-secondary-text font-bold">Stock</label>
                    <input type="number" name="stock" defaultValue={product.stock} className="bg-black/20 border border-border/30 rounded-xl px-4 py-2 text-primary-text focus:outline-none focus:border-accent" />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-secondary-text font-bold">Status</label>
                    <select name="isActive" defaultValue={product.is_active ? "true" : "false"} className="bg-black/20 border border-border/30 rounded-xl px-4 py-2 text-primary-text focus:outline-none focus:border-accent">
                      <option value="true" className="bg-surface">Active</option>
                      <option value="false" className="bg-surface">Draft</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-4 mt-2 flex justify-end">
                    <button type="submit" disabled={loadingId === product.id} className="px-6 py-2 bg-transparent border-2 border-accent text-accent font-bold tracking-widest uppercase rounded-lg hover:bg-accent/10 transition-colors disabled:opacity-50">
                      {loadingId === product.id ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
