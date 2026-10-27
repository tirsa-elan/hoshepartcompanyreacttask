import './task-list.css'
import { useEffect, useReducer, useState } from 'react'
import { headerRowData, useReducerTableducer } from './tsak-list-reducer'
import DynamicTable from '../../share/dynamic-table/dynamic-table'
import { useNavigate } from 'react-router-dom'
import { deleteTaskdetailbyId, getAllTask } from '../../share/http-services/task-list'
import { Snackbar, Alert, Modal , Box } from '@mui/material'
import EditTaskForm from '../EditTask/EditTask'

export default function TaskList() {
    const [state, dispatch] = useReducer(useReducerTableducer, headerRowData)
    const [taskDetail, settaskDetail] = useState(null)
    const [openshowdetailmodal, setopenshowdetailmodal] = useState(false)
    const [openUpdateModal, setopenUpdateModal] = useState(false)
    const [opendeletemodal, setopendeletemodal] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success'
    })

    const navigate = useNavigate()

    const headerData = [
        { key: 'select', name: '' },
        { key: 'title', name: 'عنوان' },
        { key: 'id', name: 'شناسه' },
        { key: 'description', name: 'توضیحات' },
        { key: 'created_at', name: 'تاریخ ساخت' },
        { key: 'updated_at', name: 'تاریخ ویرایش' }
    ]


  

    function goToAddPage() {
        navigate('/home/addtasklist')
    }

    function deletTask() {
        if (!taskDetail?.id || isDeleting) return

        setIsDeleting(true)

        deleteTaskdetailbyId(taskDetail.id)
            .then(() => {
             

                setopendeletemodal(false)
                settaskDetail(null)
    getAllTask('').then((res) =>{
           dispatch({
            headerData,
            rowData: res.data
        })
        })
                setAlert({
                    open: true,
                    message: 'تسک با موفقیت حذف شد',
                    severity: 'success'
                })
            })
            .catch(() => {
                setAlert({
                    open: true,
                    message: 'خطا در حذف تسک',
                    severity: 'error'
                })
            })
            .finally(() => {
                setIsDeleting(false)
            })
    }

    function openDetailTaskModal() {
        if (taskDetail) {
            setopenshowdetailmodal(true)
        } else {
            setAlert({
                open: true,
                message: 'حداقل یک سطر را برای نمایش جزئیات انتخاب کنید!',
                severity: 'warning'
            })
        }
    }

    function openDeleteTaskModal() {
        if (taskDetail) {
            setopendeletemodal(true)

        } else {
            setAlert({
                open: true,
                message: 'حداقل یک سطر را برای حذف انتخاب کنید!',
                severity: 'warning'
            })
        }
    }

    function openupdateTaskModal() {
        if (taskDetail) {
          setopenUpdateModal(true)
        } else {
            setAlert({
                open: true,
                message: 'حداقل یک سطر را برای ویرایش انتخاب کنید!',
                severity: 'warning'
            })
        }
    }

    const handleSelect = (row) => {
        settaskDetail(row || null)
    }

    useEffect(() => {
        getAllTask('').then((res) =>{
           dispatch({
            headerData,
            rowData: res.data
        })
        })
       
    }, [])


    function searchData(search){
        getAllTask(search).then((res) =>{
                dispatch({
            headerData,
            rowData: res.data
        })
        })
    }

    return (
        <div className="ticket-list-container">
            <span className="header-of-ticketing">
                لیست تسک ها
            </span>

            <span className="caption-text">
                لیست تسک های ثبت شده در سیستم
            </span>

            <div className="ticket-list-box-container">
                <div className="first">
                    <div className="ticket-list-box-text-container">
                        <div>
                            <span>کل تسک ها</span>
                            <span>{state.rowData.length}</span>
                        </div>
                    </div>
                    <div className="range">
                        <div></div>
                    </div>
                </div>

                <div className="first">
                    <div className="ticket-list-box-text-container">
                        <div>
                            <span>تسک ها</span>
                            <span>{state.rowData.filter(row => row.completed).length}</span>
                        </div>
                    </div>
                    <div className="range">
                        <div></div>
                    </div>
                </div>
            </div>

            <div className="add-filter">
                <button
                    style={{ background: 'red' }}
                    onClick={openDeleteTaskModal}
                >
                    حذف تسک
                </button>

                <button
                    style={{ background: 'blue' }}
                    onClick={openDetailTaskModal}
                >
                    نمایش جزئیات تسک
                </button>

                <button
                    style={{ background: 'orange' }}
                    onClick={openupdateTaskModal}
                >
                    ویرایش تسک
                </button>

                <button onClick={goToAddPage}>
                    ثبت تسک
                </button>
            </div>

            <div className="input-filter-container">
                <input type="text"  onChange={(e) =>{
                    searchData(e.target.value)
                }}  />
            </div>

            <div className="coulmn-row-data">
                <DynamicTable
                    header={state.headerData}
                    rows={state.rowData}
                    onSelect={handleSelect}
                />
            </div>

            <Modal
                open={opendeletemodal}
                onClose={() => setopendeletemodal(false)}
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '480px',
                    maxWidth: '90%',
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    background: '#fff',
                    padding: '30px',
                    borderRadius: '18px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                    direction: 'rtl',
                    outline: 'none'
                }}>
                    <p>
                        آیا از حذف تسک {taskDetail?.title} اطمینان دارید؟
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '10px'
                    }}>
                        <button
                            onClick={deletTask}
                            disabled={isDeleting}
                            style={{
                                background: 'blue',
                                padding: '10px 30px',
                                color: '#fff',
                                borderRadius: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            {isDeleting ? 'در حال حذف...' : 'بله'}
                        </button>

                        <button
                            onClick={() => setopendeletemodal(false)}
                            style={{
                                background: 'red',
                                padding: '10px 30px',
                                color: '#fff',
                                borderRadius: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            بستن
                        </button>
                    </div>
                </div>
            </Modal>


          <Modal open={openUpdateModal} >
   <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width:'70%',
                    maxWidth: '90%',
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    background: '#fff',
                    padding: '30px',
                    borderRadius: '18px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                    direction: 'rtl',
                    outline: 'none'
                }}>
                    <EditTaskForm
           
            data={taskDetail}
           
        />
                </div>
        
    
</Modal>

            <Modal
                open={openshowdetailmodal}
                onClose={() => setopenshowdetailmodal(false)}
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '480px',
                    maxWidth: '90%',
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    background: '#fff',
                    padding: '30px',
                    borderRadius: '18px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                    direction: 'rtl',
                    outline: 'none'
                }}>
                    <h3 style={{
                        color: '#1e293b',
                        fontSize: '21px',
                        fontWeight: 'bold',
                        borderRight: '4px solid #3b82f6',
                        paddingRight: '12px',
                        marginBottom: '20px'
                    }}>
                        جزئیات تسک
                    </h3>

                    <hr style={{ borderColor: '#e2e8f0' }} />

                    {[
                        ['شناسه', taskDetail?.id],
                        ['عنوان', taskDetail?.title],
                        ['توضیحات', taskDetail?.description],
                        ['وضعیت', taskDetail?.completed ? 'تکمیل شده' : 'تکمیل نشده'],
                        ['تاریخ ایجاد', taskDetail?.created_at],
                        ['تاریخ ویرایش', taskDetail?.updated_at]
                    ].map(([label, value]) => (
                        <div
                            key={label}
                            style={{
                                background: '#f8fafc',
                                padding: '14px 16px',
                                marginTop: '12px',
                                borderRadius: '10px',
                                border: '1px solid #e2e8f0',
                                fontSize: '14px',
                                color: '#334155',
                                overflowWrap: 'anywhere'
                            }}
                        >
                            <span style={{
                                fontWeight: 'bold',
                                color: '#2563eb',
                                marginLeft: '10px'
                            }}>
                                {label}:
                            </span>
                            {value ?? '-'}
                        </div>
                    ))}

                    <button
                        onClick={() => setopenshowdetailmodal(false)}
                        style={{
                            width: '100%',
                            marginTop: '22px',
                            padding: '12px',
                            background: '#2563eb',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        بستن
                    </button>
                </div>
            </Modal>

            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={() =>
                    setAlert(prev => ({ ...prev, open: false }))
                }
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <Alert
                    severity={alert.severity}
                    variant="filled"
                    onClose={() =>
                        setAlert(prev => ({ ...prev, open: false }))
                    }
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </div>
    )
}