import { useDispatch, useSelector } from "react-redux"
import StaffModuleHeader from "../../components/staff_module_header"
import { useEffect, useState } from "react"
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice"
import { counsellorGetQuestionList, counsellorOwnField, depHGetQuestionList, forwardQuestion, responseQuestion } from "../../service/counsellor_service/counsellorQuestionService"
import { setTotalPage, setQuestionList, setInteractingQuestionId } from "../../redux/slices/counsellor/counsellorQuestionSlice"
import Pagination from "../../components/pagination"
import Table from "../../components/table"
import { counQuestionList, counQuestionListPages } from "../../redux/selectors/counsellorSelector"
import Filter from "../../components/filter"
import ResponseModal from "../../features/response_modal/ResponseModal"
import { userSelector } from "../../redux/selectors/authSelector"

const CounsellorQuestion = () => {
    const dispatch = useDispatch()

    const totalPage = useSelector(counQuestionListPages)
    const questionList = useSelector(counQuestionList)
    const user = useSelector(userSelector)

    const collumns = [
        { key: "title", header: "Tiêu đề" },
        { key: "date", header: "Ngày" },
    ]
    const [fieldFilterOptions, setFieldFilterOptions] = useState([
        { key: 'Lĩnh vực', value: 'all' },
    ]
    )

    const [params, setParams] = useState({ page: 0, size: 10, value: 'all' })
    const [showResponseModal, setShowResponseModal] = useState(false)


    useEffect(() => {
        getQuestionData()
        getFilterData()
    }, [params])

    const getQuestionData = async () => {
        dispatch(showLoading())

        try {
            let response;
            console.log();
            if (user.role === 'ROLE_DEPARTMENT_HEAD') {
                response = await depHGetQuestionList(params)
            } else {
                response = await counsellorGetQuestionList(params)
            }
            if (response.success) {
                dispatch(setQuestionList(response.data.items))
                dispatch(setTotalPage(response.data.pages))
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Lỗi lấy danh sách câu hỏi'))
            }

        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy danh sách câu hỏi'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const getFilterData = async () => {
        dispatch(showLoading())

        try {
            const response = await counsellorOwnField()
            if (response.success) {
                setFieldFilterOptions(response.data.map((field) => {
                    return { key: field.name, value: field.id }
                }))
            }

        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy lĩnh vực lỗi'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleResponse = async (data) => {
        dispatch(showLoading())

        try {
            console.log(data);
            const response = await responseQuestion(data)
            if (response.success) {
                dispatch(successMessage(response?.message ? response.message : 'Phản hồi thành công'))
                getQuestionData()
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Lỗi phản hồi người dùng'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi phản hồi người dùng'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleForward = async (data) => {
        dispatch(showLoading())

        try {
            console.log(data);
            const response = await forwardQuestion(data)
            if (response.success) {
                dispatch(successMessage(response?.message ? response.message : 'Chuyển tiếp thành công'))
                getQuestionData()
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Lỗi chuyển tiếp người dùng'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi chuyển tiếp người dùng'))
        } finally {
            dispatch(hideLoading())
        }
    }



    return (
        <>{showResponseModal &&
            <ResponseModal
                handleClose={() => setShowResponseModal(false)}
                handleResponse={handleResponse}
                handleForward={handleForward} />
        }
            <div className='container w-[95%] my-5 mx-auto'>
                <StaffModuleHeader role={'counsellor'} moduleTitle={'Danh sách câu hỏi'} />
                <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                    <div className="md:flex space-x-2 mb-2 lg:mb-0 hidden">

                    </div>
                    <div className="flex justify-start lg:justify-end space-x-4">
                        <Filter name='value' params={params} setParams={setParams} data={[{ key: 'Lĩnh vực', value: 'all' }, ...fieldFilterOptions,]} />
                    </div>
                </div>


                <Table
                    data={questionList}
                    page={params.page}
                    size={params.size}
                    totalPage={totalPage}
                    collumns={collumns}
                    action={true}
                    onResponse={(id) => {
                        setShowResponseModal(true)
                        dispatch(setInteractingQuestionId(id))
                    }}
                />

                <Pagination params={params} setParams={setParams} totalPage={totalPage} />
            </div>
        </>
    )
}

export default CounsellorQuestion