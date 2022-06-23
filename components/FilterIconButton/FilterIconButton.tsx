import { AdjustmentsIcon } from "@heroicons/react/solid";

import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import { MapData } from "../../utils/types";

interface FilterIconButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    mapData: MapData;
}

export const FilterIconButton = ({ onClick }: FilterIconButtonProps) => {
    const [show, setShow] = useState<boolean>(true);
    return (
        <div
            className="w-12 h-12 z-20 absolute bottom-0 justify-end flex"
            onClick={() => setShow(false)}
        >
            <Link href="/search">
                <AdjustmentsIcon
                    className={
                        show
                            ? "text-primary-text bg-primary rounded-full p-2"
                            : "invisible"
                    }
                />
            </Link>
        </div>
    );
};
