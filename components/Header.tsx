interface Props {
  pagename: string;
}

const Header = () => {
  const pagename = "Dashboard";
  return (
    <div className="fixed top-0 bg-primary text-primary-text">
      <h3>{pagename}</h3>
    </div>
  );
};

export default Header;
