import { useEffect, useState } from "react";
import SearchBar from "../../components/search_bar/SearchBar";
import StaffButton from "../../components/staff_button/StaffButton"
import StaffModuleHeader from "../../components/staff_module_header"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Filter from "../../components/filter";
import Pagination from "../../components/pagination";
import { depHFieldList, depHFieldListPages } from "../../redux/selectors/depHeadSelector";
import Table from "../../components/table";
import { useDispatch, useSelector } from "react-redux";
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice";
import { depHAddFieldDep, depHDeleteFieldDep, depHGetFieldList, depHGetFieldNotInDep, } from "../../service/dephead_service/depFieldService";
import { setFieldList } from "../../redux/slices/department_head/depHeadFieldSlice";
import MultiFieldsAddModal from "../../features/multi_fields_add_modal/MultiFieldsAddModal";
import { setTotalPage } from "../../redux/slices/department_head/depHeadFieldSlice";

const DepartmentHeadField = () => {

    const dispatch = useDispatch()

    const totalPage = useSelector(depHFieldListPages)
    const fieldList = useSelector(depHFieldList)

    const initParams = { page: 0, size: 10 }
    const collumns = [
        { header: 'Tên lĩnh vực', key: 'name' }
    ]

    const [params, setParams] = useState(initParams)
    const [showAddField, setShowAddField] = useState(false)
    const [initFieldList, setInitFieldList] = useState([])

    useEffect(() => {
        getFieldData()
        getFieldNotInDep()
    }, [params])

    const getFieldData = async () => {
        dispatch(showLoading())

        try {
            const response = await depHGetFieldList(params)
            if (response.success) {
                dispatch(setFieldList(response.data.items))
                dispatch(setTotalPage(response.data.pages))
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Lỗi xảy ra (DepField)'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi xảy ra (DepField)'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const getFieldNotInDep = async () => {
        dispatch(showLoading())

        try {
            const response = await depHGetFieldNotInDep()
            if (response.success) {
                setInitFieldList(response.data)
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Lỗi xảy ra (DepField)'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi xảy ra (DepField)'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const addFieldToDep = async (data) => {
        dispatch(showLoading())
        try {
            const response = await depHAddFieldDep({ ids: data })
            if (response.success) {
                dispatch(successMessage(response?.message ? response.message : 'Thêm lĩnh vực thành công'))
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Lỗi xảy ra (DepField)'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi xảy ra (DepField)'))
        } finally {
            getFieldNotInDep()
            dispatch(hideLoading())
        }
    }

    const deleteFieldFromDep = async (id) => {
        dispatch(showLoading())
        try {
            const response = await depHDeleteFieldDep(id)
            if (response.success) {
                dispatch(successMessage(response?.message ? response.message : 'Xóa lĩnh vực thành công'))
                getFieldData()
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Lỗi xảy ra (DepField)'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi xảy ra (DepField)'))
        } finally {
            getFieldNotInDep()
            dispatch(hideLoading())
        }
    }
    return (
        <> {showAddField &&
            <MultiFieldsAddModal
                handleClose={() => setShowAddField(false)}
                initFieldList={initFieldList}
                handleAddFields={addFieldToDep}
            />}
            <div className='container w-[95%] my-5 mx-auto'>
                <StaffModuleHeader role={'departmentHead'} moduleTitle={'Quản lý lĩnh vực'} />
                <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                    <div className="flex space-x-2 mb-2 lg:mb-0">
                        <StaffButton oC={() => setShowAddField(true)}>
                            <AddCircleOutlineIcon className="mb-1 mr-1" />Thêm lĩnh vực
                        </StaffButton>
                    </div>
                    <div className="flex justify-start lg:justify-end space-x-4">
                        <SearchBar params={params} setParams={setParams} />
                    </div>
                </div>
                <Table
                    data={fieldList}
                    collumns={collumns}
                    page={params.page}
                    size={params.size}
                    action={true}
                    onDelete={deleteFieldFromDep}
                />
                <Pagination params={params} setParams={setParams} totalPage={totalPage} />
            </div></>
    )
}

export default DepartmentHeadField