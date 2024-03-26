import styled from "styled-components";
import { NavLink } from "react-router-dom";
const SidebarBody = styled.div`
  background-color: #f3f4f6;
  color: #374151;
  height: 100vh;
  padding-top: 64px;
  font-family: "Space Grotesk";
`;

const ActiveSidebarItem = styled.a`
  background-color: rgba(191, 230, 206, 0.25);
  color: #00844e;
`;

function AdminSidebar() {
  return (
    <>
      <aside>
        <SidebarBody>
          <h2 className="font-bold text-2xl pl-8 pb-8">
            Administracja systemem
          </h2>
          <NavLink
            to="/admin"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive
                  ? "rgba(191, 230, 206, 0.25)"
                  : "transparent",
                color: isActive ? "#00844E" : "#374151",
              }
            }}
            className="sidebar-item flex flex-row items-center hover:bg-slate-200 py-4 pl-8 pr-10 gap-4"
           >
            {({ isActive }) => {
                  return isActive ? <>
                  <img src="/home_active.png" alt="" />
                  <p className="font-bold text-lg">Strona główna</p>
                </>
                : 
                <>
                <img src="/home.png" alt="" />
                <p className="font-bold text-lg">Strona główna</p>
                </>
            }}

            
          </NavLink>
          <NavLink
            to="/users"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive
                  ? "rgba(191, 230, 206, 0.25)"
                  : "transparent",
                color: isActive ? "#00844E" : "#374151",
              }
            }}
            className="sidebar-item flex flex-row items-center hover:bg-slate-200 py-4 pl-8 pr-10 gap-4"
           >
            {({ isActive }) => {
                  return isActive ? <>
                  <img src="/user_active.png" alt="" />
                  <p className="font-bold text-lg">Użytkownicy</p>
                </>
                : 
                <>
                <img src="/user.png" alt="" />
                <p className="font-bold text-lg">Użytkownicy</p>
                </>
            }}
          </NavLink>
          <NavLink
            to="/errors"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive
                  ? "rgba(191, 230, 206, 0.25)"
                  : "transparent",
                color: isActive ? "#00844E" : "#374151",
              }
            }}
            className="sidebar-item flex flex-row items-center hover:bg-slate-200 py-4 pl-8 pr-10 gap-4"
           >
            {({ isActive }) => {
                  return isActive ? <>
                  <img src="/scanerr_active.png" alt="" />
                  <p className="font-bold text-lg">Błędy skanowania</p>
                </>
                : 
                <>
                <img src="/scanerr.png" alt="" />
                <p className="font-bold text-lg">Błędy skanowania</p>
                </>
            }}
          </NavLink>
          <NavLink
            to="/model"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive
                  ? "rgba(191, 230, 206, 0.25)"
                  : "transparent",
                color: isActive ? "#00844E" : "#374151",
              }
            }}
            className="sidebar-item flex flex-row items-center hover:bg-slate-200 py-4 pl-8 pr-10 gap-4"
           >
            {({ isActive }) => {
                  return isActive ? <>
                  <img src="/layers_active.png" alt="" />
                  <p className="font-bold text-lg">Model sieci neuronowej</p>
                </>
                : 
                <>
                <img src="/layers.png" alt="" />
                <p className="font-bold text-lg">Model sieci neuronowej</p>
                </>
            }}
          </NavLink>
        </SidebarBody>
      </aside>
    </>
  );
}

export default AdminSidebar;
