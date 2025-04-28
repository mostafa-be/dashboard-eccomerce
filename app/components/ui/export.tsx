import { CloudDownload, FileDown, Pencil, SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CSVLink } from "react-csv";

type ExportPDFProps = {
  title?: string;
  handleExportPDF: () => void;
};

export const ExportPDF = ({
  title = "Export PDF",
  handleExportPDF,
}: ExportPDFProps) => {
  return (
    <div
      title={title}
      className="font-Poppins py-2.5 px-3.5 flex items-center cursor-pointer gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg rounded-lg transition-all duration-300"
      onClick={handleExportPDF}
    >
      <CloudDownload size={18} className="text-white text-sm font-semibold" />
      <span className="text-white text-sm">{title}</span>
    </div>
  );
};

type ExportCVSProps = {
  title: string;
  data: any;
  headers: any;
  filename: string;
};
export const ExportCSV = ({
  title = "Export CSV",
  data,
  headers,
  filename,
}: ExportCVSProps) => {
  return (
    <CSVLink data={data} headers={headers} filename={filename}>
      <div
        title={title}
        className="font-Poppins py-2.5 px-3.5 flex items-center cursor-pointer gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg rounded-lg transition-all duration-300"
      >
        <FileDown size={18} className="text-white text-sm font-semibold" />
        <span className="text-white text-sm">{title}</span>
      </div>
    </CSVLink>
  );
};

type EditModeProps = {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
};
export const EditMode = ({ editMode, setEditMode }: EditModeProps) => {
  return (
    <div
      title={editMode ? "Disable Edit" : "Enable Edit"}
      onClick={() => setEditMode(!editMode)}
      className="font-Poppins py-2.5 px-3.5 flex items-center cursor-pointer gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg rounded-lg transition-all duration-300"
    >
      <Pencil className="text-white" size={20} />
      <span className="text-white text-sm">
        {editMode ? "Disable Edit" : "Enable Edit"}
      </span>
    </div>
  );
};

type ButtonCreateProps = {
  title: string;
  url: string;
};
export const ButtonCreate = ({ title, url }: ButtonCreateProps) => {
  return (
    <div className="w-full flex items-center justify-end ">
    <Link
      href={url}
      title={title}
      className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
    >
      <SquarePen size={20} />
      <span className="text-[16px] font-[500]">{title}</span>
      </Link>
    </div>
  );
};

    