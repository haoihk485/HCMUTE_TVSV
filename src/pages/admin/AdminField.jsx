import { useEffect, useState } from "react"
import StaffModuleHeader from "../../components/staff_module_header/StaffModuleHeader"
import StaffButton from "../../components/staff_button/StaffButton"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchBar from "../../components/search_bar/SearchBar";
import Filter from "../../components/filter";
import { useDispatch, useSelector } from "react-redux";
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice";
import { createField, getFields } from "../../service/admin_service/adminFieldService";
import { setField, setTotalPage } from "../../redux/slices/admin/adminFieldSlice";
import { admFieldList, admFieldPages } from "../../redux/selectors/adminSelector";
import Pagination from "../../components/pagination";
import Table from "../../components/table";
import AdminCreateFieldModal from "../../features/adm_create_field_modal/AdminCreateFieldModal";

const AdminField = () => {

    const dispatch = useDispatch()

    const initParams = { page: 0, size: 10 }

    const totalPage = useSelector(admFieldPages)
    const fieldList = useSelector(admFieldList)

    const statusFilterOptions = [
        { key: 'Trạng thái', value: 'all' },
        { key: 'Hoạt động', value: 'active' },
        { key: 'Dừng hoạt động', value: 'inactive' },
    ]

    const collumns = [
        { header: 'Tên lĩnh vực', key: 'name' },
        { header: 'Trạng thái', key: 'status' }
    ]

    const [params, setParams] = useState(initParams)
    const [showCreateField, setShowCreateField] = useState(false)

    useEffect(() => {
        getFieldData()
    }, [params])

    const getFieldData = async () => {
        dispatch(showLoading())
        try {
            const response = await getFields(params)
            if (response.success) {
                dispatch(setField(response.data.items))
                dispatch(setTotalPage(response.data.pages))
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Xảy ra lỗi tại AdminField'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại AdminField'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleCreateField = async (data) => {
        if (data.name === '')
        {
            dispatch(errorMessage('Tên lĩnh vực không được để trống'))
            return
        }
        dispatch(showLoading())
        try {
            const response = await createField(data)
            if (response.message) {
                dispatch(successMessage(response.message))
                getFieldData()
            } else {
                dispatch(errorMessage(response.message || 'Có lỗi xảy ra AdminField'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại AdminField'))
        } finally {
            dispatch(hideLoading)
        }
    }

    return (
        <>
            {showCreateField &&
                <AdminCreateFieldModal
                    handleClose={() => setShowCreateField(false)}
                    createField={handleCreateField} />}
            <div className='container w-[95%] my-5 mx-auto'>
                <StaffModuleHeader moduleTitle={'Quản lí lĩnh vực'} role={'admin'} ></StaffModuleHeader>
                <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                    <div className="flex space-x-2 mb-2 lg:mb-0">
                        <StaffButton oC={() => { setShowCreateField(true) }}>
                            <AddCircleOutlineIcon className="mb-1 mr-1"></AddCircleOutlineIcon>
                            Thêm lĩnh vực
                        </StaffButton>
                    </div>
                    <div className="flex justify-start lg:justify-end space-x-4">
                        <SearchBar params={params} setParams={setParams} />
                        <Filter params={params} setParams={setParams} data={statusFilterOptions} name={'status'} />
                    </div>
                </div>

                <Table
                    data={fieldList}
                    collumns={collumns}
                    page={params.page}
                    size={params.size}
                    action={true}
                    onUpdate={() => { }}
                />

                <Pagination params={params} setParams={setParams} totalPage={totalPage} />
            </div>
        </>
    )
}
export default AdminField