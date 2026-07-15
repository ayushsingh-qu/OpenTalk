import { Outlet } from "react-router"
import Navbar from "../components/Navbar"

const Layout = () => {
  return (
    <div className="bg-(--bg-main) min-h-screen">
      <div><Navbar/></div>
      <div className="w-full lg:w-[75%] pt-15 pb-25  sm:pt-20 sm:pb-10 mx-auto px-6">
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
