import styled from 'styled-components';

const Avatar = styled.span`
    padding: 16px;
    font-weight: bold;
    font-size: 1rem;
    background-color: #00844E;
    border-radius: 50%;
    color: white;
`;

function Navbar() {
    return (
        <>
            <nav className='flex flex-row items-center justify-between pl-32 pr-16 pt-8 pb-8 border border-slate-200'>
                <img src="/logo_black.png" alt="" className="w-32"/>
                <div className="user-container flex flex-row items-center">
                    <Avatar>TB</Avatar>
                    <div className="user ml-4">
                        <p className="user text-lg">Tomasz Bury</p>
                        <p className="email text-sm"> dto@gmail.com</p>
                    </div>
                    <button className="flex flex-row items-center ml-10 gap-2">
                        <img src="/log-out.svg" alt=""/>
                        Wyloguj się
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar;