import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import StaffModuleHeader from "../../components/staff_module_header"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchBar from "../../components/search_bar/SearchBar";
import { getRole } from "../../utils/route"
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice";
import { getUserList, updateUserStattus, createStaff, coordinateUser } from "../../service/admin_service/adminUserService";
import { setUserList } from "../../redux/slices/admin/adminUserSlice";
import { admUserList, admUserListPages } from "../../redux/selectors/adminSelector";
import Table from '../../components/table';
import Pagination from '../../components/pagination';
import StaffButton from '../../components/staff_button';
import AdminAddStaffModal from '../../features/adm_add_staff_modal';
import AdminCoordinateStaffModal from '../../features/adm_coordinate_staff_modal/AdminCoordinateStaffModal';
import Filter from '../../components/filter';

const AdminUser = () => {
    const dispatch = useDispatch()

    const initParams = { page: 0, size: 10 }
    const collumns = [
        { key: "name", header: "Tên người dùng" },
        { key: "email", header: "Email" },
        { key: "phone", header: "Số điện thoại" },
        { key: "occupation", header: "Ngề nghiệp" },
        { key: "role", header: "Role" },
        { key: "enabled", header: "Trạng thái" },
    ]
    const roleFilterOptions = [
        { key: "Role", value: "" },
        { key: "Giám sát viên", value: "supervisor" },
        { key: "Trưởng phòng ban", value: "departmentHead" },
        { key: "Tư vấn viên", value: "counsellor" },
        { key: "Người dùng", value: "user" },
    ]
    const statusFilterOptions = [
        { key: "Trạng thái", value: "all" },
        { key: "Hoạt động", value: "enabled" },
        { key: "Dừng hoạt động", value: "disabled" },
    ]



    const [showAddStaff, setShowAddStaff] = useState(false)
    const [showCoordinateStaff, setShowCoordinateStaff] = useState(false)
    const [params, setParams] = useState(initParams)

    const userList = useSelector(admUserList)
    const totalPage = useSelector(admUserListPages)

    useEffect(() => {
        getUserListData(params)
    }, [params])

    const getUserListData = async (params) => {
        dispatch(showLoading())
        try {
            const response = await getUserList(params)
            if (response.success) {
                dispatch(setUserList(response.data))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại AdminUser'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleUpdateUserStatus = async (userId) => {
        if (!confirm('Khóa người dùng đồng nghĩa với việc họ không thể truy cập vào hệ thống! Bạn chắc chứ ?')) return

        dispatch(showLoading())
        try {
            const response = await updateUserStattus(userId)
            if (response.success) {
                dispatch(successMessage(response.message || 'Cập nhật trạng thái người dùng thành công'))
                getUserListData(params)
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Có lỗi xảy ra tại AdminUser'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại AdminUser'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleCoordinateUser = async (ids) => {
        if (!confirm('Chuyển người dùng vào phòng ban ?')) return

        dispatch(showLoading())

        try {
            const res = await coordinateUser(ids)
            if (res.success) {
                dispatch(successMessage(res.message || 'Thêm người dùng vào pb thành công'))
            } else {
                dispatch(errorMessage(res?.message ? res.message : 'Có lỗi xảy ra tại AdminUser'))
            }
        } catch (error) {
            console.log('catch');
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại CoordinateModal'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleCreateStaff = async (data) => {
        dispatch(showLoading())
        try {
            const response = await createStaff(data)
            if (response?.success) {
                dispatch(successMessage('Thêm mới nhân viên thành công!'));
                getUserListData(params)
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Có lỗi xảy ra tại AdminUser'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại AdminUser'))
        } finally {
            dispatch(hideLoading())
        }
    }

    return (
        <div className='container w-[95%] my-5 mx-auto'>
            <StaffModuleHeader role={'admin'} moduleTitle={'Quản lý người dùng'} />
            {showAddStaff &&
                <AdminAddStaffModal
                    handleClose={() => setShowAddStaff(false)}
                    handleAdd={handleCreateStaff} />
            }
            {showCoordinateStaff &&
                <AdminCoordinateStaffModal
                    handleClose={() => setShowCoordinateStaff(false)}
                    handleCoordinateUser={handleCoordinateUser} />
            }
            <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                <div className="flex space-x-2 mb-2 lg:mb-0">
                    <StaffButton oC={() => { setShowAddStaff(true) }}>
                        <AddCircleOutlineOutlinedIcon className='mb-1 mr-1' />Thêm nhân sự
                    </StaffButton>
                    <StaffButton oC={() => setShowCoordinateStaff(true)}>
                        <AddHomeOutlinedIcon className='mb-1 mr-1' />Phân phối nhân sự
                    </StaffButton>
                </div>
                <div className="flex justify-start lg:justify-end space-x-4">
                    <SearchBar params={params} setParams={setParams} />
                    <Filter name={'role'} params={params} setParams={setParams} data={roleFilterOptions} />
                    <Filter name={'status'} params={params} setParams={setParams} data={statusFilterOptions} />
                </div>
            </div >

            <Table
                data={userList}
                collumns={collumns}
                page={params.page}
                size={params.size}
                statusUpdate={handleUpdateUserStatus} />
            <Pagination totalPage={totalPage} params={params} setParams={setParams} />
        </div>
    )
}

export default AdminUser