import React from "react";

const AboutUs = () => {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-center">About NovaGoods</h1>

        <p className="text-lg mb-6">
          Welcome to <strong>NovaGoods</strong>, your go-to destination for high-quality products at affordable prices. 
          Our mission is to provide a seamless shopping experience for our customers with a wide range of products.
        </p>

        <p className="text-lg mb-6">
          At NovaGoods, we value transparency, quality, and customer satisfaction above all else. 
          Our team is dedicated to sourcing the best products and delivering them directly to your doorstep.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Customer-first approach</li>
          <li>High-quality products</li>
          <li>Fast and reliable shipping</li>
          <li>Ethical sourcing and sustainability</li>
          <li>Continuous improvement and innovation</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="text-lg mb-6">
          Our team consists of passionate professionals dedicated to creating an amazing shopping experience. 
          We believe in collaboration, transparency, and making a positive impact through our work.
        </p>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">© 2026 NovaGoods Enterprises, LLC. All Rights Reserved.</p>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
