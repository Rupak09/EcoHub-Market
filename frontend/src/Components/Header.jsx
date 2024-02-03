import logo from '../assets/logomain.png' // Adjust the path based on where you placed the file

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Logo" style={{ height: 50 }} /> {/* Adjust styling as needed */}
    </header>
  );
};

export default Header;
