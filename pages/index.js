import Link from "next/link";
import products from "../lib/products";

export default function Home() {
  // get unique categories from products
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="container mx-auto px-4">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Fresh • Halal • Delivered</h1>
        <p className="text-lg text-gray-600 mb-6">
          Fruits, vegetables, spices, meat and more — shop online with ease.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/shop">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg">Start Shopping</button>
          </Link>
          <Link href="#categories">
            <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg">
              Browse Categories
            </button>
          </Link>
        </div>
      </section>

      <section id="categories" className="py-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(cat => (
            <Link key={cat} href={`/shop?category=${cat}`}>
              <div className="border rounded-xl shadow p-6 text-center hover:bg-gray-50 cursor-pointer">
                <h3 className="text-lg font-semibold">{cat}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
