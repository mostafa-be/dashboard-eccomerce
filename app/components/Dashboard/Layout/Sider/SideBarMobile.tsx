import {
  Bell,
  Box,
  ChartPie,
  ChevronDown,
  Dot,
  HandCoins,
  LayoutDashboard,
  MessagesSquare,
  Newspaper,
  Origami,
  PackageOpen,
  Settings,
  UsersRound,
  X,
} from "lucide-react";
import Link from "next/link";
import React, {
  createContext,
  JSX,
  useContext,
  useState,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useStoreContext } from "@/hooks/ExpiredProtected";

type Props = {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
  isRTL?: boolean;
};

const SidebarMobileContext = createContext({ isOpen: false, isRTL: false });

const SideBarMobile = ({ isOpen, setIsOpen, isRTL = false }: Props) => {
  const locale = useLocale();
  const pathname = usePathname();
  const currentDir = isRTL || locale === "ar" ? "rtl" : "ltr";

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside sidebar and overlay
      if (
        isOpen &&
        !target.closest(".sidebar-mobile") &&
        !target.closest(".sidebar-toggle-btn")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  // Close sidebar when navigating to a new page
  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [pathname, isOpen, setIsOpen]);

  // Animation variants
  const sidebarVariants = {
    open: {
      width: "18rem", // 72 (w-72)
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
    closed: {
      width: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  };

  const overlayVariants = {
    open: { opacity: 0.5 },
    closed: { opacity: 0 },
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-50" // Updated from z-20 to z-50
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        dir={currentDir}
        className="sidebar-mobile fixed top-0 bottom-0 md:hidden h-dvh bg-white dark:bg-black-100 z-[60] shadow-lg overflow-hidden" // Updated from z-30 to z-60
        style={{ [isRTL ? "right" : "left"]: 0 }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between px-4 py-5 border-b border-gray-100 dark:border-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <h5 className="text-2xl font-serif font-bold italic text-blue-650">
              Nextora
            </h5>
            <button
              type="button"
              className="sidebar-toggle-btn p-1.5 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4">
              <SidebarMobileContext.Provider value={{ isOpen, isRTL }}>
                <SidebarItems />
              </SidebarMobileContext.Provider>
            </nav>
          </div>

          {/* Footer */}
          <motion.div
            className="p-4 border-t border-gray-100 dark:border-gray-800 text-xs text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            &copy; {new Date().getFullYear()} Nextora Inc.
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
};

// Sidebar Items Component
const SidebarItems = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const { storeId } = useStoreContext();
  const t = useTranslations("dashboard.sidebar"); // Initialize translations for sidebar

  // Base URL for store dashboard
  const baseUrl = `/${locale}/store/${storeId}/dashboard`;

  const isLinkActive = (path: string) => {
    // Exact match for dashboard
    if (path === baseUrl && pathname === baseUrl) {
      return true;
    }

    // For other links, check if pathname starts with the URL (nested routes)
    return path !== baseUrl && pathname?.startsWith(path);
  };

  // Items animation variants
  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.ul className="space-y-2">
      <SideBarItemMobile
        icon={<LayoutDashboard size={20} />}
        text={t("dashboard")}
        active={!!isLinkActive(baseUrl)}
        links={false}
        url={baseUrl}
        alert={false}
        variants={itemVariants}
      />

      <SideBarItemMobile
        icon={<PackageOpen size={20} />}
        text={t("orders")}
        active={!!isLinkActive(`${baseUrl}/orders`)}
        links={false}
        url={`${baseUrl}/orders`}
        alert={false}
        variants={itemVariants}
      />

      <SideBarItemMobile
        icon={<HandCoins size={20} />}
        text={t("expenses")}
        active={!!isLinkActive(`${baseUrl}/expenses`)}
        links={false}
        url={`${baseUrl}/expenses`}
        alert={false}
        variants={itemVariants}
      />

      <SideBarItemMobile
        icon={<UsersRound size={20} />}
        text={t("customers")}
        active={!!isLinkActive(`${baseUrl}/customers`)}
        links={false}
        url={`${baseUrl}/customers`}
        alert={false}
        variants={itemVariants}
      />

      <SideBarItemMobile
        icon={<Box size={20} />}
        text={t("products.main")}
        active={!!pathname && pathname.includes(`${baseUrl}/products`)}
        links={true}
        alert={false}
        variants={itemVariants}
        groupLinks={[
          {
            text: t("products.list"),
            url: `${baseUrl}/products`,
            active:
              !!isLinkActive(`${baseUrl}/products`) &&
              !pathname.includes("/products/"),
          },
          {
            text: t("products.brands"),
            url: `${baseUrl}/products/brands`,
            active: !!isLinkActive(`${baseUrl}/products/brands`),
          },
          {
            text: t("products.collections"),
            url: `${baseUrl}/products/collections`,
            active: !!isLinkActive(`${baseUrl}/products/collections`),
          },
          {
            text: t("products.categories"),
            url: `${baseUrl}/products/categories`,
            active: !!isLinkActive(`${baseUrl}/products/categories`),
          },
          {
            text: t("products.colors"),
            url: `${baseUrl}/products/colors`,
            active: !!isLinkActive(`${baseUrl}/products/colors`),
          },
          {
            text: t("products.sizes"),
            url: `${baseUrl}/products/sizes`,
            active: !!isLinkActive(`${baseUrl}/products/sizes`),
          },
          {
            text: t("products.tags"),
            url: `${baseUrl}/products/tags`,
            active: !!isLinkActive(`${baseUrl}/products/tags`),
          },
        ]}
      />

      <SideBarItemMobile
        icon={<MessagesSquare size={20} />}
        text={t("enquiries")}
        active={!!isLinkActive(`${baseUrl}/enquiries`)}
        links={false}
        url={`${baseUrl}/enquiries`}
        alert={false}
        variants={itemVariants}
      />

      <SideBarItemMobile
        icon={<Bell size={20} />}
        text={t("notifications")}
        active={!!isLinkActive(`${baseUrl}/notifications`)}
        links={false}
        url={`${baseUrl}/notifications`}
        alert={false}
        variants={itemVariants}
      />

      <SideBarItemMobile
        icon={<ChartPie size={20} />}
        text={t("analytics")}
        active={!!isLinkActive(`${baseUrl}/analytics`)}
        links={false}
        url={`${baseUrl}/analytics`}
        alert={false}
        variants={itemVariants}
      />

      <SideBarItemMobile
        icon={<Newspaper size={20} />}
        text={t("blogs.main")}
        active={!!pathname && pathname.includes(`${baseUrl}/blogs`)}
        links={true}
        alert={false}
        variants={itemVariants}
        groupLinks={[
          {
            text: t("blogs.list"),
            url: `${baseUrl}/blogs`,
            active:
              !!isLinkActive(`${baseUrl}/blogs`) && !pathname.includes("/blogs/"),
          },
          {
            text: t("blogs.categories"),
            url: `${baseUrl}/blogs/categories`,
            active: !!isLinkActive(`${baseUrl}/blogs/categories`),
          },
          {
            text: t("blogs.tags"),
            url: `${baseUrl}/blogs/tags`,
            active: !!isLinkActive(`${baseUrl}/blogs/tags`),
          },
        ]}
      />

      <SideBarItemMobile
        icon={<ChartPie size={20} />}
        text={t("reports")}
        active={!!isLinkActive(`${baseUrl}/reports`)}
        links={false}
        url={`${baseUrl}/reports`}
        alert={false}
        variants={itemVariants}
      />

      <SideBarItemMobile
        icon={<Origami size={20} />}
        text={t("layout.main")}
        active={!!pathname && pathname.includes(`${baseUrl}/layout`)}
        links={true}
        alert={false}
        variants={itemVariants}
        groupLinks={[
          {
            text: t("layout.banners"),
            url: `${baseUrl}/layout/banners`,
            active: !!isLinkActive(`${baseUrl}/layout/banners`),
          },
          {
            text: t("layout.policies"),
            url: `${baseUrl}/layout/policies`,
            active: !!isLinkActive(`${baseUrl}/layout/policies`),
          },
          {
            text: t("layout.faqs"),
            url: `${baseUrl}/layout/faqs`,
            active: !!isLinkActive(`${baseUrl}/layout/faqs`),
          },
        ]}
      />

      <SideBarItemMobile
        icon={<Settings size={20} />}
        text={t("settings")}
        active={!!isLinkActive(`${baseUrl}/settings`)}
        links={false}
        url={`${baseUrl}/settings`}
        alert={false}
        variants={itemVariants}
      />
    </motion.ul>
  );
};

type PropsItemMobile = {
  icon: JSX.Element;
  text: string;
  active: boolean;
  alert: boolean;
  links: boolean;
  url?: string;
  groupLinks?: { url: string; text: string; active: boolean }[];
  variants?: any;
};

const SideBarItemMobile = ({
  icon,
  text,
  active,
  alert,
  links,
  groupLinks,
  url,
  variants,
}: PropsItemMobile) => {
  const { isOpen, isRTL } = useContext(SidebarMobileContext) as {
    isOpen: boolean;
    isRTL: boolean;
  };
  const [openLinks, setOpenLinks] = useState(false);

  // Content animation variants for child items
  const childVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
      },
    },
  };

  // Link item animation
  const linkItemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.li
      variants={variants}
      className={`
        relative font-medium rounded-lg transition-all
        ${
          active
            ? "bg-blue-650 text-white"
            : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800"
        }
      `}
    >
      {links ? (
        <>
          <div
            className="p-3 flex items-center justify-between cursor-pointer"
            onClick={() => setOpenLinks(!openLinks)}
          >
            <div className="flex items-center gap-3">
              {icon}
              <span className="truncate">{text}</span>
            </div>

            <motion.div
              animate={{ rotate: openLinks ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>

            {alert && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
            )}
          </div>

          <AnimatePresence initial={false}>
            {openLinks && groupLinks && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={childVariants}
                className="overflow-hidden bg-gray-50 dark:bg-gray-800/50 rounded-md mx-3 mb-2"
              >
                {groupLinks.map((item, index) => (
                  <motion.div key={index} variants={linkItemVariants}>
                    <Link
                      href={item.url}
                      className={`
                        flex items-center py-2 px-4 text-sm rounded-md
                        ${
                          item.active
                            ? "text-blue-600 font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        }
                      `}
                    >
                      <Dot className="w-4 h-4 mr-1" />
                      <span className="truncate">{item.text}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link href={url || "#"} className="p-3 flex items-center gap-3">
          {icon}
          <span className="truncate">{text}</span>
          {alert && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
          )}
        </Link>
      )}
    </motion.li>
  );
};

export default SideBarMobile;
