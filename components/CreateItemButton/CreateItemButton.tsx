import React from "react";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/solid";

const CreateItemButton = () => {
  return (
    <div className="fixed bottom-6 w-screen ">
      <div className="flex justify-around">
        <div className="flex justify-center rounded-md self-center gap-2 px-2 border-solid border-primary border-2 bg-primary w-24 item-center">
          <Link href="/upload">
            <PlusCircleIcon className="h-8" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateItemButton;
