import React, { ReactNode } from "react";

type CardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
  buttonText?: string;
  shadow?: boolean;
  rounded?: boolean;
  border?: boolean;
  onClick?: () => void;
  children?: ReactNode;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  linkUrl,
  buttonText = "Learn More",
  shadow = true,
  rounded = true,
  border = false,
  onClick,
  children,
}) => {
  return (
    <div
      className={`transition-transform transform hover:scale-105 p-4 flex flex-col ${shadow ? "shadow-lg" : ""} ${rounded ? "rounded-lg" : ""} ${border ? "border border-gray-300" : ""} h-full`}
      onClick={onClick}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-40 object-cover ${rounded ? "rounded-t-lg" : ""}`}
        />
      )}
      <div className="flex flex-col justify-between flex-grow p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
          {children}
        </div>
        {linkUrl && (
          <a
            href={linkUrl}
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
