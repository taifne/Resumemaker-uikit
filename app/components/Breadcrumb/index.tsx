import React from "react";

export interface BreadcrumbItem {
  label: string;
  link?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string | React.ReactNode;
  className?: string;
  linkClass?: string;
  separatorClass?: string;
  activeClass?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = "›",
  className = "flex items-center space-x-2 text-sm text-gray-600",
  linkClass = "text-blue-500 hover:text-blue-700",
  separatorClass = "mx-2 text-gray-400",
  activeClass = "font-semibold text-gray-800",
}) => {
  return (
    <nav className={`py-3 ${className}`}>
      <ul className="flex items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.icon && <span className="mr-1">{item.icon}</span>}
            {item.link ? (
              <a href={item.link} className={`${linkClass} text-sm`}>
                {item.label}
              </a>
            ) : (
              <span className={`${activeClass} text-sm`}>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className={`${separatorClass} text-sm`}>{separator}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
