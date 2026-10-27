import Container from "../Container/Container"
import Header from "../header/Header"
import Sidebar from "../sidbar/Sidebar"
import './home.css'
import '../../App.css'
import { useSideBarState } from '../side-bar-context/side-bar-context-method';
export default function Home() {
    const {headerToggle,sidebarToggle,mainToggle} = useSideBarState()
    console.log({headerToggle,sidebarToggle,mainToggle});
    
    return (
        <>
        
            <header className={headerToggle ? "header" : "header headertoggle"}>
                <Header />
            </header >
            <main id="main">
                <aside  className={sidebarToggle ? "aside" : "aside asidetoggle"}>
                    <Sidebar />
                </aside>
                <section className={mainToggle ? "main-content" : "main-content mainToggle"}  >
                <div className="router-cont">
                    <Container />
                </div>
            </section >
        </main >
        </>
    )
}