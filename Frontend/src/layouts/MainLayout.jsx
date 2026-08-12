import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx"
import { useContext } from "react";
import { ColorContext } from "../context/ColorContext.jsx";

function MainLayout() {
    const { theme } = useContext(ColorContext);

    return (
        <div className={`flex min-h-screen flex-col transition-colors duration-200 ${
            theme === "dark" ? "bg-[#00001A]" : "bg-slate-50"
        }`}>
            <Navbar />
            <div className="flex-1"><Outlet /></div>
            <Footer />
        </div>
    )
}

export default MainLayout
