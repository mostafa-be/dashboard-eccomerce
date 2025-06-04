import {
  Shirt,
  Smartphone,
  Heart,
  Home,
  Utensils,
  Gift,
  BookOpen,
  Zap,
} from "lucide-react";
export const STORE_CATEGORIES = [
  {
    id: "fashion",
    name: "Fashion & Apparel",
    icon: <Shirt className="w-5 h-5" />,
    description: "Clothing, shoes, accessories, jewelry",
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: <Smartphone className="w-5 h-5" />,
    description: "Gadgets, computers, accessories",
  },
  {
    id: "beauty",
    name: "Beauty & Cosmetics",
    icon: <Heart className="w-5 h-5" />,
    description: "Skincare, makeup, fragrances",
  },
  {
    id: "home",
    name: "Home & Garden",
    icon: <Home className="w-5 h-5" />,
    description: "Furniture, decor, garden supplies",
  },
  {
    id: "food",
    name: "Food & Grocery",
    icon: <Utensils className="w-5 h-5" />,
    description: "Groceries, specialty foods",
  },
  {
    id: "toys",
    name: "Toys & Gifts",
    icon: <Gift className="w-5 h-5" />,
    description: "Games, toys, gift items",
  },
  {
    id: "digital",
    name: "Digital Products",
    icon: <Zap className="w-5 h-5" />,
    description: "Software, ebooks, courses",
  },
  {
    id: "books",
    name: "Books & Media",
    icon: <BookOpen className="w-5 h-5" />,
    description: "Books, music, movies",
  },
];
