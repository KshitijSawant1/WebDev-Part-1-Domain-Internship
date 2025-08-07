import React from "react";
import Hero from "./components/hero/Hero";
import Signin from "./components/register/Signin";
import Signup from "./components/register/Signup";
import PageNotFound from "./components/pages/PageNotFound";
import Playground from "./components/pages/Playground";

const App = () => {
  return (
    <div>
      hello this is app
      <Hero />
      <Signin />
      <Signup />
      <PageNotFound />
      <Playground />
    </div>
  );
};

export default App;
