import { Link } from 'react-router-dom';
import logoWhiteTheme from '../../assets/logoWhiteTheme.jpg';
import Search from '../Search';
import Badge from '@mui/material/Badge';
import { styled, StyledEngineProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Favorite from '@mui/icons-material/Favorite';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Navigation from './Navigation';
import { useContext, useState } from 'react';
import { MyContext } from '../../App';
import { useStoreProvider } from '../../contexts/StoreProvider'
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
//Call API
import { logout } from '../../apis/authServices'


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const CustomTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'black',
    color: 'white',
  },
});

export default function Header() {
  const context = useContext(MyContext);
  const { userInfo, clearInfo } = useStoreProvider()

  //Handle Logout
  const handleLogout = async () => {
    await logout();
    clearInfo();
  }

  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  const toogleMobileMenu = () => setOpenMobileMenu(!openMobileMenu)
  
  return (
    <header className="bg-white">
      {/* Phần trên của header chính. Tạm gọi là affix header */}
      <div className="top-strip py-2 border-t-[1px] border-b-[1px] border-gray-250">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[14px] font-[400]">Get up to 50% off for the new season.</p>
            </div>

            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-2">
                <li className="list-none">
                  <Link to={'/help-center'} className="text-[13px] link font-[500] transition">
                    Help
                  </Link>
                </li>
                &nbsp;
                <li className="list-none">
                  <Link to={'/order-tracking'} className="text-[13px] link font-[500] transition">
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="header py-3 border-b-[1px] border-b-[1px] border-gray-250">
        <div className="container flex items-center justify-between">
          {/* logo */}
          <div className="col1 w-[80px] xl:w-[30%] items-center">
            <Link to={'/'} className="w-full">
              <img src={logoWhiteTheme} alt="Logo" className="xl:w-1/3 object-contain" />
            </Link>
          </div>

          {/* Thanh Search */}
          <div className="col2 md:w-full w-[45%]">
            <Search />
          </div>

          <div className="col3 w-full xl:w-[30%] flex items-center pl-7">
            <ul className="flex items-center justify-end gap-3 w-full">
              {/* Đăng nhập */}
              <li className="list-none block cursor-pointer">
              { userInfo ? (
                <>
                <div className='flex items-center text-[12px] gap-2' onClick={toogleMobileMenu}>
                  <div className='part1'>
                    <Avatar alt={userInfo.fullName} src="/static/images/avatar/1.jpg" />
                  </div>
                  <div className='part2 hidden xl:block'>
                    <p>{userInfo.fullName}</p>
                    <p className='text-[8px]'>{userInfo.phone}</p>
                  </div>
                  {/* <Button onClick={handleLogout}>Logout</Button> */}
                </div>
                </>
              ) : (
                <>
                  <div className='text-[10px'>
                    <Link to={'/login'} className="link transition text-[14px] font-[500]">
                      Sign In
                    </Link>
                    &nbsp; | &nbsp;
                    <Link to={'/register'} className="link transition text-[14px] font-[500]">
                      Sign Up
                    </Link>
                  </div>
                </>
                ) }
                {/* Sub Menu */}
                <ul className={`mt-2 shadow-xl bg-[#fff] p-4 rounded-md absolute z-50 text-[14px] flex flex-col text-center gap-3
                  ${openMobileMenu ? "opacity-100" : "opacity-0"}
                  `} onClick={() => setOpenMobileMenu(false)}>
                  <li><Link to="/my-account">My Account</Link></li>
                  <li onClick={handleLogout}>Log Out</li>
                </ul>             
              </li>


              {/* Giỏ hàng */}
              <li>
                <StyledEngineProvider injectFirst>
                  <CustomTooltip title="Giỏ hàng">
                    <IconButton aria-label="cart" onClick={() => context.setOpenCartPanel(true)}>
                      <StyledBadge badgeContent={4} color="error">
                        <ShoppingCartIcon style={{ color: '#000' }} />
                      </StyledBadge>
                    </IconButton>
                  </CustomTooltip>
                </StyledEngineProvider>
              </li>

              {/* Danh sách yêu thích */}
              <li>
                <StyledEngineProvider injectFirst>
                  <CustomTooltip title="Danh sách yêu thích">
                    <IconButton aria-label="cart">
                      <Favorite style={{ color: '#000' }} />
                    </IconButton>
                  </CustomTooltip>
                </StyledEngineProvider>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
    </header>
  );
}
