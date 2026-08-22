import FeaturedProducts from "../components/home/FeaturedProducts";
import Hero from "../components/home/Hero";
import Collections from "../components/home/Collections";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Reviews from "../components/home/Reviews";
import Newsletter from "../components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <FeaturedProducts />
      <WhyChooseUs />
      <Reviews />
      <Newsletter />
    </>
  );
}