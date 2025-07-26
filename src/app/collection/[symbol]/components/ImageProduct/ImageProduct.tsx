"use client";
import React, { useRef } from "react";

interface props {
  src: string;
}

const ImageProduct = ({ src }: props) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute("style");
  };

  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const image = imageRef.current as HTMLImageElement;
    const { naturalWidth, naturalHeight } = image;

    const offsetX = e.pageX - (rect.x + window.scrollX);
    const offsetY = e.pageY - (rect.y + window.scrollY);

    const top = offsetY * (1 - naturalHeight / rect.height);
    const left = offsetX * (1 - naturalWidth / rect.width);

    image.style.width = naturalWidth + "px";
    image.style.height = naturalHeight + "px";
    image.style.top = top + "px";
    image.style.left = left + "px";
    image.style.maxWidth = "unset";
  };

  return (
    <>
      <div
        className="relative w-full h-full pt-[100%] shadow overflow-hidden"
        onMouseLeave={handleRemoveZoom}
        onMouseMove={handleZoom}
      >
        <img
          src={src || ""}
          alt={"Product Image"}
          className="absolute top-0 left-0 h-full w-full bg-white object-cover "
          ref={imageRef}
        />
      </div>
    </>
  );
};

export default ImageProduct;
