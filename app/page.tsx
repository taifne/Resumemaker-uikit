"use client";
import React from "react";

import CardSVG, {

  TableSVG,
  TreeViewSvg,
  PopupSvg,
  AutocompleteSvg,
  ChartSvg,
  ButtonSvg,
  DrawerSvg,
  LoadingSpinner,
  ToastSvg,
  DropdownSVG,
  StepperSvg,
  PaginationSvg,
  TabSvg,

} from "./components/Icons";

import Card from "./components/Card/card";

export default function Home() {
  

  return ( 
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {[
    { title: "TreeView", description: "TreeView Component", icon: <TreeViewSvg /> },
    { title: "Popup", description: "Popup Component", icon: <PopupSvg /> },
    { title: "Autocomplete", description: "Autocomplete Component", icon: <AutocompleteSvg /> },
    { title: "Chart", description: "Chart Component", icon: <ChartSvg /> },
    { title: "Button", description: "Button Component", icon: <ButtonSvg /> },
    { title: "Drawer", description: "Drawer Component", icon: <DrawerSvg /> },
    { title: "Loading", description: "Loading Component", icon: <><LoadingSpinner /><LoadingSpinner /><LoadingSpinner /></> },
    { title: "Toast", description: "Toast Component", icon: <ToastSvg /> },
    { title: "Card", description: "Card Component", icon: <CardSVG /> },
    { title: "Dropdown", description: "Dropdown Component", icon: <DropdownSVG /> },
    { title: "Stepper", description: "Stepper Component", icon: <StepperSvg /> },
    { title: "Pagination", description: "Pagination Component", icon: <PaginationSvg /> },
    { title: "Tab", description: "Tab Component", icon: <TabSvg /> },
    { title: "Table", description: "Table Component", icon: <TableSVG /> },
  ].map((item, index) => (
    <Card key={index} title={item.title} description={item.description} linkUrl="#">
      <div className="flex justify-center items-center h-20">{item.icon}</div>
    </Card>
  ))}
</div>

  
  );
}
