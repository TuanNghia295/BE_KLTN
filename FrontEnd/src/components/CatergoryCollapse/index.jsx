import { Button } from '@mui/material';
import { useState } from 'react';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
export default function CategoryCollapse() {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);
  // Hàm đóng mở submenu
  const openSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };
  // Hàm đóng mở inner submenu
  const openInnerSubmenu = (index) => {
    if (innerSubmenuIndex === index) {
      setInnerSubmenuIndex(null);
    } else {
      setInnerSubmenuIndex(index);
    }
  };

  return (
    <>
      <div className="scroll">
        <ul className="w-full">
          <li className="list-none flex items-center relative flex-col">
            <Link to={'/listing/fashion'} className="w-full">
              <Button className="w-full !text-left !justify-start !px-3 !text-textPrimary  hover:!bg-grayf5">
                Fashion
              </Button>
            </Link>
            {submenuIndex === 0 ? (
              <CiSquareMinus
                className="absolute top-[8px] right-[15px] text-[20px] cursor-pointer"
                onClick={() => openSubmenu(0)}
              />
            ) : (
              <CiSquarePlus
                className="absolute top-[8px] right-[15px] text-[20px] cursor-pointer"
                onClick={() => openSubmenu(0)}
              />
            )}
            {/* Danh sách con */}

            {submenuIndex === 0 && (
              <ul className="inner_submenu  w-full pl-3 ">
                <li className="list-none relative">
                  <Link to={'/listing/men'} className="!hover:!text-primary !transition">
                    <Button className="w-full hover:!bg-grayf5 !text-left !justify-start !px-3 !text-textPrimary">
                      Men
                    </Button>
                  </Link>
                </li>

                <li className="list-none relative">
                  <Link to={'/listing/women'} className="!hover:!text-primary !transition">
                    <Button className="w-full hover:!bg-grayf5 !text-left !justify-start !px-3 !text-textPrimary">
                      Women
                    </Button>
                  </Link>
                </li>

                <li className="list-none relative">
                  <Link to={'/listing/children'} className="!hover:!text-primary !transition">
                    <Button className="w-full hover:!bg-grayf5 !text-left !justify-start !px-3 !text-textPrimary">
                      Kids
                    </Button>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="list-none flex items-center relative flex-col">
            <Link to={'/listing/fashion'} className="w-full">
              <Button className="w-full !text-left !justify-start !px-3 !text-textPrimary  hover:!bg-grayf5">
                Fashion
              </Button>
            </Link>
            {submenuIndex === 1 ? (
              <CiSquareMinus
                className="absolute top-[8px] right-[15px] text-[20px] cursor-pointer"
                onClick={() => openSubmenu(1)}
              />
            ) : (
              <CiSquarePlus
                className="absolute top-[8px] right-[15px] text-[20px] cursor-pointer"
                onClick={() => openSubmenu(1)}
              />
            )}
            {/* Danh sách con */}

            {submenuIndex === 1 && (
              <ul className="inner_submenu  w-full pl-3 ">
                <li className="list-none relative">
                  <Link to={'/listing/men'} className="!hover:!text-primary !transition">
                    <Button className="w-full hover:!bg-grayf5 !text-left !justify-start !px-3 !text-textPrimary">
                      Men
                    </Button>
                  </Link>
                </li>

                <li className="list-none relative">
                  <Link to={'/listing/women'} className="!hover:!text-primary !transition">
                    <Button className="w-full hover:!bg-grayf5 !text-left !justify-start !px-3 !text-textPrimary">
                      Women
                    </Button>
                  </Link>
                </li>

                <li className="list-none relative">
                  <Link to={'/listing/children'} className="!hover:!text-primary !transition">
                    <Button className="w-full hover:!bg-grayf5 !text-left !justify-start !px-3 !text-textPrimary">
                      Children
                    </Button>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
