import React, { memo } from "react";

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
  iconClass?: string;
  LinkComponent?: React.ElementType;
}

const Breadcrumb: React.FC<BreadcrumbProps> = memo(({
  items,
  separator = "›",
  className = "flex items-center space-x-2 text-sm text-gray-600",
  linkClass = "text-blue-500 hover:text-blue-700",
  separatorClass = "mx-2 text-gray-400",
  activeClass = "font-semibold text-gray-800",
  iconClass = "mr-1",
  LinkComponent = "a",
}) => {
  return (
    <nav aria-label="Breadcrumb" className={`py-3 ${className}`}>
      <ul className="flex items-center">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          const Element = item.link && !isLastItem ? LinkComponent : "span";

          return (
            <li key={item.label} className="flex items-center">
              {item.icon && (
                <span className={`${iconClass}`}>{item.icon}</span>
              )}
              <Element
                href={item.link}
                className={`text-sm ${
                  !isLastItem ? linkClass : activeClass
                }`}
              >
                {item.label}
              </Element>
              {!isLastItem && (
                <>
                  <span className={`${separatorClass} text-sm`} aria-hidden="true">
                    {separator}
                  </span>
                  <span className="sr-only">/</span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export default Breadcrumb;