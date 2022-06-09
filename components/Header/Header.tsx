import Link from "next/link";
import { useRouter } from "next/router";
import BurgerMenu from "../../public/menu.svg";

const Header = () => {
  const router = useRouter();
  let pagename = router.asPath;

  // add logic for chat later
  if (pagename === "/#" || pagename === "/" || pagename === "") {
    pagename = "Dashboard";
  } else if (pagename === "/upload") {
    pagename = "Create offer";
  } else {
    if (pagename.includes("item")) {
      pagename = router.asPath.split("title=")[1].split("&")[0];
    } else {
      pagename = pagename.slice(1);
      let str = pagename.split("");
      str[0] = str[0].toUpperCase();
      pagename = str.join("");
    }
  }
  return (
    <div className="fixed flex flex-row top-0 bg-primary text-primary-text w-full h-16 place-items-center justify-center">
      <h3 className="text-lg font-poppins">{pagename}</h3>
      {/* add burgermenu later */}
      <button className="fixed right-4">
        <Link href="/useritems">
          <BurgerMenu className="text-primary-text" width="32" />
        </Link>
      </button>
    </div>
  );
};

export default Header;
