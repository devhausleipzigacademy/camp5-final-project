import clsx from "clsx";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";

interface ProductUserListItemProps {
  key: number;
  title: string;
  imgSrc: string;
}

const ProductUserListItem = ({
  key,
  title,
  imgSrc,
}: ProductUserListItemProps) => {
  const [selected, setSelected] = useState(false);

  function toggleSelect() {
    setSelected((prev) => !prev);
  }
  return (
    <>
      <div
        key={key}
        className={clsx(
          !selected
            ? "flex justify-between items-center opacity-50 hover:opacity-100 cursor-pointer"
            : "flex justify-between items-center opacity-100 cursor-pointer"
        )}
        onClick={() => toggleSelect}
      >
        <div>{title}</div>
        <Image alt="" src={imgSrc} width={50} height={50} />
      </div>
      <div className="h-[1px] bg-BG-text rounded-md opacity-25"></div>
    </>
  );
};

export default ProductUserListItem;
