import { HoverEffect } from "@repo/ui/components/ui/card-hover-effect";
import { steps } from "./steps";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";

export const HowItWorks = () => {
  const data = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create your Bodhi account in seconds.",
    },
    {
      step: 2,
      title: "Recharge Wallet",
      description: "Add funds to your wallet and receive Bodhi tokens.",
    },
    {
      step: 3,
      title: "Choose AI Model",
      description: "Select from our range of premium AI models.",
    },
    {
      step: 4,
      title: "Start Chatting",
      description: "Engage in AI conversations until your balance runs out.",
    },
  ];
  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 px-4 md:px-6 bg-gray-100 dark:bg-gray-800"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
