import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  pagename: string;
}

const Header = () => {
  const router = useRouter();
  let pagename = router.asPath;

  if (pagename === "/") {
    pagename = "Dashboard";
  } else {
    pagename = pagename.slice(1);
    let str = pagename.split("");
    str[0] = str[0].toUpperCase();
    pagename = str.join("");
  }
  return (
    <div className="fixed flex flex-row top-0 bg-primary text-primary-text w-full h-16 place-items-center justify-center">
      <h3 className="text-base font-poppins">{pagename}</h3>
      <button className="fixed right-4">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.3335 8H26.6668M5.3335 13.3333H26.6668M5.3335 18.6667H26.6668M5.3335 24H26.6668"
            stroke="#F7F5F6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Header;

// header title has to change dynamically
// if route = "/" then Dashboard
// if route = "/{pageName}/.." then {pageName}
