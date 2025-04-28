"use client";
import React, { useState } from "react";
import { EditMode, ExportCSV, ExportPDF } from "./export";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import PeriodSelector from "./PeriodSelector";

type Props = {
  links: {
    name: string;
    url: string;
  }[];
  active: string;
  isPDF?: boolean;
  isCSV?: boolean;
  isEdit?: boolean;
  isPeriod?: boolean;
  dataPDF?: {
    title?: string;
    handleExportPDF: () => void;
  };
  dataCSV?: {
    title?: string;
    data: Record<string, unknown>[];
    headers: { key: string; label: string }[];
    filename: string;
  };
  dataPeriod?: {
    period: string;
    handlePeriodChange: (value: string) => void;
  };
  dataEdit?: {
    editMode?: boolean;
    setEditMode?: (editMode: boolean) => void;
  };
};

const ChangerExporter = ({
  links,
  active,
  isCSV = false,
  dataCSV,
  isPDF = false,
  dataPDF,
  isEdit = false,
  isPeriod = false,
  dataPeriod,
  dataEdit,
}: Props) => {
  const { title: titlePDF, handleExportPDF } = dataPDF || {};
  const { data, headers, filename, title: titleCSV } = dataCSV || {};
  const { period, handlePeriodChange } = dataPeriod || {};
  const { editMode, setEditMode } = dataEdit || {};
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useSelector(
    (state: { auth: { user: { name: string; role: string } } }) => state.auth
  );

  return (
    <div className="w-full flex flex-wrap gap-5 items-center justify-between">
      {/* Title and Breadcrumb Navigation */}
      <div className="w-max flex flex-col gap-1.5 justify-start">
        {active === "Dashboard" && (
          <h1 className="text-2xl font-semibold font-Poppins text-black dark:text-white capitalize">
            Good Morning, {user.name} 👋
          </h1>
        )}
        <div className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {links.length > 5 ? (
            <>
              {links.slice(0, 2).map((link, index) => (
                <React.Fragment key={link.url}>
                  <Link
                    href={link.url}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < 1 && <span className="text-gray-400 mx-1">/</span>}
                </React.Fragment>
              ))}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                >
                  More Links
                  <ChevronDown size={16} />
                </button>
                {showDropdown && (
                  <div className="absolute left-0 mt-2 bg-white dark:bg-black-100 shadow-lg rounded-md p-2 z-10">
                    {links.slice(2).map((link) => (
                      <Link
                        key={link.url}
                        href={link.url}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            links.map((link, index) => (
              <React.Fragment key={index}>
                <Link
                  href={link.url}
                  className="hover:text-blue-500 transition-colors"
                >
                  {link.name}
                </Link>

                <ChevronRight className="text-gray-400" size={15} />
              </React.Fragment>
            ))
          )}
          <span className="text-blue-500 cursor-not-allowed">{active}</span>
        </div>
      </div>

      {/* Export and Period Controls */}
      <div className="flex items-center gap-3">
        {isPeriod && (
          <PeriodSelector
            onChange={handlePeriodChange || (() => {})}
            period={period || ""}
          />
        )}
        {isCSV && (
          <ExportCSV
            title={titleCSV || "Export CSV"}
            filename={filename || "default-filename.csv"}
            data={data}
            headers={headers}
          />
        )}
        {isPDF && (
          <ExportPDF
            title={titlePDF || "Export PDF"}
            handleExportPDF={handleExportPDF || (() => {})}
          />
        )}
        {isEdit && (
          <EditMode
            editMode={editMode || false}
            setEditMode={setEditMode || (() => {})}
          />
        )}
      </div>
    </div>
  );
};

export default ChangerExporter;
