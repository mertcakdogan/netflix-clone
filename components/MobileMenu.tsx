import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline ">
          Anasayfa
        </div>
        <div className="px-3 text-center text-white hover:underline ">
          Diziler
        </div>
        <div className="px-3 text-center text-white hover:underline ">
          Filmler
        </div>
        <div className="px-3 text-center text-white hover:underline ">
          Yeni ve Popüler
        </div>
        <div className="px-3 text-center text-white hover:underline ">
          Listem
        </div>
        <div className="px-3 text-center text-white hover:underline ">
          Dillere Göre Göz At
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
