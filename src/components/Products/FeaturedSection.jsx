import React from "react";
import {
  HiOutlineCreditCard,
  HiShoppingBag,
} from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const features = [
  {
    Icon: HiShoppingBag,
    title: "Free International Shipping",
    description: "On all orders over $100.00",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    Icon: HiArrowPathRoundedSquare,
    title: "45 Days Return",
    description: "Money back guarantee",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    Icon: HiOutlineCreditCard,
    title: "Secure Checkout",
    description: "100% secured checkout process",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
];

const FeaturedSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {features.map(({ Icon, title, description, color, bgColor }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center space-y-4 p-6 rounded-2xl hover:shadow-xl transition-shadow cursor-default"
          >
            <div
              className={`p-5 rounded-full ${bgColor} flex items-center justify-center shadow-md`}
            >
              <Icon className={`${color} w-10 h-10`} />
            </div>
            <h4 className="tracking-wider text-lg font-semibold uppercase text-gray-900">
              {title}
            </h4>
            <p className="text-gray-600 text-sm max-w-xs">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
