import Link from "next/link";
import { useRouter } from "next/router";
import BurgerMenu from "../../public/menu.svg";
import HomeIcon from "../../public/home.svg";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { useRequestStore } from "../../stores/requestStore";

const Header = () => {
  const router = useRouter();
  let pagename = router.asPath;
  const { requests } = useRequestStore();

  // add logic for chat later
  if (pagename === "/#" || pagename === "/" || pagename === "") {
    pagename = "Dashboard";
  } else if (pagename === "/useritems") {
    pagename = "My Offers";
  } else if (pagename === "/upload") {
    pagename = "Create offer";
  } else if (pagename.includes("trade")) {
    pagename = "Trade";
  } else {
    if (pagename.includes("item")) {
      pagename = router.asPath
        .split("title=")[1]
        .split("&")[0]
        .replace("+", " ");
    } else {
      pagename = pagename.slice(1);
      let str = pagename.split("");
      str[0] = str[0].toUpperCase();
      pagename = str.join("");
    }
  }

  return (
    <div className="flex sticky top-0 font-medium tracking-wide bg-primary text-primary-text w-screen h-16 place-items-center justify-between z-50">
      <div className="px-4">
        <Link href="/">
          <a>
            <HomeIcon className="text-primary-text" width="28" />
          </a>
        </Link>
      </div>
      <h3 className="text-lg font-poppins">{pagename}</h3>
      <div className="px-4">
        <Link href="/useritems">
          <div className="flex">
            <BurgerMenu className="text-primary-text" width="32" />
            {requests > 0 ? (
              <div className="h-3 w-3 absolute top-4 right-4 rounded-full bg-error">
                <p className="text-[3px] text-BG">{requests}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
