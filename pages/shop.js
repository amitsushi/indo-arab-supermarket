import products from "../lib/products";

export default function Shop() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg shadow p-4 text-center">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover mb-4 rounded" />
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-600">QAR {p.price}</p>
            <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
