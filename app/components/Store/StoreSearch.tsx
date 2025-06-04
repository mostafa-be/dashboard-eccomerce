"use client";
/*
import React, { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import { useStoreSearchQuery } from '@/redux/features/stores/storesApi';
import { debounce } from 'lodash';

interface SearchProps {
  entityType?: 'products' | 'orders' | 'customers';
  placeholder?: string;
  onResultSelect?: (item: any) => void;
  className?: string;
}

export default function StoreSearch({ 
  entityType = 'products',
  placeholder = 'Search products...',
  onResultSelect,
  className = ''
}: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const pathname = usePathname();
  
  // Extract storeId from the current path
  const extractStoreId = useCallback(() => {
    const segments = pathname.split("/");
    const storeIndex = segments.findIndex((s) => s === "stores");
    return storeIndex >= 0 && segments.length > storeIndex + 1
      ? segments[storeIndex + 1]
      : null;
  }, [pathname]);
  
  const storeId = extractStoreId();

  // Skip query if search term is empty or too short
  const shouldSkipQuery = !searchTerm || searchTerm.length < 2 || !storeId;
  
  // Use the search query
  const { data, isLoading, error } = useStoreSearchQuery(
    { storeId, query: searchTerm, entityType },
    { skip: shouldSkipQuery }
  );
  
  // Handle input change with debounce
  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, 300);

  // Handle selecting a search result
  const handleSelect = (item: any) => {
    if (onResultSelect) {
      onResultSelect(item);
    }
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        {isLoading && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>
      
      {/* Search results dropdown *
      {!shouldSkipQuery && data && data.length > 0 && (
        <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 max-h-60 overflow-auto">
          <ul className="py-1">
            {data.map((item: any) => (
              <li 
                key={item.id} 
                onClick={() => handleSelect(item)}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className="flex items-center">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-8 h-8 object-cover rounded mr-2" 
                    />
                  )}
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200">{item.name}</div>
                    {entityType === 'products' && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ${item.price?.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* No results message 
      {!shouldSkipQuery && data && data.length === 0 && !isLoading && (
        <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 p-4">
          <p className="text-gray-500 dark:text-gray-400 text-center">No results found</p>
        </div>
      )}
      
      {/* Error message
      {error && (
        <div className="text-red-500 text-sm mt-1">
          Failed to search. Please try again.
        </div>
      )}
    </div>
  );
}
*/
