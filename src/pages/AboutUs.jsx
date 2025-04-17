import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-zinc-100 flex items-start justify-center py-12 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="w-full max-w-7xl space-y-10">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6">
        About Our Company
      </h1>

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 space-y-10">
          <p className="text-lg text-zinc-700 leading-relaxed">
            <strong>Transform Enterprises / Rajhans Engineering Works / Hansraj Industries</strong> was established in <strong>1968</strong> in Pune, Maharashtra. We are a <strong>Proprietorship firm</strong>, known for manufacturing high-quality <em>Epoxy Insulators, Conveyor Belts, Dowels Pins, Earthing Strips</em> and other essential industrial components.
          </p>

          <p className="text-lg text-zinc-700 leading-relaxed">
            With over five decades of excellence, we have built a legacy of precision, quality, and customer trust. Our facility is equipped with advanced machinery, and we ensure smooth supply through a well-maintained warehouse setup.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-100 rounded-2xl p-6 shadow-inner">
              <h2 className="text-xl font-semibold text-emerald-700 mb-4">Quick Facts</h2>
              <ul className="list-disc pl-5 text-zinc-700 space-y-2">
                <li>Nature of Business: Manufacturer</li>
                <li>Additional Role: Factory / Manufacturing</li>
                <li>CEO: Kartik H Gowardhan</li>
                <li>Established: 1968</li>
                <li>Employees: 11 – 25 People</li>
                <li>Legal Status: Proprietorship</li>
                <li>GST Registered: Since 01-07-2017</li>
              </ul>
            </div>

            <div className="bg-zinc-100 rounded-2xl p-6 shadow-inner">
              <h2 className="text-xl font-semibold text-emerald-700 mb-4">Financial Overview</h2>
              <ul className="list-disc pl-5 text-zinc-700 space-y-2">
                <li>Annual Turnover: ₹40 L – ₹1.5 Cr</li>
                <li>Banker: Bank of Maharashtra</li>
                <li>GST No: 27AFLPG6365A1ZK</li>
                <li>GST Partner: Kartik Hemkant Gowardhan</li>
              </ul>
            </div>
          </div>

          <div className="bg-zinc-100 rounded-2xl p-6 shadow-inner">
            <h2 className="text-xl font-semibold text-emerald-700 mb-4">Our Mission</h2>
            <p className="text-zinc-700 leading-relaxed">
              To deliver dependable, durable, and high-performance industrial products with a commitment to innovation, consistency, and excellence. We aim to support industries across India by ensuring timely delivery and uncompromising quality.
            </p>
          </div>

          <div className="bg-zinc-100 rounded-2xl p-6 shadow-inner">
            <h2 className="text-xl font-semibold text-emerald-700 mb-4">Our Vision</h2>
            <p className="text-zinc-700 leading-relaxed">
              To be a leading manufacturer in the industrial components sector by continuously adapting to modern technologies while upholding our legacy of craftsmanship and integrity since 1968.
            </p>
          </div>

          <p className="text-emerald-700 font-medium pt-4 text-lg">
            Thank you for choosing <strong>Hansraj Industries</strong> as your manufacturing partner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
