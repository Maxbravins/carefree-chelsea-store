import FeaturedProducts from "../components/home/FeaturedProducts";
import NewArrivals from "../components/home/NewArrivals";
import Hero from "../components/home/Hero";
import Collections from "../components/home/Collections";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Newsletter from "../components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <NewArrivals />
      <FeaturedProducts />
      <WhyChooseUs />
      <Newsletter />
    </>
  );
}
