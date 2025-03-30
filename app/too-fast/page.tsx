import React from "react";

const Page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-foreground">
        Whoa, Slow down a bit my friend
      </h1>
      <p className="mt-3 max-w-xl text-center text-foreground">
        Looks like you have been little too eager. We have put a temporary pause
        on your excitment. Chill for 1 minute and try again!
      </p>
    </main>
  );
};
export default Page;
