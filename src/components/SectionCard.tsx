import React from "react";

interface SectionCardProps {
  title: string;
  descriptions: string[];
  buttonText: string;
  buttonDataGroup?: string;
  className?: string;
  position?: "left" | "right";
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  descriptions,
  buttonText,
  buttonDataGroup = "15097",
  className = "",
  position = "left",
}) => {
  const positionClasses =
    position === "left"
      ? "sticky top-8 bottom-8 left-12 w-1/4"
      : "sticky top-8 right-12 float-right w-1/4";

  return (
    <div
      className={`${positionClasses} md:px-12 py-6 bg-white flex flex-col items-start justify-start space-y-2 shadow-xl rounded-xs ${className}`}
    >
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="space-y-2">
        {descriptions.map((description, index) => (
          <p key={index} className="text-sm leading-relaxed">
            {description}
          </p>
        ))}
      </div>
      <button
        type="button"
        className="tpos-add-to-cart self-start py-2 px-4 mt-6 rounded-xs text-primary border border-primary/70 hover:border-primary"
        data-tpos-group={buttonDataGroup}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SectionCard;
