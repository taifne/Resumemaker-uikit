import React, { memo } from "react";

export interface BreadcrumbItem {
  label: string;
  link?: string;
  icon?: React.ReactNode;
  /** Unique identifier for the item */
  id?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string | React.ReactNode;
  className?: string;
  linkClass?: string;
  separatorClass?: string;
  activeClass?: string;
  iconClass?: string;
  /** Custom React component for navigation links, e.g., React Router's Link */
  LinkComponent?: React.ElementType;
  /** Prop name for the URL in the LinkComponent (default: "href") */
  linkComponentProp?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = memo(({
  items,
  separator = "/",
  className = "flex items-center space-x-2 text-sm text-gray-600",
  linkClass = "text-blue-500 hover:text-blue-700",
  separatorClass = "mx-2 text-gray-400",
  activeClass = "font-semibold text-gray-800",
  iconClass = "mr-1",
  LinkComponent = "a",
  linkComponentProp = "href",
}) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ul className="flex items-center">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          const Element = item.link && !isLastItem ? LinkComponent : "span";
          const linkProps = { [linkComponentProp]: item.link };

          return (
            <li key={item.id || item.label} className="flex items-center">
              {item.icon && (
                <span className={iconClass}>{item.icon}</span>
              )}
              <Element
                {...(Element === LinkComponent ? linkProps : {})}
                className={!isLastItem ? linkClass : activeClass}
                {...(isLastItem ? { "aria-current": "page" } : {})}
              >
                {item.label}
              </Element>
              {!isLastItem && (
                <span
                  className={separatorClass}
                  role="separator"
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export default Breadcrumb;