import Link from "next/link";
import { useRouter } from "next/router";
import BurgerMenu from "../../public/menu.svg";
import BackIcon from "../../public/back2.svg";
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

  const [prevPathname, setPrevPathname] = useState("/");
  const [currPathname, setCurrPathname] = useState("");

  useEffect(() => {
    const storage = globalThis?.sessionStorage;
    const prevPath = storage.getItem("currentPath");
    storage.setItem("prevPath", prevPath as string);
    setPrevPathname(prevPath as string);
    storage.setItem("currentPath", globalThis.location.pathname);
    const currPath = storage.getItem("currentPath");
    setCurrPathname(currPath as string);
  }, [router.asPath]);

  return (
    <div className="flex sticky top-0 bg-primary text-primary-text w-screen h-16 place-items-center justify-between z-50">
      <div className="px-4">
        <Link href={prevPathname}>
          <a>
            <BackIcon
              className={showBack ? "text-primary-text" : "invisible"}
              width="32"
            />
          </a>
        </Link>
      </div>
      <h3 className="text-lg font-poppins">{pagename}</h3>
      <div className="px-4">
        <Link href="/useritems">
          <BurgerMenu className="text-primary-text" width="32" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
