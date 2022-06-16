import React from "react";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/solid";

const CreateItemButton = () => {
  return (
    <div className="fixed bottom-3 w-screen opacity-95">
      <div className="flex justify-around">
        <div className="flex justify-center pt-4 w-12 h-12 text-primary-text rounded-full self-center gap-2 px-2 bg-primary item-center">
          <Link href="/upload">
            <PlusCircleIcon className="h-8" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateItemButton;
