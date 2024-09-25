import logo from "../../assets/react.svg";
export const Logo = ({ className = "h-9 w-9" }: { className?: string }) => {
  return <img title='logo' src={logo} className={className} />; 
};
