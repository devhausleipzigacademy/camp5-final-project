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
    <div className="fixed top-0 bg-primary text-primary-text w-full h-16 text-center p-4">
      <h3 className="text-base font-poppins">{pagename}</h3>
    </div>
  );
};

export default Header;

// header title has to change dynamically
// if route = "/" then Dashboard
// if route = "/{pageName}/.." then {pageName}
