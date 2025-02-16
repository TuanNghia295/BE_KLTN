import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { IoClose } from 'react-icons/io5';
import { Button } from '@mui/material';
import { CiSquarePlus } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CiSquareMinus } from 'react-icons/ci';

const CategoryPannel = ({ isOpenCategory, toogleCategory }) => {
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

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="category-pannel">
      <h3 className="text-[18px] p-3 font-[500] flex items-center justify-between">
        Categories <IoClose className="cursor-pointer text-[20px] " onClick={toogleCategory} />
      </h3>

      {/*List category */}
      <div className="scroll">
        <ul className="w-full">
          <li className="list-none flex items-center relative flex-col">
            <Link to={'/fashion'} className="w-full">
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
                  <Link to={'/men'} className="!hover:!text-primary !transition">
                    <Button className="w-full hover:!bg-grayf5 !text-left !justify-start !px-3 !text-textPrimary">
                      Men
                    </Button>
                  </Link>
                </li>

                <li className="list-none relative">
                  <Link to={'/women'} className="!hover:!text-primary !transition">
                    <Button className="w-full hover:!bg-grayf5 !text-left !justify-start !px-3 !text-textPrimary">
                      Women
                    </Button>
                  </Link>
                </li>

                <li className="list-none relative">
                  <Link to={'/children'} className="!hover:!text-primary !transition">
                    <Button className="w-full hover:!bg-grayf5 !text-left !justify-start !px-3 !text-textPrimary">
                      Kids
                    </Button>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="list-none flex items-center relative flex-col">
            <Link to={'/fashion'} className="w-full">
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
                  <Link to={'/men'} className="!hover:!text-primary !transition">
                    <Button className="w-full hover:!bg-grayf5 !text-left !justify-start !px-3 !text-textPrimary">
                      Men
                    </Button>
                  </Link>
                </li>

                <li className="list-none relative">
                  <Link to={'/women'} className="!hover:!text-primary !transition">
                    <Button className="w-full hover:!bg-grayf5 !text-left !justify-start !px-3 !text-textPrimary">
                      Women
                    </Button>
                  </Link>
                </li>

                <li className="list-none relative">
                  <Link to={'/children'} className="!hover:!text-primary !transition">
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
    </Box>
  );

  return (
    <>
      <Drawer open={isOpenCategory}>{DrawerList}</Drawer>
    </>
  );
};

export default CategoryPannel;
