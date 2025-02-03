import { ShoppingBag } from "lucide-react";
import React from "react";

const Notification = () => {
  return (
    <div className="w-64 absolute rounded-lg top-12 left-1/2 -translate-x-1/2 bg-white shadow">
      <ul className="w-full px-3 py-3">
        <li className="w-full flex items-center py-3 px-3 bg-transparent hover:bg-slate-200/25 cursor-pointer rounded-lg">
          <div className="flex items-center">
            <ShoppingBag size={20} className="text-orange-600/70" />
          </div>
          <p className="text-sm text-black">Have a new order</p>
        </li>
      </ul>
    </div>
  );
};

export default Notification;
