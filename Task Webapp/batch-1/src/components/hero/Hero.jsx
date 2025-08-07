import React from "react";
import pattern from "../../assets/G2.png";

const Hero = () => {
  const handleScroll = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden pt-12">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{ backgroundImage: `url(${pattern})` }}
      />

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center mb-4 mt-10">
        <p className="text-sm text-blue-500 bg-blue-200 px-4 py-1 rounded-full font-medium shadow-md">
          New Feature Launched!
        </p>
        <div className="flex justify-center gap-2 flex-wrap mt-6">
          {["T", "A", "S", "K", "D", "E", "S", "K"].map((char, index) => (
            <div
              key={index}
              className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-blue-900 text-blue-100
                font-bold text-2xl rounded-md shadow-lg transition-all duration-300 ease-in hover:scale-110 
                hover:bg-blue-200 hover:text-blue-500 hover:duration-500 hover:ease-out"
            >
              {char}
            </div>
          ))}
        </div>

        <section className="mt-10 w-full max-w-6xl mx-auto overflow-hidden rounded-lg sm:grid sm:grid-cols-2 sm:items-center">
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="text-center sm:text-left">
              <h2
                className=" text-3xl font-bold text-gray-900 md:text-3xl"
                style={{ fontFamily: "cursive" }}
              >
                Focus.Plan.Complete
              </h2>
              <p className="hidden text-gray-600 md:mt-4 md:block">
                Task desk helps you to stay focus by managing task , setting
                priorities and organizing everything in one place . boost
                productivity effortlessly
              </p>
              <div className="mt-4 md:mt-8">
                <a
                  href="#"
                  className="inline-block rounded bg-blue-600 px-8 py-3 text-sm font-medium
                 text-white hover:bg-blue-900 transition"
                >
                  Get Started Today
                </a>
              </div>
            </div>
          </div>

          <img
            src="https://www.shutterstock.com/shutterstock/videos/3456457401/thumb/1.jpg?ip=x480"
            alt="Scroll Target"
            className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] md:h-[calc(100%_-_2rem)] 
          sm:rounded-ss-[30px] md:rounded-ss-[60px]"
          />
        </section>

        <section className="h-[50%] w-[50%] mt-10 bg-blue-50 py-16 px-4 text-center border-3 border-blue-900 rounded-xl shadow-md">
          {/*About the maker section*/}

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              About the Maker
            </h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              user personal bio max 500 char as per choice
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <button className="inline-block rounded bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700 transition">
                github
              </button>
              <button className="inline-block rounded bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700 transition">
                linkedin
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Hero;
