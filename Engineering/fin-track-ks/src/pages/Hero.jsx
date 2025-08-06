import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10 text-center">
      {/* Title and Tagline */}
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-700">FinTrack</h1>
      <p className="mt-2 text-base sm:text-lg text-gray-600">
        Track your finances with ease.
      </p>

      {/* Bouncing ₹100 Circles */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-16 h-10 bg-blue-500 text-white flex items-center justify-center rounded-lg animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            ₹100
          </div>
        ))}
      </div>

      {/* Get Started Button */}
      <Link 
      to = "/dashboard"
      className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300">
        Get Started
      </Link>

      {/* Meet the Maker Section */}
      <div className="mt-16 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold">Meet the Maker</h2>
        <p className="mt-2 text-lg font-medium text-gray-800">
          Kshitij K. Sawant
        </p>
        <p className="text-gray-600 italic text-sm">
          Developer | Educator | Tech Explorer
        </p>

        {/* Testimonial */}
        <blockquote className="mt-4 text-gray-500">
          "Building tools that simplify lives, one line of code at a time."
        </blockquote>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-blue-600 text-xl">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a href="mailto:youremail@example.com" aria-label="Email">
            <FaEnvelope />
          </a>
          <a
            href="https://yourportfolio.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
          >
            <FaLink />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
