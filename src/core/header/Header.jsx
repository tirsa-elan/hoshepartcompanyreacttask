import 'bootstrap-icons/font/bootstrap-icons.css'
import './header.css';
import { useSideBarDispath } from '../side-bar-context/side-bar-context-method.jsx';
import { useState } from 'react';
export default function Header() {
    const [state, setStateTrueFasle] = useState(true)
    const dispatch = useSideBarDispath();
    function handleSidebar() {
        if (state === true) {
            dispatch({
               status: true
            })
            setStateTrueFasle(false)
        }
        else {
            dispatch({
              status: false
            })
            setStateTrueFasle(true)
        }

    }
    return (

        <>
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="div">
                        <button className="bi toggle-icon" onClick={handleSidebar}>
                              <i className="bi bi-list menuu"></i>
                        </button>
                        <input type="text" name="" id="" placeholder=" برای جستجو تایپ کنید   " />
                    </div>
                    <div className="lap-top-size">

                        <i className="bi bi-person-circle"></i>
                        <i className="bi bi-bell-fill"></i>
                        <i className="bi bi-moon-fill"></i>
                        <span >زهرا حسین زاده </span>

                    </div>

                </div>
            </nav>
        </>
    )
}