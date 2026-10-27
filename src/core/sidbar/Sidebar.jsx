import 'bootstrap-icons/font/bootstrap-icons.css'
import './sidebar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'
import img from '../../logo.svg'
import { useNavigate } from 'react-router-dom';
export default function Sidebar() {
    const navigate = useNavigate()
    function Navigateurl(event) {
        navigate(event)
    }
    return (
        <>

            <div className="wrapper d-flex align-items-stretch disable-text-selection"   >
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                        <div className="navbar-brand">
                            <div>
                                <span>شرکت هوش صنعتی پارت</span>
                                <img src={img} alt="" />
                            </div>
                        </div>

                        <li className="active" onClick={() => Navigateurl('tasklist')}>
                            <a  >
                                <i className="bi bi-house-door"></i>
                                <span className="mx-3"> لیست تسک ها</span>
                            </a>
                        </li>
                        <li className="active" onClick={() => Navigateurl('addtasklist')}>
                            <a  >
                                <i className="bi bi-person"></i>
                                <span className="mx-3">  افزودن تسک</span>
                            </a>
                        </li>


                    </ul>
                </nav>
            </div>
        </>
    )
}