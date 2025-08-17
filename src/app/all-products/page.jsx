import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import ProductCard from './components/ProductCard';

export const revalidate = 10;

const AllProducts = async () => {
  const allProductsCollection = await dbConnect(collectionNameObj.productCollection);

  const allData = await allProductsCollection.find({}).toArray();

  const products = allData.map(product => ({
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
