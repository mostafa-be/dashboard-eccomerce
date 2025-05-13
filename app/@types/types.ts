/**
 * Represents an image with a public ID and URL.
 */
export type Image = {
  public_id: string;
  url: string;
};

/**
 * Represents a product category.
 */
export type category = {
  _id: string;
  name: string;
  thumbnail: Image;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Represents a product collection.
 */
export type Collection = {
  _id: string;
  name: string;
  thumbnail: Image;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Represents a product tag.
 */
export type Tag = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Represents a product brand.
 */
export type Brand = {
  _id: string;
  name: string;
  logo: Image;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Represents a color option for a product.
 */
export type Color = {
  _id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Represents a size option for a product.
 */
export type Size = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Represents a product with its details.
 */
export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  estimatedPrice: number;
  quantityOriginal: number;
  quantity: number;
  categories: category;
  collections: Collection;
  brand: Brand;
  discount: number;
  date: Date;
  tags: Tag[];
  colors: Color[];
  sizes: Size[];
  images: Image[];
  ratings?: number;
};

/**
 * Represents a user with their details.
 */
export type User = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  avatar: Image;
  role: string;
  functionality: string;
  isVerified: boolean;
  isBlocked: boolean;
  address: object[];
  cart: {
    product: Product;
    color: object;
    size: object;
    quantity: number;
    price: number;
  }[];
  wishlist: object[];
  compared: object[];
  orders: Order[];
};

/**
 * Represents an expense with its details.
 */
export type Expense = {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  department: string;
  user: User;
  notes?: string;
  status: string;
};

/**
 * Represents an order with its details.
 */
export type Order = {
  _id: string;
  invoiceId: string;
  user: User;
  method: string;
  paidAt: Date;
  orderItems: {
    product: Product;
    color: Color;
    size: Size;
    quantity: number;
    price: number;
  }[];
  shippingInfo: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  orderStatus: string;
  totalPrice: number;
  createBy: User;
};

/**
 * Represents a tag blog post with its details.
 */

export type TagBlog = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Represents a tag blog post with its details.
 */

export type CategoryBlog = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Represents a blog post with its details.
 */
export type Blog = {
  _id: string;
  title: string;
  subDescription: string;
  description: string;
  category: CategoryBlog;
  tags: TagBlog[];
  numViews: number;
  isLiked: boolean;
  isDisliked: boolean;
  likes: User[];
  dislikes: User[];
  thumbnail: Image;
  author: User;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Represents a Banner post with its details.
 */
export type Banner = {
  _id: string;
  title: string;
  subdescription: string;
  product: Product;
  imageDesktop: Image;
  imageMobile: Image;
  isActive: boolean;
  isHomePage: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Represents a FAQ (Frequently Asked Question) with its details.
 */
export type Faq = {
  _id: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Represents a policy with its details.
 */

export type Policy = {
  _id: string;
  type: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
