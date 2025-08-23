import React from "react";


const Banner = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto overflow-hidden">
      {/* Background Image */}
      <img
        src={"./mainBanner.png"}
        alt="Banner"
        className="w-full h-full object-cover"
      />  
     
    </section>
  );
};

export default Banner;
