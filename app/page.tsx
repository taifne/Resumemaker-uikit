"use client";
import React, { useState } from "react";
import Table, { Column } from "./components/table";
import BarChart from "./components/Chart";
import Calendar from "./components/Calendar";
import { Tab, Tabs } from "./components/Tab";
import { Popup } from "./components/Popup";
import { Loading } from "./components/Loading";
import { Toast } from "./components/Toast";
import NodeNetwork from "./components/Node";
import { Dropdown } from "./components/Dropdown";
import CardSVG, {
  HomeIcon,
  SearchIcon,
  UserIcon,
  BellIcon,
  TableSVG,
  TreeViewSvg,
  PopupSvg,
  AutocompleteSvg,
  ChartSvg,
  ButtonSvg,
  DrawerSvg,
  LoadingSvg,
  ToastSvg,
  DropdownSVG,
  StepperSvg,
  PaginationSvg,
  TabSvg,
  AutocompleteIcon,
} from "./components/Icons";
import Drawer from "./components/Drawer";
import Pagination from "./components/Pagnition";
import Treeview from "./components/TreeView";
import Stepper from "./components/Stepper";
import Autocomplete from "./components/Autocomplete";
import Card from "./components/Card/card";
import Sidebar, { SidebarItem } from "./components/SideBar";
import { FaCogs, FaHome, FaInfoCircle, FaPhone } from "react-icons/fa";
import Breadcrumb, { BreadcrumbItem } from "./components/Breadcrumb";
import Navbar from "./components/NavBar";

const data = [
  {
    id: 1,
    name: "John Doe",
    age: 28,
    city: "New York",
    job: "Developer",
    salary: 50000,
    country: "USA",
    department: "Engineering",
    status: "Active",
    dateJoined: "2020-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 34,
    city: "Los Angeles",
    job: "Designer",
    salary: 45000,
    country: "USA",
    department: "Design",
    status: "Inactive",
    dateJoined: "2019-03-12",
  },
  {
    id: 3,
    name: "Sam Brown",
    age: 22,
    city: "Chicago",
    job: "Manager",
    salary: 60000,
    country: "USA",
    department: "Sales",
    status: "Active",
    dateJoined: "2018-07-25",
  },
  {
    id: 4,
    name: "Emily White",
    age: 25,
    city: "San Francisco",
    job: "Developer",
    salary: 52000,
    country: "USA",
    department: "Engineering",
    status: "Active",
    dateJoined: "2021-05-19",
  },
  {
    id: 5,
    name: "Michael Green",
    age: 30,
    city: "Boston",
    job: "Designer",
    salary: 47000,
    country: "USA",
    department: "Design",
    status: "Inactive",
    dateJoined: "2019-11-03",
  },
  {
    id: 6,
    name: "Lucy Black",
    age: 27,
    city: "Austin",
    job: "Manager",
    salary: 58000,
    country: "USA",
    department: "Sales",
    status: "Active",
    dateJoined: "2017-02-18",
  },
  {
    id: 7,
    name: "Robert Blue",
    age: 29,
    city: "Miami",
    job: "Developer",
    salary: 51000,
    country: "USA",
    department: "Engineering",
    status: "Inactive",
    dateJoined: "2020-10-30",
  },
  {
    id: 8,
    name: "Anna Yellow",
    age: 32,
    city: "Dallas",
    job: "Designer",
    salary: 48000,
    country: "USA",
    department: "Design",
    status: "Active",
    dateJoined: "2018-06-24",
  },
  {
    id: 9,
    name: "David Purple",
    age: 40,
    city: "Seattle",
    job: "Manager",
    salary: 65000,
    country: "USA",
    department: "Sales",
    status: "Active",
    dateJoined: "2016-09-09",
  },
  {
    id: 10,
    name: "Sarah Red",
    age: 26,
    city: "Denver",
    job: "Developer",
    salary: 53000,
    country: "USA",
    department: "Engineering",
    status: "Inactive",
    dateJoined: "2021-01-13",
  },
  {
    id: 11,
    name: "James Gray",
    age: 38,
    city: "Phoenix",
    job: "Designer",
    salary: 46000,
    country: "USA",
    department: "Design",
    status: "Active",
    dateJoined: "2015-04-08",
  },
  {
    id: 12,
    name: "Sophia Orange",
    age: 24,
    city: "San Diego",
    job: "Manager",
    salary: 59000,
    country: "USA",
    department: "Sales",
    status: "Active",
    dateJoined: "2020-08-21",
  },
  {
    id: 13,
    name: "Daniel Violet",
    age: 33,
    city: "Portland",
    job: "Developer",
    salary: 54000,
    country: "USA",
    department: "Engineering",
    status: "Inactive",
    dateJoined: "2018-11-15",
  },
  {
    id: 14,
    name: "Megan Pink",
    age: 29,
    city: "Chicago",
    job: "Designer",
    salary: 49000,
    country: "USA",
    department: "Design",
    status: "Active",
    dateJoined: "2019-09-04",
  },
  {
    id: 15,
    name: "William Cyan",
    age: 37,
    city: "Miami",
    job: "Manager",
    salary: 62000,
    country: "USA",
    department: "Sales",
    status: "Inactive",
    dateJoined: "2017-12-27",
  },
  {
    id: 16,
    name: "Chloe Indigo",
    age: 30,
    city: "Los Angeles",
    job: "Developer",
    salary: 51000,
    country: "USA",
    department: "Engineering",
    status: "Active",
    dateJoined: "2018-04-19",
  },
  {
    id: 17,
    name: "Lucas Gold",
    age: 23,
    city: "Dallas",
    job: "Designer",
    salary: 47000,
    country: "USA",
    department: "Design",
    status: "Active",
    dateJoined: "2020-02-25",
  },
  {
    id: 18,
    name: "Grace Silver",
    age: 35,
    city: "Austin",
    job: "Manager",
    salary: 60000,
    country: "USA",
    department: "Sales",
    status: "Active",
    dateJoined: "2016-07-09",
  },
  {
    id: 19,
    name: "Oliver Bronze",
    age: 26,
    city: "Seattle",
    job: "Developer",
    salary: 52000,
    country: "USA",
    department: "Engineering",
    status: "Inactive",
    dateJoined: "2021-03-14",
  },
  {
    id: 20,
    name: "Lily Brown",
    age: 31,
    city: "San Francisco",
    job: "Designer",
    salary: 49000,
    country: "USA",
    department: "Design",
    status: "Active",
    dateJoined: "2019-02-10",
  },
];

const columns: Column<{
  id: number;
  name: string;
  age: number;
  city: string;
  job: string;
  salary: number;
  country: string;
  department: string;
  status: string;
  dateJoined: string;
}>[] = [
  { key: "id", label: "ID", sortable: true, resizable: true },
  {
    key: "name",
    label: "Name",
    sortable: true,
    editable: true,
    resizable: true,
  },
  { key: "age", label: "Age", sortable: true, editable: true, resizable: true },
  { key: "city", label: "City", filterable: true, resizable: true },
  {
    key: "job",
    label: "Job",
    filterable: true,
    editable: true,
    resizable: true,
  },
  {
    key: "salary",
    label: "Salary",
    sortable: true,
    editable: true,
    resizable: true,
  },
  { key: "country", label: "Country", filterable: true },
  { key: "department", label: "Department", filterable: true },
  { key: "status", label: "Status", filterable: true },
  {
    key: "dateJoined",
    label: "Date Joined",
    sortable: true,
    type: "date",
    editable: true,
  },
];

const columnWidths = {
  checkbox: 50,
  id: 50, // Custom width for ID column
  name: 200, // Custom width for Name column
  age: 80, // Custom width for Age column
  city: 150, // Custom width for City column
  job: 120, // Custom width for Job column
  salary: 100, // Custom width for Salary column
  country: 100, // Custom width for Country column
  department: 150, // Custom width for Department column
  status: 100, // Custom width for Status column
  dateJoined: 180, // Custom width for Date Joined column
};
const chartData = [
  { label: "Jan", value: 10 },
  { label: "Feb", value: 20 },
  { label: "Mar", value: 30 },
  { label: "Apr", value: 40 },
  { label: "May", value: 50 },
  { label: "Jun", value: 60 },
  { label: "Jul", value: 70 },
  { label: "Aug", value: 80 },
  { label: "Sep", value: 90 },
  { label: "Oct", value: 100 },
];

export default function Home() {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "info" | "warning"
  >("info");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Example: Total of 10 pages
  const treeData = [
    {
      id: "1",
      label: "Root",
      children: [
        { id: "2", label: "Child 1" },
        {
          id: "3",
          label: "Child 2",
          children: [
            { id: "4", label: "Grandchild 1" },
            { id: "5", label: "Grandchild 2" },
          ],
        },
      ],
    },
  ];

  const handleNodeSelect = (id: string) => {
    console.log("Selected node ID:", id);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleItemSelect = (label: string) => {
    console.log(`${label} selected`);
  };

  const drawerItems = [
    { label: "Item 1", onClick: () => handleItemSelect("Item 1") },
    { label: "Item 2", onClick: () => handleItemSelect("Item 2") },
    { label: "Item 3", onClick: () => handleItemSelect("Item 3") },
  ];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const showToastMessage = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000); // Simulate a loading state for 3 seconds
  };

  const handleSelectedRowsChange = (newSelectedRows: Set<number>) => {
    console.log("Selected rows:", Array.from(newSelectedRows)); // Convert Set to Array
    setSelectedRows(newSelectedRows);
  };
  const nodes = [
    { id: "Node 1", x: 100, y: 100 },
    { id: "Node 2", x: 300, y: 100 },
    { id: "Node 3", x: 200, y: 250 },
    { id: "Node 4", x: 400, y: 250 },
  ];

  const links = [
    { source: "Node 1", target: "Node 2" },
    { source: "Node 2", target: "Node 3" },
    { source: "Node 3", target: "Node 4" },
  ];
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelect = (options: string[]) => {
    setSelectedOptions(options);
    console.log("Selected options:", options);
  };
  const options = [
    {
      label: "Option 1",
      value: "option1",
      icon: "https://via.placeholder.com/20",
    },
    {
      label: "Option 2",
      value: "option2",
      icon: "https://via.placeholder.com/20",
    },
    {
      label: "Option 3",
      value: "option3",
      icon: "https://via.placeholder.com/20",
    },
    { label: "Option 4", value: "option4" },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Step 1" },
    { label: "Step 2", optional: true },
    { label: "Step 3" },
    { label: "Step 4" },
  ];

  const handleStepChange = (stepIndex: number) => {
    if (stepIndex <= activeStep + 1) {
      setActiveStep(stepIndex);
    }
  };

  const [selectedValue, setSelectedValue] = useState("");

  const suggestions = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grapes",
  ];

  const handleSelecta = (value: string) => {
    setSelectedValue(value);
  };
  const sidebarItems: SidebarItem[] = [
    { label: "AutoComplete", icon: <AutocompleteIcon />, link: "/autocomplete" },
    { label: "About", icon: <FaInfoCircle />, link: "/about" },
    { label: "Services", icon: <FaCogs />, link: "/services" },
    { label: "Contact", icon: <FaPhone />, link: "/contact" },
  ];
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: "/dashboard" },
    { label: "Analytics", link: "/dashboard/analytics" },
  ];

  return ( <div className="flex h-screen overflow-hidden">
   
   <Sidebar
  items={sidebarItems}
  theme={{
    background: "bg-slate-900",
    text: "text-slate-100",
    activeBackground: "bg-indigo-600",
    activeText: "text-white",
    hoverBackground: "bg-slate-700",
    border: "border-slate-700"
  }}
  expandedWidth="280px"
  collapsedWidth="90px"
  enableTouchGestures
  customSubMenuIcon={<UserIcon />}
/>
   
    <div className="flex-grow flex-column h-full overflow-auto">
     
      <div className="w-full bg-red-400 h-fit relative ">
          {" "}
          <Navbar>
            <Breadcrumb
              items={breadcrumbItems}
              separator=">"
              linkClass="text-blue-600 hover:text-blue-800"
              activeClass="text-gray-800 font-semibold"
              separatorClass="mx-2 text-gray-500"
            />
          </Navbar>
        </div>
        <div className="flex flex-wrap justify-center gap-6 w-full mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
  {[
    { title: "TreeView", description: "TreeView Component", icon: <TreeViewSvg /> },
    { title: "Popup", description: "Popup Component", icon: <PopupSvg /> },
    { title: "Autocomplete", description: "Autocomplete Component", icon: <AutocompleteSvg /> },
    { title: "Chart", description: "Chart Component", icon: <ChartSvg /> },
    { title: "Button", description: "Button Component", icon: <ButtonSvg /> },
    { title: "Drawer", description: "Drawer Component", icon: <DrawerSvg /> },
    { title: "Loading", description: "Loading Component", icon: <><LoadingSvg /><LoadingSvg /><LoadingSvg /></> },
    { title: "Toast", description: "Toast Component", icon: <ToastSvg /> },
    { title: "Card", description: "Card Component", icon: <CardSVG /> },
    { title: "Dropdown", description: "Dropdown Component", icon: <DropdownSVG /> },
    { title: "Stepper", description: "Stepper Component", icon: <StepperSvg /> },
    { title: "Pagination", description: "Pagination Component", icon: <PaginationSvg /> },
    { title: "Tab", description: "Tab Component", icon: <TabSvg /> },
    { title: "Table", description: "Table Component", icon: <TableSVG /> },
  ].map((item, index) => (
    <Card key={index} title={item.title} description={item.description} linkUrl="#">
      <div className="flex justify-center items-center h-16">{item.icon}</div>
    </Card>
  ))}
</div>

        </div>
     
    </div>
  </div>
  
  );
}
// {/* <div className="w-4/5"><Table
//       columns={columns}
//       data={data}
//       rowsPerPage={5}
//       selectedRows={selectedRows}
//       setSelectedRows={handleSelectedRowsChange}
//     />
//     </div>

//     <div className="w-1/5">

//     <BarChart data={chartData} title="Monthly Sales" orientation="vertical" />

//     <BarChart data={chartData} title="Monthly Sales (Horizontal)" orientation="horizontal" />

//     </div>
//     <div className="">
//     <Calendar />
//     </div>
//     <div className="App">
//     <Tabs>
//       <Tab label="Tab 1">
//       <Table
//       columns={columns}
//       data={data}
//       rowsPerPage={5}
//       selectedRows={selectedRows}
//       setSelectedRows={handleSelectedRowsChange}
//     />
//       </Tab>
//       <Tab label="Tab 2">
//       <BarChart data={chartData} title="Monthly Sales" orientation="vertical" />
//       </Tab>
//       <Tab label="Tab 3">
//       <BarChart data={chartData} title="Monthly Sales (Horizontal)" orientation="horizontal" />
//       </Tab>
//     </Tabs>
//   </div>

//   <div className="w-full">
//   <div className="min-h-screen flex items-center justify-center bg-gray-200">
//     <button
//       className="py-2 px-4 bg-green-500 text-white rounded-full"
//       onClick={() => setPopupOpen(true)}
//     >
//       Open Popup
//     </button>

//     <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)}>
//       <p>This is the content of the main popup!</p>
//     </Popup>
//   </div>
//   </div>
//   <div className="min-h-screen flex items-center justify-center bg-gray-100">
//     <button
//       className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md"
//       onClick={simulateLoading}
//     >
//       Simulate Loading
//     </button>

//     <Loading isLoading={isLoading} text="Loading, please wait..." />
//   </div> */}
//     {/* <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//     <button
//       onClick={() => showToastMessage('Operation was successful!', 'success')}
//       className="py-3 px-6 bg-green-500 text-white rounded-lg shadow-md mb-4"
//     >
//       Show Success Toast
//     </button>
//     <button
//       onClick={() => showToastMessage('Something went wrong.', 'error')}
//       className="py-3 px-6 bg-red-500 text-white rounded-lg shadow-md mb-4"
//     >
//       Show Error Toast
//     </button>
//     <button
//       onClick={() => showToastMessage('Here is some information.', 'info')}
//       className="py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md mb-4"
//     >
//       Show Info Toast
//     </button>
//     <button
//       onClick={() => showToastMessage('This is a warning!', 'warning')}
//       className="py-3 px-6 bg-yellow-500 text-white rounded-lg shadow-md mb-4"
//     >
//       Show Warning Toast
//     </button>

//     {showToast && (
//       <Toast
//         message={toastMessage}
//         type={toastType} // Pass the type here
//         onClose={() => setShowToast(false)}
//       />
//     )}
//   </div> */}
//     {/* <div className="App">
//     <h1>Simple Node Network</h1>
//     <NodeNetwork nodes={nodes} links={links} />
//   </div> */}
//     {/* <div className="flex space-x-6">
//       <HomeIcon className="w-6 h-6 text-indigo-600" />
//       <SearchIcon className="w-6 h-6 text-green-600" />
//       <UserIcon className="w-6 h-6 text-yellow-600" />
//       <BellIcon className="w-6 h-6 text-red-600" />
//     </div>
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//       {" "}
//       <div className="mt-4 text-lg font-semibold text-gray-700">
//         Selected:{" "}
//         {selectedOptions.length > 0 ? selectedOptions.join(", ") : "None"}
//       </div>
//       <Dropdown
//         options={options}
//         onSelect={handleSelect}
//         buttonLabel="Select Options"
//         isMultiSelect={true}
//       />
//     </div> */}

//       {/* <button
//         onClick={toggleDrawer}
//         className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
//       >
//         Open Drawer
//       </button>

//       <Drawer
//         isOpen={isDrawerOpen}
//         onClose={toggleDrawer}
//         items={drawerItems}
//       /> */}

//       <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Pagination Example</h1>

//       {/* Your content */}
//       <div className="mb-4">
//         <p>Currently on Page: {currentPage}</p>
//         {/* Display some content based on the current page */}
//       </div>

//       {/* Pagination component */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />
//     </div>
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Treeview Example</h1>
//       <Treeview data={treeData} onSelect={handleNodeSelect} />
//     </div>
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-8">Horizontal Stepper</h1>
//       <Stepper
//         activeStep={activeStep}
//         steps={steps}
//         onStepChange={handleStepChange}
//       />
//     </div>
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-4">Autocomplete Combo Box</h1>
//       <Autocomplete suggestions={suggestions} onSelect={handleSelecta} />
//       {selectedValue && (
//         <p className="mt-4 text-gray-700">
//           Selected Value: <strong>{selectedValue}</strong>
//         </p>
//       )} </div>
