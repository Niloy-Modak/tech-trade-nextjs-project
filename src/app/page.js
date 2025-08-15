import Link from "next/link";
import Banner from "./components/Banner";
import RecentAdded from "./components/RecentAdded";
import StatsSection from "./components/StatsSection";

export default function Home() {
  return (
    <section className="pt-18">
      <Banner />
      <section className="p-4 mt-12 rounded-xl bg-gray-200">
        <h1 className="text-3xl lg:text-4xl mb-3 md:mb-6 lg:mb-8 font-semibold text-center text-gray-900">Recent Added</h1>
        <RecentAdded />
        <div className="text-center pt-4 md:pt-6">
          <Link href={"/all-products"} className="btn bg-gray-800 hover:bg-gray-600 font-semibold text-white rounded-full">
            View more
          </Link>
        </div>
      </section>
      <StatsSection />
    </section>
  );
}
