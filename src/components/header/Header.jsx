import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticatedSelector } from '../../redux/selectors/authSelector';

const Header = ({ handleLogout }) => {
    const [open, setOpen] = useState(false)
    const locate = useLocation()
    const navigate = useNavigate()

    const isAuthen = useSelector(isAuthenticatedSelector)

    return (
        <header className="bg-white font-[Poppins] border w-full">
            <nav className="flex justify-between items-center w-[92%]  mx-auto">
                <div className="cursor-pointer z-20" onClick={() => {
                    if (locate.path === '/home') return
                    navigate('/')
                }}>
                    <p className="text-[#332370] font-bold inline text-xl">HCM</p>
                    <p className="text-[#CF2F2C] font-bold inline text-xl">UTE</p>
                </div>
                <div
                    className={`duration-500 md:static absolute bg-white md:min-h-fit left-0 ${open ? 'top-[42px]' : ' top-[-100%]'} md:w-auto  w-full flex items-center px-5  md:shadow-none shadow-md`}>
                    <ul className="flex md:flex-row flex-col md:items-center items-start md:gap-[4vw] gap-4 ">
                        <li className='py-2'>
                            <Link to={'/'} className="hover:text-gray-500" >HomePage</Link>
                        </li>
                        <li className='py-2'>
                            <Link to={'/faqs'} className="hover:text-gray-500" >FAQS</Link>
                        </li>
                        {isAuthen &&
                            <li className='py-2'>
                                <Link to={'/profile'} className="hover:text-gray-500" >Profile</Link>
                            </li>}
                    </ul>
                </div>
                <div className="flex items-center gap-6">
                    {
                        !isAuthen ?
                            <Link to={'/login'} className="bg-[#6EABE8] text-white px-5 py-2 rounded-full hover:bg-[#87bbef] duration-300">Sign in</Link>
                            :
                            <button
                                className="bg-[#CF6BAD] text-white px-5 py-2 rounded-full hover:bg-[#f695d6] duration-300"
                                onClick={() => handleLogout()}>Log Out</button>
                    }
                    <button onClick={() => setOpen(!open)} name="menu" className="text-3xl cursor-pointer md:hidden">
                        {
                            open ? <CloseIcon></CloseIcon> : <DehazeIcon></DehazeIcon>
                        }
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header