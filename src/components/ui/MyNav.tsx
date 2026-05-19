import { Film, ChevronDown, Search, Moon } from "lucide-react";

let MyNav = () => {
  return (
    <nav className="flex w-full h-[60px] px-4 items-center justify-center">
      <div className="flex justify-between w-[1280px] h-[36px]">
        <div className="flex items-center gap-2">
          <Film width={20} height={20} stroke="#4338CA"></Film>
          <h2 className="text-[#4338CA] text-4 italic Inter font-bold leading-[20px] tracking-[0.32px]">
            Movie Z
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex w-[97px] h-[36px] py-2 px-4 justify-center items-center gap-2 rounded-[8px] border-[1px] border-solid border-[#E4E4E7]">
            <ChevronDown width={20} height={20}></ChevronDown>
            <h3>Genre</h3>
          </div>
          <div className="w-[379px] h-[36px] px-3 flex items-center gap-2.5 rounded-[8px] border-[1px] border-solid border-[#E4E4E7]">
            <Search width={16} height={16} opacity={0.5}></Search>
            <input placeholder="Search.." className="w-full" type="text" />
          </div>
        </div>

        <div className="flex items-center w-[36px] h-[36px] px-2 py-4 gap-2 rounded-[10px] border-[1px] border-solid border-[#E4E4E7] shadow-[1px 2px 0 rgba(0, 0, 0, 0.05]">
          <Moon></Moon>
        </div>
      </div>
    </nav>
  );
};

export default MyNav;
