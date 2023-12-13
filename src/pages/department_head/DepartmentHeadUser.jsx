import { useEffect, useState } from "react";
import StaffButton from "../../components/staff_button/StaffButton"
import StaffModuleHeader from "../../components/staff_module_header/StaffModuleHeader"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchBar from "../../components/search_bar/SearchBar";
import Filter from "../../components/filter";
import Pagination from "../../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice";
import { createCounsellor, getCounsellorList, updateCounsellorStatus } from "../../service/dephead_service/depCounsellorService";
import { setInteractingUserId, setTotalPage, setUserList } from "../../redux/slices/department_head/depHeadUserSlice";
import { depHUserList, depHUserListPages } from "../../redux/selectors/depHeadSelector";
import Table from "../../components/table";
import DepHeadCreateCounsellor from "../../features/dep_create_counsellor_modal/DepHeadCreateCounsellor";
import DepHeadDetailCounModal from "../../features/dep_detail_counsellor_modal/DepHeadDetailCounModal";


const DepartmentHeadUser = () => {
    const dispatch = useDispatch()


    const initParams = {
        page: 0, size: 10
    }

    const collumns = [
        { key: "name", header: "Tên người dùng" },
        { key: "email", header: "Email" },
        { key: "role", header: "Role" },
        { key: "phone", header: "Số điện thoại" },
        { key: "enabled", header: "Trạng thái" },
    ]

    const counsellerList = useSelector(depHUserList)
    const totalPage = useSelector(depHUserListPages)


    const statusFilterOptions = [
        { key: 'Trạng thái', value: 'all' },
        { key: 'Hoạt động', value: 'active' },
        { key: 'Dừng hoạt động', value: 'inactive' }
    ]

    const [params, setParams] = useState(initParams)
    const [showCreateCounsellor, setShowCreateCounsellor] = useState(false)
    const [showDetailCounsellor, setShowDetailCounsellor] = useState(false)

    useEffect(() => {
        getCounListData()
    }, [params])

    const getCounListData = async () => {
        dispatch(showLoading())
        try {
            const response = await getCounsellorList(params)
            if (response.success) {
                dispatch(setUserList(response.data.items))
                dispatch(setTotalPage(response.data.pages))
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Có lỗi xảy ra tại DepHeadUser'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại DepHeadUser'))

        } finally {
            dispatch(hideLoading())
        }
    }

    const updateCounStatus = async (id) => {
        dispatch(showLoading())
        try {
            const response = await updateCounsellorStatus(id)
            if (response.success) {
                dispatch(successMessage(response?.message ? response.message : 'Cập nhật trạng thái tư vấn viên thành công'))
                getCounListData()
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Có lỗi xảy ra tại DepUser'))
            }
        } catch (error) {
            console.log(error);
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại DepUser'))

        } finally {
            dispatch(hideLoading())
        }
    }

    const createCounhandle = async (data) => {
        dispatch(showLoading())
        try {
            const response = await createCounsellor(data)
            if (response.success) {
                dispatch(successMessage(response?.message ? response.message : 'Thêm tư vấn viên thành công'))
                getCounListData()
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Có lỗi xảy ra tại DepUser'))
            }
        } catch (error) {
            console.log(error);
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại DepUser'))

        } finally {
            dispatch(hideLoading())
        }
    }

    const CounsellorOnDetail = (id) => {
        dispatch(setInteractingUserId(id))
        setShowDetailCounsellor(true)
    }




    return (
        <>
            {showCreateCounsellor &&
                <DepHeadCreateCounsellor
                    handleClose={() => setShowCreateCounsellor(false)}
                    createCoun={createCounhandle} />}
            {showDetailCounsellor &&
                <DepHeadDetailCounModal
                    handleClose={() => setShowDetailCounsellor(false)} />}
            <div className='container w-[95%] my-5 mx-auto'>
                <StaffModuleHeader role={'departmentHead'} moduleTitle={'Quản lý nhân sự'} />
                <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                    <div className="flex space-x-2 mb-2 lg:mb-0">
                        <StaffButton oC={() => { setShowCreateCounsellor(true) }}>
                            <AddCircleOutlineIcon className="mb-1 mr-1" />Thêm tư vấn viên
                        </StaffButton>
                    </div>
                    <div className="flex justify-start lg:justify-end space-x-4">
                        <SearchBar params={params} setParams={setParams} />
                        <Filter name={'status'} params={params} setParams={setParams} data={statusFilterOptions} />
                    </div>
                </div>

                <Table
                    data={counsellerList}
                    collumns={collumns}
                    page={params.page}
                    size={params.size}
                    action={true}
                    onDetail={CounsellorOnDetail}
                    statusUpdate={updateCounStatus}
                />
                <Pagination totalPage={totalPage} params={params} setParams={setParams} />
            </div>
        </>
    )
}

export default DepartmentHeadUser