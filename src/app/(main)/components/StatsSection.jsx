import React from "react";

const StatsSection = () => {
    return (
        <section className="bg-white rounded-lg shadow-sm overflow-hidden mt-14 md:mt-24 mb-12">
            <div className="grid md:grid-cols-2 gap-0">

                {/* Left Image */}
                <div className="h-full">
                    <img
                        src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
                        alt="Tech Gadgets"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <p className="text-indigo-600 font-medium mb-2">Our track record</p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Trusted by gadget lovers worldwide
                    </h2>
                    <p className="text-gray-600 mb-8">
                        From smartphones to gaming consoles, we bring you the latest and greatest tech gadgets at unbeatable prices. Our platform ensures authentic products, fast delivery, and dedicated support.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-6 text-center">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">15,000+</p>
                            <p className="text-gray-500 text-sm">Gadgets sold</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">4.9★</p>
                            <p className="text-gray-500 text-sm">Average rating</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">99.8%</p>
                            <p className="text-gray-500 text-sm">Delivery success</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">50+</p>
                            <p className="text-gray-500 text-sm">Brands available</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
