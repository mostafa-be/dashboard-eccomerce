"use client";
import React from "react";
import { SideBar, SideBarItem } from "./SideBar/SideBar";
import {
  BookOpenText,
  ChartSpline,
  LayoutDashboard,
  FileText,
  Users,
  Bolt,
} from "lucide-react";

const SideBarDasboard = () => {
  const [expanded, setExpanded] = React.useState<boolean>(true);
  return (
    <SideBar expanded={expanded} setExpanded={setExpanded}>
      <SideBarItem
        icon={<LayoutDashboard size={25} />}
        text="Dashboard"
        active={true}
        links={false}
        url={"dashboard"}
        alert={false}
      />
      <SideBarItem
        icon={<ChartSpline size={25} />}
        text="Projects"
        active={false}
        links={true}
        alert={false}
        groupLinks={[
          {
            text: "New Project",
            url: "dashboard/projects/new-project",
            active: false,
          },
          {
            text: "Projects List",
            url: "dashboard/projects/projects-list",
            active: false,
          },
          {
            text: "Technologies",
            url: "dashboard/projects/technologies/technologies-list",
            active: false,
          },
        ]}
      />
      <SideBarItem
        icon={<BookOpenText size={25} />}
        text="Enquiries"
        active={false}
        links={false}
        url={"dashboard/enquiries"}
        alert={false}
      />
      <SideBarItem
        icon={<FileText size={25} />}
        text="Reports"
        active={false}
        links={false}
        url={"dashboard/reports"}
        alert={false}
      />
      <SideBarItem
        icon={<Users size={25} />}
        text="Team"
        active={false}
        links={false}
        url={"dashboard/team"}
        alert={false}
      />
      <hr className="w-full my-2" />
      <SideBarItem
        icon={<Bolt size={25} />}
        text="settings"
        active={false}
        links={false}
        url={"dashboard/settings"}
        alert={false}
      />
      <SideBarItem
        icon={<Bolt size={25} />}
        text="Help"
        active={false}
        links={false}
        url={"dashboard/help"}
        alert={false}
      />
    </SideBar>
  );
};

export default SideBarDasboard;
