// This component is used in useritems page and links to the upload page
import React from "react";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/solid";

const CreateItemButton = () => {
  return (
    <Link href="/upload">
      <PlusCircleIcon className="h-16" />
    </Link>
  );
};

export default CreateItemButton;
