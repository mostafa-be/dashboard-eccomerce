/**
 * Image type: Represents an image with a public ID and URL.
 */
export type Image = {
  public_id: string;
  url: string;
};

/**
 * Category type: Represents a product category.
 */
export type category = {
  _id: string;
  name: string;
  thumbnail: Image;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Collection type: Represents a product collection.
 */
export type Collection = {
  _id: string;
  name: string;
  thumbnail: Image;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Tag type: Represents a product tag.
 */
export type Tag = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Brand type: Represents a product brand.
 */
export type Brand = {
  _id: string;
  name: string;
  logo: Image;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Color type: Represents a color option for a product.
 */
export type Color = {
  _id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Size type: Represents a size option for a product.
 */
export type Size = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Product type: Represents a product with its details.
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
 * Preferences type: User preferences for notifications, ads, etc.
 */
export type IPreferences = {
  newsletter?: boolean;
  personalizedAds?: boolean;
  notificationsEmail?: boolean;
  notificationsPush?: boolean;
  darkModeSchedule?: { start: string; end: string };
  autoPlayVideos?: boolean;
  languageLearningMode?: boolean;
  compactMode?: boolean;
  [key: string]: any;
};

/**
 * Accessibility type: Accessibility settings for the user.
 */
export type IAccessibility = {
  highContrast?: boolean;
  textToSpeech?: boolean;
  fontSize?: "small" | "medium" | "large";
  dyslexicFont?: boolean;
  screenReader?: boolean;
};

/**
 * NotificationsOptions type: Notification options for the user.
 */
export type INotificationsOptions = {
  marketing?: boolean;
  productUpdates?: boolean;
  reminders?: boolean;
};

/**
 * Privacy type: Privacy settings for the user.
 */
export type IPrivacy = {
  profileVisibility?: "public" | "private" | "friends";
  searchEngineIndexing?: boolean;
  showOnlineStatus?: boolean;
  allowFriendRequests?: boolean;
  allowMessagesFrom?: "everyone" | "friends" | "noone";
};

/**
 * Security type: Security settings for the user.
 */
export type ISecurity = {
  twoFactorAuth?: boolean;
  loginAlerts?: boolean;
  backupCodes?: string[];
  recentDevices?: { device: string; lastActive: Date }[];
  trustedDevices?: string[];
};

/**
 * Notification type: Represents a notification.
 */
export type INotification = {
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
};

/**
 * Integrations type: Connected integrations for the user.
 */
export type IIntegrations = {
  googleConnected?: boolean;
  amazonConnected?: boolean;
  facebookConnected?: boolean;
  githubConnected?: boolean;
  dropboxConnected?: boolean;
  jiraConnected?: boolean;
  slackConnected?: boolean;
  notionConnected?: boolean;
  zapierConnected?: boolean;
  trelloConnected?: boolean;
  asanaConnected?: boolean;
  mondayConnected?: boolean;
  shopifyConnected?: boolean;
  quickbooksConnected?: boolean;
  stripeConnected?: boolean;
  paypalConnected?: boolean;
  [key: string]: any;
};

/**
 * Account activity type: Tracks user account activity.
 */
export type IAccountActivity = {
  lastLogin?: Date;
  lastPasswordChange?: Date;
  accountCreated?: Date;
  lastProfileUpdate?: Date;
};

/**
 * User type: Represents a user with their details.
 */
export type User = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  avatar: Image;
  role: string;
  functionality: string;
  isActive: boolean;
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
  settings?: {
    theme?: string;
    language?: string;
    privacy?: IPrivacy;
    security?: ISecurity;
    integrations?: IIntegrations;
    preferences?: IPreferences;
    accessibility?: IAccessibility;
    accountActivity?: IAccountActivity;
    appearance?: {
      sidebarCollapsed?: boolean;
      colorScheme?: string;
      customBackground?: string;
    };
    notificationsOptions?: INotificationsOptions;
    timeZone?: string;
    currency?: string;
    languageLearning?: {
      enabled?: boolean;
      targetLanguage?: string;
    };
    [key: string]: any;
  };
  wishlist: object[];
  compared: object[];
  orders: Order[];
};

/**
 * Expense type: Represents an expense with its details.
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
 * Order type: Represents an order with its details.
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
 * TagBlog type: Represents a tag for a blog post.
 */
export type TagBlog = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * CategoryBlog type: Represents a category for a blog post.
 */
export type CategoryBlog = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Blog type: Represents a blog post with its details.
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
 * Banner type: Represents a banner post with its details.
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
 * Faq type: Represents a FAQ (Frequently Asked Question).
 */
export type Faq = {
  _id: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Policy type: Represents a policy with its details.
 */
export type Policy = {
  _id: string;
  type: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Notification type: Represents a notification with its details.
 */
export type Notification = {
  _id: string;
  title: string;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
