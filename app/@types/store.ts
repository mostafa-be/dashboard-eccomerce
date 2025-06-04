export interface IStore {
  /**
   * Unique identifier for the store (MongoDB ObjectId)
   */
  _id: string;
  /**
   * Unique store identifier (auto-generated, e.g. "store_xxxxxxx")
   */
  storeId: string;
  /**
   * Store name (required)
   */
  name: string;
  /**
   * Store domain (required, unique)
   */
  domain: string;
  /**
   * Store contact email (required)
   */
  email: string;
  /**
   * Store type (e.g. fashion, electronics, food)
   */
  storeType?: string;
  /**
   * Store category (more specific business category)
   */
  category?: string;
  /**
   * Store theme preference
   */
  theme?: string;
  /**
   * Store country
   */
  country?: string;
  /**
   * Store contact phone (optional)
   */
  phone?: string;
  /**
   * Store logo (Cloudinary or similar)
   */
  logo?: {
    public_id: string;
    url: string;
  };
  /**
   * Store address details
   */
  address?: {
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    country?: string;
    postalCode?: string;
  };
  /**
   * Store currency (default: USD)
   */
  currency?: string;
  /**
   * Store timezone (default: UTC)
   */
  timezone?: string;
  /**
   * Store description (optional)
   */
  description?: string;
  /**
   * Store owner (User reference, required)
   */
  owner: string;
  /**
   * Store staff (array of User references)
   */
  staff?: string[];
  /**
   * Store status (active, inactive, suspended, expired)
   */
  status?: "active" | "inactive" | "suspended" | "expired";
  /**
   * Store plan (default: basic)
   */
  plan?: string;
  /**
   * Store integration options with third-party services
   */
  integrations?: {
    stripe?: boolean;
    paypal?: boolean;
    googleAnalytics?: boolean;
    facebookPixel?: boolean;
    zapier?: boolean;
    mailchimp?: boolean;
    slack?: boolean;
    quickbooks?: boolean;
    printful?: boolean;
    klaviyo?: boolean;
    googleAds?: boolean;
    // Extensible for future integrations
    [key: string]: boolean | undefined;
  };
  /**
   * Store settings (theme, language, notifications, checkout, taxes, shipping, payment, etc.)
   */
  settings?: {
    theme?: string;
    language?: string;
    notifications?: {
      orderEmails?: boolean;
      abandonedCart?: boolean;
      lowStock?: boolean;
      newSignup?: boolean;
      // Extensible for future notification types
      [key: string]: boolean | undefined;
    };
    checkout?: {
      guestCheckout?: boolean;
      customFields?: boolean;
      requireLogin?: boolean;
      showShippingEstimates?: boolean;
      // Extensible for future checkout features
      [key: string]: boolean | undefined;
    };
    taxes?: {
      automatic?: boolean;
      regions?: string[];
      vatEnabled?: boolean;
      taxIncludedInPrices?: boolean;
      // Extensible for future tax settings
      [key: string]: boolean | string[] | undefined;
    };
    shipping?: {
      zones?: string[];
      providers?: string[];
      [key: string]: boolean | string[] | undefined;
    };
    payment?: {
      manualPayments?: boolean;
      testMode?: boolean;
      [key: string]: boolean | string[] | undefined;
    };
    [key: string]: any;      

  };
  /**
   * Custom domain (optional)
   */
  customDomain?: string;
  /**
   * List of installed app IDs or names
   */
  apps?: string[];
  /**
   * Storefront details and advanced configuration
   */
  storefront?: {
    title?: string;
    description?: string;
    logo?: {
      public_id: string;
      url: string;
    };
    favicon?: {
      public_id: string;
      url: string;
    };
    theme?: string;
    colorScheme?: string;
    customCSS?: string;
    customJS?: string;
    navigation?: {
      menu?: Array<{
        label: string;
        url: string;
        subMenu?: Array<{ label: string; url: string }>;
      }>;
      footerLinks?: Array<{ label: string; url: string }>;
    };
    heroSection?: {
      image?: string;
      headline?: string;
      subheadline?: string;
      ctaText?: string;
      ctaUrl?: string;
    };
    banners?: Array<{
      image: string;
      link?: string;
      alt?: string;
      position?: string;
    }>;
    featuredProducts?: string[];
    collections?: string[];
    testimonials?: Array<{
      name: string;
      message: string;
      avatar?: string;
    }>;
    blogEnabled?: boolean;
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string[];
      ogImage?: string;
    };
    analytics?: {
      googleAnalyticsId?: string;
      facebookPixelId?: string;
      customScripts?: string;
      mixpanelToken?: string;
      segmentWriteKey?: string;
      hotjarId?: string;
      matomoUrl?: string;
      matomoSiteId?: string;
      heapId?: string;
      amplitudeApiKey?: string;
      fullstoryOrgId?: string;
      clarityProjectId?: string;
      googleAdsId?: string; // Added Google Ads ID
      customEvents?: Array<{
        name: string;
        trigger: string;
        script: string;
      }>;
      enableEcommerceTracking?: boolean;
      enableConversionTracking?: boolean;
      enableUserTracking?: boolean;
      [key: string]: unknown;
    };
    languages?: string[];
    currencies?: string[];
    maintenanceMode?: boolean;
    passwordProtected?: boolean;
    customPages?: Array<{
      title: string;
      slug: string;
      content: string;
      visible: boolean;
    }>;
    [key: string]: unknown;
  };
  /**
   * Hosting configuration
   */
  hosting?: {
    status: "pending" | "active" | "failed" | "suspended";
    provider: string;
    url?: string;
    customDomain?: string;
    deployedAt?: Date;
    deploymentId?: string;
    error?: string;
    settings?: {
      template?: string;
      resources?: {
        cpu?: string;
        memory?: string;
        storage?: string;
      };
      environment?: Record<string, string>;
      [key: string]: any;
    };
    [key: string]: any;
  };
  /**
   * Timestamps
   */
  createdAt: Date;
  updatedAt: Date;
  /**
   * Store expiration date (optional)
   */
  expiredAt?: Date;
}
