import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Services from '@/components/services';
import Packages from '@/components/packages';
import Form from '@/components/form';

const homeData = {
  hero: {
    background: "brown",
    title: "Your Imagination Is  Your Only Limit",
    paragraph: "We always try to make our customer Happy. We provide all kind of facilities.  Your Satisfaction is our main priority",
    buttonText: "Discover more",
    buttonLink: "https://www.google.com",
  },
  services: {},
  package: {},
}
export default function Home () {
  return (
    <>
      <Hero data={homeData.hero} />
      <Navbar />
      <Services data={homeData.services} />
      <Packages data={homeData.packages} />
      <Form />
    </>
  );
}
