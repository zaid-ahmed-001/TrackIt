import React from "react";

export const ImageStyle = ({
  image,
  size,
  top,
  left,
}: {
  image: string;
  size: string;
  top: string | number;
  left: string | number;
}): React.CSSProperties => {
  return {
    position: "absolute",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "50%",
    overflow: "hidden",
    width: size,
    height: size,
    top,
    left,
  };
};

export const MyComponent = () => {
  return (
    <div
      style={ImageStyle({
        image: "path-to-image.jpg",
        size: "100px",
        top: "50px",
        left: "50px",
      })}
    >
      {/* Content goes here */}
    </div>
  );
};
