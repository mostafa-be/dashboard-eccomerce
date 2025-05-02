export type User = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  functionality: string;
  isVerified: boolean;
  isBlocked: boolean;
  address: [];
  cart: [];
  wishlist: [];
  compared: [];
  orders: [];
};

export type Expense = {
  _id: string; // Unique identifier for the expense
  title: string; // Expense title (e.g., "Office Rent")
  amount: number; // Expense amount
  category: string; // Category (e.g., Rent, Utilities, Supplies)
  date: Date; // Date of the expense
  department: string; // Department responsible for the expense (e.g., HR, IT)
  user: User; // User who created the expense
  notes?: string; // Additional notes (optional)
  status: string; // Status of the expense (e.g., Pending, Approved, Rejected)
};
