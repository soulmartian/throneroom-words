
function Header({ levelNumber }) {
    return (
      <div className="Header">
        #{("" + levelNumber).padStart(4, '0')}
      </div>
    );
  }
  
  export default Header;
  