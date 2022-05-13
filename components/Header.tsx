interface Props {
  pagename: string;
}

const Header = () => {
  const pagename = "Dashboard";
  return (
    <div className="fixed top-0 bg-primary text-primary-text w-full h-16 text-center p-4">
      <h3 className="text-base font-poppins">{pagename}</h3>
    </div>
  );
};

export default Header;
