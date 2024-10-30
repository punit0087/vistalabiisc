import React, { useState, useRef, useEffect } from "react";

interface DropdownItem {
  id: number;
  name: string;
  url: string;
}

interface Props {
  title: string;
  items: DropdownItem[];
}

const DynamicDropdown: React.FC<Props> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="text-gray-400 dropdown-container relative w-48"
      ref={dropdownRef}
    >
      <div
        className="dropdown-header cursor-pointer py-1"
        onClick={toggleDropdown}
      >
        {isOpen ? "▲" : "▼"}
        <b className="ml-1 text-sm">{title}</b>
      </div>
      {isOpen && (
        <div className="dropdown-list relative w-full max-h-32 overflow-y-auto scrollbar-custom bg-black mt-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="dropdown-item px-2 py-1 text-gray-500 hover:text-white font-extralight text-xs"
            >
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicDropdown;
