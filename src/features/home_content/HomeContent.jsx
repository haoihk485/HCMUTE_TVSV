import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import QuestionBox from '../../components/question_box/QuestionBox';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessage, hideLoading, showLoading } from '../../redux/slices/commonSlice';
import { getQuestionList } from '../../service/public_service/publicQuestionService';
import { useEffect, useState } from 'react';
import { setQuestionList, setTotalPage } from '../../redux/slices/public/questionSlice';
import { questionList, questionListPages } from '../../redux/selectors/publicSelector';
import Filter from '../../components/filter/Filter';
import { getDepList } from '../../service/admin_service/adminUserService';
import { useNavigate } from 'react-router';
import PaginationParams from '../../components/pagination_params/PaginationParams';
import { useSearchParams } from 'react-router-dom';
import { increaseView } from '../../service/counsellor_service/counsellorQuestionService';


const HomeContent = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const totalPage = useSelector(questionListPages)

    const currPage = searchParams.get('page') ? Number(searchParams.get('page')) : 0

    const initParams = { size: 10, page: currPage }



    const [params, setParams] = useState(initParams)
    const questions = useSelector(questionList)
    const [depList, setDepList] = useState([])

    useEffect(() => {
        getQuestionData()
        if (depList.length === 0) {
            getDepListData()
        }
    }, [params])

    const getQuestionData = async () => {
        dispatch(showLoading())

        try {
            const response = await getQuestionList(params)
            if (response.success) {
                dispatch(setQuestionList(response.data.items))
                dispatch(setTotalPage(response.data.pages))
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Lỗi lấy dữ liệu'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy dữ liệu'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const getDepListData = async () => {
        dispatch(showLoading())

        try {
            const response = await getDepList()
            if (response.success) {
                setDepList(response.data)
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Lỗi lấy dữ liệu'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy dữ liệu'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleDepFilter = (id) => {

        if (!params?.departmentId && id === '') return
        else if (params?.departmentId && id === '') {
            setParams(Object.fromEntries(Object.entries(params).filter(([key, value]) => key !== 'departmentId')))
            setSearchParams({ page: 0 })

        } else {
            setParams({ ...params, departmentId: id })
            setSearchParams({ page: 0 })
        }
    }

    const handleQuestionClick = async (id) => {
        dispatch(showLoading())
        try {
            await increaseView(id)
        } catch (error) {

        } finally {
            dispatch(hideLoading())
            navigate(`/question/${id}`)
        }
    }

    return (
        <>
            <div className="grid grid-cols-4 w-[95%] mx-auto gap-2 my-3">
                <div className="border rounded-lg p-1 pl-3 col-span-4 flex items-center text-white bg-dark_blue">
                    <HomeIcon />
                    <ChevronRightIcon />
                    <p className='inline-block text-lg font-bold'>Hỏi đáp</p>
                </div>
                <div className="border col-span-3 overflow-hidden bg-white">
                    <div className='w-full bg-[#eee] flex justify-between'>
                        <p className='bg-white w-fit p-2 font-semibold'>Tất cả</p>
                        {/* <Filter /> */}
                    </div>
                    {
                        questions.map((ques, i) => {
                            return <QuestionBox key={i} question={ques} handleQuestionClick={handleQuestionClick} />
                        })
                    }{
                        questions.length === 0 &&
                        <div className='flex justify-center text-gray-600 p-8 border mt-3 rounded-md font-bold text-xl'>
                            Chưa có câu hỏi nào!!
                        </div>
                    }
                    <div className='w-full flex my-5'>
                        <PaginationParams params={params} setParams={setParams} totalPage={totalPage} />
                    </div>
                </div>
                <div className="border overflow-hidden bg-white h-fit">
                    <div className='w-full bg-[#eee] flex justify-between'>
                        <p className='bg-white w-fit p-2 font-semibold'>Khoa</p>
                    </div>
                    <div className='h-[373px] overflow-y-auto'>
                        <div
                            className={`p-1 mb-[2px] text-sm font-bold text-[#2A2A2A] border-b w-full px-2 cursor-pointer hover:bg-[#d8e8f5] duration-300 py-2 ${(!params.departmentId) ? 'bg-[#d8e8f5]' : ''}`}
                            onClick={() => handleDepFilter('')}>
                            Tất cả khoa
                        </div>
                        {depList.map((dep, i) => {
                            return (
                                <div
                                    key={dep.id}
                                    className={`p-1 mb-[2px] text-sm font-bold text-[#2A2A2A] border-b w-full px-2 cursor-pointer hover:bg-[#d8e8f5] duration-300 py-2 ${(params.departmentId === dep.id) ? 'bg-[#d8e8f5]' : ''}`}
                                    onClick={() => handleDepFilter(dep.id)}>
                                    {dep.name}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}


export default HomeContent


