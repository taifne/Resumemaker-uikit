import React, { ReactNode } from "react";

type CardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  imagePosition?: "top" | "bottom" | "background";
  linkUrl?: string;
  buttonText?: string;
  variant?: "elevated" | "outline" | "ghost";
  colorScheme?: "primary" | "secondary" | "neutral" | "custom";
  hoverEffect?: "scale" | "shadow" | "gradient" | "none";
  shadow?: "sm" | "md" | "lg" | "xl" | "none";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  border?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  buttonVariant?: "solid" | "outline" | "ghost";
};

const Card = ({
  title,
  description,
  imageUrl,
  imagePosition = "top",
  linkUrl,
  buttonText = "Learn More",
  variant = "elevated",
  colorScheme = "primary",
  hoverEffect = "scale",
  shadow = "lg",
  rounded = "md",
  border = false,
  onClick,
  children,
  className = "",
  imageClassName = "",
  contentClassName = "",
  buttonVariant = "solid",
}: CardProps) => {
  const variants = {
    elevated: "bg-white",
    outline: "border-2 border-current",
    ghost: "bg-transparent",
  };

  const colorSchemes = {
    primary: "text-blue-900",
    secondary: "text-purple-900",
    neutral: "text-gray-800",
    custom: "",
  };

  const hoverEffects = {
    scale: "hover:scale-[1.02]",
    shadow: "hover:shadow-xl",
    gradient: "hover:bg-gradient-to-br from-white via-gray-50 to-white",
    none: "",
  };

  const shadows = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    none: "",
  };

  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full",
  };

  const buttonVariants = {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-blue-600 hover:bg-blue-50",
  };

  const isImageBackground = imagePosition === "background";
  const hasInteractiveElement = linkUrl || onClick;

  return (
    <article
      className={`relative overflow-hidden transition-all duration-300 ease-in-out 
        ${variants[variant]} 
        ${colorSchemes[colorScheme]} 
        ${hoverEffects[hoverEffect]} 
        ${shadows[shadow]} 
        ${roundedStyles[rounded]} 
        ${border ? "border border-gray-200" : ""} 
        ${isImageBackground ? "min-h-64" : ""} 
        ${hasInteractiveElement ? "cursor-pointer" : ""} 
        ${className}`}
      onClick={onClick}
      role={hasInteractiveElement ? "button" : "article"}
      aria-label={hasInteractiveElement ? title : undefined}
    >
      {imageUrl && !isImageBackground && (
        <img
          src={imageUrl}
          alt={title}
          className={`w-full object-cover transition-opacity duration-300 hover:opacity-90 
            ${imagePosition === "top" ? "rounded-t-lg" : ""} 
            ${imagePosition === "bottom" ? "rounded-b-lg" : ""} 
            ${imageClassName}`}
          style={{
            height: imagePosition === "bottom" ? "auto" : "200px",
            order: imagePosition === "bottom" ? 1 : 0,
          }}
        />
      )}

      {isImageBackground && (
        <div className="absolute inset-0 z-0">
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover ${imageClassName}`}
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        </div>
      )}

      <div
        className={`relative z-10 flex flex-col h-full p-6 ${
          isImageBackground ? "text-white" : ""
        } ${contentClassName}`}
      >
        <header className="mb-4">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-current/80">{description}</p>
        </header>

        {children && <section className="mt-2 mb-4">{children}</section>}

        {linkUrl && (
          <footer className="mt-auto pt-4">
            <a
              href={linkUrl}
              className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium 
                transition-colors duration-200 ${roundedStyles[rounded]} 
                ${buttonVariants[buttonVariant]}`}
              role="button"
            >
              {buttonText}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </footer>
        )}
      </div>
    </article>
  );
};

export default React.memo(Card);