import './style.css';
import Button from '@mui/material/Button';
import { IoIosSearch } from 'react-icons/io';

export default function Search() {
  return (
    <div className="searchBox w-[100%] h-[50px] bg-black rounded-[32px] relative p-2 px-4">
      <input
        type="text"
        placeholder="Search"
        className="w-full h-[36px] focus:outline-none bg-none bg-inherit p-2 text-[15px]"
      ></input>

      <Button className="!absolute top-[8px] right-[4px] z-10 !w-[42px] !min-w-[36px] h-[36px] p-0 !rounded-full !text-[#f5f5f5]">
        <IoIosSearch color="#fff" className="text-blue-400 text-[20px]" />
      </Button>
    </div>
  );
}
