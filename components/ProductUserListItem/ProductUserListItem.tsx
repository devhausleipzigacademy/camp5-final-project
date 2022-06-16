import clsx from "clsx";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";

interface ProductUserListItemProps {
  key: number;
  title: string;
  imgSrc: string;
  id: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  selected: boolean;
}

const ProductUserListItem = ({
  key,
  title,
  imgSrc,
  id,
  onClick,
  selected,
}: ProductUserListItemProps) => {
  return (
    <>
      <div
        key={key}
        id={id}
        className={clsx(
          !selected
            ? "flex space-x-2 items-center opacity-50 hover:opacity-100 cursor-pointer"
            : "flex space-x-2 items-center opacity-100 cursor-pointer"
        )}
        onClick={onClick}
      >
        <Image alt="" src={imgSrc} width={50} height={50} />
        <div>{title}</div>
      </div>
      <div className="h-[1px] bg-BG-text rounded-md opacity-25"></div>
    </>
  );
};

export default ProductUserListItem;
