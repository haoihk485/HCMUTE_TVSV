import { useEffect, useState } from "react"
import StaffButton from "../../components/staff_button/StaffButton"
import StaffModuleHeader from "../../components/staff_module_header/StaffModuleHeader"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchBar from "../../components/search_bar/SearchBar";
import Filter from "../../components/filter";
import { useDispatch, useSelector } from "react-redux";
import { admDepList, admDepListPages } from "../../redux/selectors/adminSelector";
import Pagination from "../../components/pagination";
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice";
import { createDep, getDepList, setDepHead, updateDep, updateDepStatus } from "../../service/admin_service/adminDepService";
import { setDep, setInteractingDepId } from "../../redux/slices/admin/adminDepSlice";
import Table from "../../components/table";
import AdminCreateDepModal from "../../features/adm_create_dep_modal/AdminCreateDepModal";
import AdminEditDepModal from "../../features/adm_edit_dep_modal/AdminEditDepModal";
import AdminDepDetailModal from "../../features/adm_dep_detail_modal/AdminDepDetailModal";


export const AdminDepartment = () => {
    const dispatch = useDispatch()

    const totalPage = useSelector(admDepListPages)
    const depList = useSelector(admDepList)

    const collumns = [
        { key: "name", header: "Tên phòng ban" },
        { key: "description", header: "Miêu tả" },
        { key: "status", header: "Trạng thái" },
    ]
    const statusFilterOptions = [
        { key: 'Trạng thái', value: 'all' },
        { key: 'Hoạt động', value: 'active' },
        { key: 'Dừng hoạt động', value: 'inactive' }
    ]

    const [showAddDepModal, setAddDepModal] = useState(false)
    const [showEditDepModal, setShowEditDepModal] = useState(false)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [params, setParams] = useState({ page: 0, size: 10 })

    useEffect(() => {
        getDepData(params)
    }, [params])

    const getDepData = async () => {
        dispatch(showLoading())

        try {
            const response = await getDepList(params)
            if (response.success) {
                dispatch(setDep(response.data))
                console.log(response.data);
            } else {
                dispatch(errorMessage('Có lỗi xảy ra'))
            }
        } catch (error) {
            dispatch(errorMessage('Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleDepStatusUpdate = async (id) => {
        if (!confirm('Bạn muốn thay đổi trạng thái phòng ban?')) return

        dispatch(showLoading())

        try {
            const response = await updateDepStatus(id)
            if (response.success) {
                dispatch(successMessage(response.message || 'Cập nhật trạng thái phòng ban thành công'))
                getDepData(params)
            } else {
                dispatch(errorMessage(response.message || 'Cập nhật trạng thái phòng ban không thành công'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại AdminDepartment'))
        } finally {
            dispatch(hideLoading)
        }
    }
    const handleCreateDep = async (data) => {
        dispatch(showLoading())
        try {
            const response = await createDep(data)
            if (response.success) {
                dispatch(successMessage(response?.message || 'Thêm phòng ban thành công'))
            } else {
                dispatch(errorMessage(response?.message || 'Có lỗi xảy ra tại AdminDepartment'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại AdminDepartment'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleSetDepHead = async (ids) => {
        if (!confirm('Bạn muốn thay đổi trưởng phòng ban?')) return
        dispatch(showLoading())
        try {
            const response = await setDepHead(ids)
            if (response.success) {
                dispatch(successMessage(response?.message || 'Thêm trưởng phòng ban thành công'))
            } else {
                dispatch(errorMessage(response?.message || 'Có lỗi xảy ra tại AdminDepartment'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại AdminDepartment'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const buttonEditClick = (id) => {
        dispatch(setInteractingDepId(id))
        setShowEditDepModal(true)
    }
    const buttonDetailClick = (id) => {
        dispatch(setInteractingDepId(id))
        setShowDetailModal(true)
    }

    const handleEditDep = async (data) => {
        dispatch(showLoading())
        try {
            const response = await updateDep(data)
            if (response.success) {
                dispatch(successMessage(response?.message || 'Chỉnh sửa phòng ban thành công'))
                getDepData(params)
            } else {
                dispatch(errorMessage(response?.message || 'Chỉnh sửa phòng ban không thành công'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại AdminDepartment'))
        } finally {
            dispatch(hideLoading())
        }
    }


    return (
        <>
            {showAddDepModal &&
                <AdminCreateDepModal
                    handleClose={() => setAddDepModal(false)}
                    handleCreateDep={handleCreateDep} />}
            {showEditDepModal &&
                <AdminEditDepModal
                    handleClose={() => setShowEditDepModal(false)}
                    handleEditDep={handleEditDep} />}
            {showDetailModal &&
                <AdminDepDetailModal
                    handleClose={() => setShowDetailModal(false)}
                    handleSetDep={handleSetDepHead} />
            }
            <div className='container w-[95%] my-5 mx-auto'>
                <StaffModuleHeader role={'admin'} moduleTitle={'Quản lý phòng ban'} />
                <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                    <div className="flex space-x-2 mb-2 lg:mb-0">
                        <StaffButton oC={() => setAddDepModal(true)}>
                            <AddCircleOutlineIcon className="mb-1 mr-1" />Thêm Phòng Ban
                        </StaffButton>
                    </div>
                    <div className="flex justify-start lg:justify-end space-x-4">
                        <SearchBar params={params} setParams={setParams} />
                        <Filter name={'status'} params={params} setParams={setParams} data={statusFilterOptions} />
                    </div>
                </div>
                <Table
                    data={depList}
                    collumns={collumns}
                    page={params.page}
                    size={params.size}
                    statusUpdate={handleDepStatusUpdate}
                    action={true}
                    onUpdate={buttonEditClick}
                    onDetail={buttonDetailClick}
                />

                <Pagination totalPage={totalPage} params={params} setParams={setParams} />
            </div>
        </>
    )
}

export default AdminDepartment