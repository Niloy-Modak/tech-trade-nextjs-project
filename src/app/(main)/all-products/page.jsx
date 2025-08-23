import ProductCard from './components/ProductCard';

const AllProducts = async () => {
  // Fetch all products from your API
  const res = await fetch('https://tech-trade-psi.vercel.app/api/products', {
  next: { revalidate: 10 },
});

if (!res.ok) throw new Error('Failed to fetch products');

const productsArray = await res.json();

// If your API returns an array directly:
const products = productsArray.map(product => ({
  ...product,
  _id: product._id.toString(),
}));


  return (
    <section className="py-14">
      <h1 className="font-black text-2xl md:text-3xl lg:text-4xl text-center py-8">
        All products
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </section>
    </section>
  );
};

export default AllProducts;
