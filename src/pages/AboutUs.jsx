import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 md:px-16 lg:px-24 py-16">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-semibold text-gray-800 border-b border-gray-300 pb-4">
          About Our Company
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white border border-gray-200 shadow-sm p-6 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              <strong>Transform Enterprises / Rajhans Engineering Works / Hansraj Industries</strong> was established in <strong>1968</strong> in Pune, Maharashtra. We are a <strong>Proprietorship firm</strong>, known for manufacturing high-quality <em>Epoxy Insulators, Conveyor Belts, Dowels Pins, Earthing Strips</em> and other essential industrial components.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With over five decades of excellence, we have built a legacy of precision, quality, and customer trust. Our facility is equipped with advanced machinery, and we ensure smooth supply through a well-maintained warehouse setup.
            </p>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-xl font-medium text-green-700 mb-4">Quick Facts</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Nature of Business: Manufacturer</li>
                <li>Additional Role: Factory / Manufacturing</li>
                <li>CEO: Kartik H Gowardhan</li>
                <li>Established: 1968</li>
                <li>Employees: 11 – 25 People</li>
                <li>Legal Status: Proprietorship</li>
                <li>GST Registered: Since 01-07-2017</li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-medium text-green-700 mb-4">Financial Overview</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Annual Turnover: ₹40 L – ₹1.5 Cr</li>
                <li>Banker: Bank of Maharashtra</li>
                <li>GST No: 27AFLPG6365A1ZK</li>
                <li>GST Partner: Kartik Hemkant Gowardhan</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-medium text-green-700 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To deliver dependable, durable, and high-performance industrial products with a commitment to innovation, consistency, and excellence. We aim to support industries across India by ensuring timely delivery and uncompromising quality.
            </p>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-medium text-green-700 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To be a leading manufacturer in the industrial components sector by continuously adapting to modern technologies while upholding our legacy of craftsmanship and integrity since 1968.
            </p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 p-6">
          <p className="text-green-800 font-medium text-lg">
            Thank you for choosing <strong>Hansraj Industries</strong> as your manufacturing partner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
