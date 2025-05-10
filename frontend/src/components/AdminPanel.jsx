import React from 'react';

const AdminPanel = ({ products, setProducts, categories }) => {
  const handleAddProduct = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = parseFloat(e.target.price.value);
    const category = e.target.category.value;
    const newProduct = {
      id: products.length + 1,
      name,
      price,
      category,
    };
    setProducts([...products, newProduct]);
    e.target.reset();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <form onSubmit={handleAddProduct} className="max-w-md mb-4">
        <div className="mb-4">
          <label className="block mb-1">Məhsul adı</label>
          <input
            type="text"
            name="name"
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Qiymət</label>
          <input
            type="number"
            name="price"
            step="0.01"
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Kateqoriya</label>
          <select name="category" className="border p-2 w-full rounded" required>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Məhsul əlavə et
        </button>
      </form>
      <h2 className="text-xl font-bold mb-4">Məhsullar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>{product.price} AZN</p>
            <p>Kateqoriya: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;