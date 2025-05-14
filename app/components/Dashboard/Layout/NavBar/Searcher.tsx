import { Order } from "@/app/@types/types";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

/**
 * Searcher Component
 * Provides a modern search input for searching orders by ID (string).
 * On mobile, clicking the icon opens a dialog for searching.
 * Shows a filtered list of orders matching the search.
 */
const Searcher = () => {
  const [search, setSearch] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const { data } = useGetAllOrdersQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const orders: Order[] = data?.orders || [];

  // Handler for search input change (accepts string IDs)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Filter orders by invoiceId (case-insensitive, partial match)
  const filteredOrders = search
    ? orders.filter((order) =>
        order?.invoiceId?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Desktop Search Input */}
      <div className="hidden md:block relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600/90 dark:text-blue-400/90 transition-colors"
        />
        <input
          type="search"
          name="search"
          id="search"
          title="Search Order by Invoice ID"
          placeholder="Search order by invoice ID..."
          value={search}
          onChange={handleChange}
          className="h-11 w-80 lg:w-96 bg-gradient-to-r from-blue-100 via-white to-blue-50 dark:from-blue-900 dark:via-white/95 dark:to-blue-950 pl-10 pr-4 outline-none rounded-xl shadow-mda border border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-500 placeholder:text-base placeholder:text-blue-600/80 dark:placeholder:text-blue-300/80 transition-all"
          autoComplete="off"
        />
        {/* Show filtered orders dropdown */}
        {search && filteredOrders.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 bg-white dark:bg-black-100 border border-blue-200 dark:border-blue-800 rounded-lg shadow z-10 max-h-60 overflow-auto">
            {filteredOrders.map((order) => (
              <li
                key={order._id}
                className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition flex flex-col rounded-lg mb-1"
              >
                <Link
                  title="View Order"
                  href={`/en/dashboard/orders/${order._id}`}
                  className="font-mono text-blue-700 dark:text-blue-300 text-base font-semibold hover:underline"
                >
                  Invoice: {order.invoiceId}
                </Link>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Customer:{" "}
                  <span className="font-medium">
                    {order.user?.name || "Unknown"}
                  </span>
                </span>
                <span className="text-sm text-green-700 dark:text-green-400 font-semibold">
                  Total: {order.totalPrice ? `$${order.totalPrice}` : "N/A"}
                </span>
              </li>
            ))}
          </ul>
        )}
        {search && filteredOrders.length === 0 && (
          <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-black-100 border border-blue-200 dark:border-blue-800 rounded-lg shadow z-10 px-4 py-2 text-gray-500 dark:text-gray-400">
            No matching orders found.
          </div>
        )}
      </div>

      {/* Mobile Search Icon (shows dialog on click) */}
      <div className="block md:hidden">
        <button
          type="button"
          aria-label="Open search"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shadow hover:bg-blue-200 dark:hover:bg-blue-800 transition"
          onClick={() => setShowDialog(true)}
        >
          <Search size={22} />
        </button>
        {showDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-black-100 rounded-xl shadow-lg p-6 w-11/12 max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                onClick={() => setShowDialog(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="flex items-center gap-2 mb-4">
                <Search
                  size={22}
                  className="text-blue-600 dark:text-blue-400"
                />
                <span className="font-semibold text-lg text-blue-700 dark:text-blue-200">
                  Search Order by ID
                </span>
              </div>
              <input
                type="search"
                autoFocus
                value={search}
                onChange={handleChange}
                placeholder="Enter invoice ID..."
                className="w-full h-11 px-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-100 via-white to-blue-50 dark:from-blue-900 dark:via-white/95 dark:to-blue-950 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-base placeholder:text-blue-600/80 dark:placeholder:text-blue-300/80 transition-all"
              />
              {/* Show filtered orders dropdown in dialog */}
              {search && filteredOrders.length > 0 && (
                <ul className="mt-2 bg-white dark:bg-black-100 border border-blue-200 dark:border-blue-800 rounded-lg shadow z-10 max-h-60 overflow-auto">
                  {filteredOrders.map((order) => (
                    <li
                      key={order._id}
                      className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition flex flex-col rounded-lg mb-1"
                    >
                      <a
                        href={`/dashboard/orders/order/${order._id}`}
                        className="font-mono text-blue-700 dark:text-blue-300 text-base font-semibold hover:underline"
                      >
                        Invoice: {order.invoiceId}
                      </a>
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        Customer:{" "}
                        <span className="font-medium">
                          {order.user?.name || "Unknown"}
                        </span>
                      </span>
                      <span className="text-sm text-green-700 dark:text-green-400 font-semibold">
                        Total:{" "}
                        {order.totalPrice ? `$${order.totalPrice}` : "N/A"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {search && filteredOrders.length === 0 && (
                <div className="mt-2 bg-white dark:bg-black-100 border border-blue-200 dark:border-blue-800 rounded-lg shadow z-10 px-4 py-2 text-gray-500 dark:text-gray-400">
                  No matching orders found.
                </div>
              )}
              <div className="mt-4 flex flex-col gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  <strong>Commands:</strong>
                </span>
                <ul className="text-xs text-gray-600 dark:text-gray-300 list-none space-y-1">
                  <li className="flex items-center gap-2">
                    <kbd className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono border border-gray-300 dark:border-gray-700 shadow">
                      Enter
                    </kbd>
                    <span>Search order by ID</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <kbd className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono border border-gray-300 dark:border-gray-700 shadow">
                      ⇧⌘Q
                    </kbd>
                    <span>Close search dialog</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <kbd className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono border border-gray-300 dark:border-gray-700 shadow">
                      ID
                    </kbd>
                    <span>Accepts any order ID (string)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Searcher;
