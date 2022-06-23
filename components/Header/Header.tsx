import Link from "next/link";
import { useRouter } from "next/router";
import BurgerMenu from "../../public/menu.svg";
import ProfileIcon from "../../public/profile.svg";
import HomeIcon from "../../public/home.svg";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  let pagename = router.asPath;
  let showBack = true;

  // add logic for chat later
  if (pagename === "/#" || pagename === "/" || pagename === "") {
    showBack = false;
    pagename = "Dashboard";
  } else if (pagename === "/useritems") {
    showBack = true;
    pagename = "My Offers";
  } else if (pagename === "/upload") {
    showBack = true;
    pagename = "Create offer";
  } else if (pagename.includes("trade")) {
    pagename = "Trade";
  } else {
    showBack = true;
    if (pagename.includes("item")) {
      pagename = router.asPath
        .split("title=")[1]
        .split("&")[0]
        .replace("+", " ");
    } else {
      showBack = true;
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
          <ProfileIcon className="text-primary-text" width="34" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
