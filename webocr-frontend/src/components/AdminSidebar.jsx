import styled from 'styled-components';

const SidebarBody = styled.div`
    background-color: #F3F4F6;
    color: #374151;
    height: 100vh;
    padding-top: 64px;
    font-family: 'Space Grotesk';
`;

const ActiveSidebarItem = styled.a`
    background-color: rgba(191, 230, 206, 0.25);
    color: #00844E;
`;

function AdminSidebar() {
    return (
        <>
            <aside>
                <SidebarBody>
                    <h2 className="font-bold text-2xl pl-8 pb-8">Administracja systemem</h2>
                    <ActiveSidebarItem
                        href=""
                        className="sidebar-item flex flex-row items-center py-4 pl-8 pr-10 gap-4">
                        <img src="/home_active.png" alt=""/>
                        <p className="font-bold text-lg">Panel główny</p>
                    </ActiveSidebarItem>
                    <a href=""
                        className="sidebar-item flex flex-row items-center hover:bg-slate-200 py-4 pl-8 pr-10 gap-4">
                        <img src="/user.png" alt=""/>
                        <p className="font-bold text-lg">Użytkownicy</p>
                    </a>
                    <a href=""
                        className="sidebar-item flex flex-row items-center hover:bg-slate-200 py-4 pl-8 pr-10 gap-4">
                        <img src="/scanerr.png" alt=""/>
                        <p className="font-bold text-lg">Błędy skanowania</p>
                    </a>
                    <a href=""
                        className="sidebar-item flex flex-row items-center hover:bg-slate-200 py-4 pl-8 pr-10 gap-4">
                        <img src="/layers.png" alt=""/>
                        <p className="font-bold text-lg">Model sieci neuronowej</p>
                    </a>
                </SidebarBody>
            </aside>
        </>
    )
}

export default AdminSidebar;