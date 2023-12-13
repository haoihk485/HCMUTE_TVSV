import { useEffect, useState } from "react"
import ModalLayout from "../../components/modal_layout"
import SearchBar from "../../components/search_bar/SearchBar"
import StaffCoordinateList from "../../components/staff_coordinate_list/StaffCoordinateList"
import Pagination from "../../components/pagination"
import { useDispatch, useSelector } from "react-redux"
import { admInteractingDepId } from "../../redux/selectors/adminSelector"
import { errorMessage, hideLoading, showLoading } from "../../redux/slices/commonSlice"
import { getDepStaffById } from "../../service/admin_service/adminDepService"
import blankAvt from '../../assets/image/blank_avt.png'
import AddHomeIcon from '@mui/icons-material/AddHome';


const AdminDepDetailModal = ({ handleClose, handleSetDep }) => {
    const dispatch = useDispatch()

    const depId = useSelector(admInteractingDepId)

    const initParams = { page: 0, size: 6 }

    const [params, setParams] = useState(initParams)

    const [totalPage, setTotalPage] = useState(0)

    const [userList, setUserList] = useState([])

    const [depHead, setDepHead] = useState({})

    useEffect(() => {
        getDepData()
    }, [params])

    const getDepData = async () => {
        dispatch(showLoading())
        try {
            const response = await getDepStaffById({ depId: depId, params: params })
            if (response.success) {
                setUserList(response.data.counsellor.items)
                setTotalPage(response.data.counsellor.pages)
                setDepHead(response.data.departmentHead)
            }

        } catch (error) {
            dispatch(errorMessage(error?.response?.message || 'Có lỗi xảy ra AdminDepDetailModal'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleButtonClick = async (userId) => {
        await handleSetDep({ depId: depId, userId: userId })
        getDepData()
    }

    return (
        <ModalLayout handleClose={handleClose} title={'Thông tin phòng ban'}>
            <div className="flex items-center mb-4 w-full">
                <img src={blankAvt} alt={'depHead'} className="w-12 h-12 rounded-md mr-4" />
                <div className='flex justify-between w-full'>
                    <div>
                        <h3 className="text-md font-semibold">{depHead?.name ? depHead.name : 'Chưa có trưởng phòng ban'}</h3>
                        <p className="text-gray-500 text-sm">{depHead?.email ? depHead.email : ''}</p>
                    </div>
                </div>
            </div>
            <SearchBar params={params} setParams={setParams} />

            <div className="mb-4">
                < StaffCoordinateList staffList={userList} handleButtonClick={handleButtonClick} />
            </div>

            <Pagination
                params={params}
                setParams={setParams}
                totalPage={totalPage}
            />
        </ModalLayout>
    )
}

export default AdminDepDetailModal