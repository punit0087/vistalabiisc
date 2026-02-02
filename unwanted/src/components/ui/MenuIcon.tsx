import { useState } from "react";

const MenuIcon = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div
      className={`menu-icon ${
        checked ? "active" : ""
      } transform scale-150 cursor-pointer relative w-12 h-12 `}
    >
      <input
        className="menu-icon__cheeckbox absolute w-full h-full cursor-pointer z-10 opacity-0"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <div className="relative w-5.5 h-3 m-auto top-0 right-0 left-0 bottom-0">
        <span className="block absolute w-full h-0.5 bg-[var(--bar-bg)] rounded transition-all duration-200 ease-[cubic-bezier(0.1, 0.82, 0.76, 0.965)] top-0"></span>
        <span className="block absolute w-full h-0.5 bg-[var(--bar-bg)] rounded transition-all duration-200 ease-[cubic-bezier(0.1, 0.82, 0.76, 0.965)] bottom-0"></span>
      </div>
    </div>
  );
};

export default MenuIcon;
