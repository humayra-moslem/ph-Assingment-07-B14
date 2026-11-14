// import Image from "next/image";


import AllProducts from "./components/AllProducts";
import HeroSection from "./components/hero";
import PriceFallers from "./components/PriceFallers";
import PriceRisers from "./components/PriceRisers";



export default  function HomePage() {
 



  return (
    <div>
     <HeroSection/>
     <PriceRisers/>
     <PriceFallers/>
     <AllProducts/>
     
    </div>
  
  );
}

