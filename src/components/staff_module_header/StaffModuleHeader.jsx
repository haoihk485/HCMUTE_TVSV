import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getForwardLink, getRole } from '../../utils/route';
import { useNavigate } from 'react-router';


const StaffModuleHeader = ({ role, moduleTitle }) => {
    const navigate = useNavigate()
    return (
        <div className="">
            <button onClick={() => {
                navigate(getForwardLink(getRole(role)))
            }} className='inline-block'><ArrowBackIcon className='mb-2 mr-3'></ArrowBackIcon></button>
            <h1 className='font-roboto text-2xl font-bold text-primary inline-block'>{moduleTitle}</h1>
        </div>
    )
}

export default StaffModuleHeader