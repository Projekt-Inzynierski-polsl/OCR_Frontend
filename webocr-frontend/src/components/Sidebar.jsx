import styled from 'styled-components';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const SidebarBody = styled.div`
    background-color: #F3F4F6;
    color: #374151;
    height: 100vh;
    padding-top: 64px;
    width: 385px;
    font-family: 'Space Grotesk';
`;

const FolderHint = styled.p`
    color: #9CA3AF; 
`

function Sidebar() {
    return (
        <>
            <aside>
                <SidebarBody>
                    <h2 className="font-bold text-xl pl-16">Ostatnie dokumenty</h2>
                    <div className="last-docs-container flex flex-col mt-2">
                        <div
                            className="last-doc flex flex-row gap-2 items-center hover:bg-slate-200 py-1.5 pl-12 pr-10 mx-4">
                            <img src="/note.png" alt=""/>
                            <a href='' className="text-ellipsis overflow-hidden whitespace-nowrap">testowy tekst który z
                                pewnością jest bardzo długi</a>
                        </div>
                        <div
                            className="last-doc flex flex-row gap-2 items-center hover:bg-slate-200 py-1.5 pl-12 pr-10 mx-4">
                            <img src="/note.png" alt=""/>
                            <a href='' className="text-ellipsis overflow-hidden whitespace-nowrap text-md">jeszcze
                                dłuższy testowy tekst o niczym</a>
                        </div>
                        <div
                            className="last-doc flex flex-row gap-2 items-center hover:bg-slate-200 py-1.5 pl-12 pr-10 mx-4">
                            <img src="/note.png" alt=""/>
                            <a href='' className="text-ellipsis overflow-hidden whitespace-nowrap">bardzo długi testowy
                                tekst do sprawdzenia</a>
                        </div>
                    </div>
                    <div className="user-notes-container mt-24">
                        <div className="user-notes-header flex flex-row pl-16 items-center justify-between mr-2">
                            <h2 className="font-bold text-xl">Twoja przestrzeń</h2>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <button className="p-2 hover:bg-neutral-200 mr-1">
                                            <img src="/plus.svg" alt=""/>
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Stwórz nowy folder</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="user-notes">
                            <div
                                className="folder pl-10 mt-2 flex flex-row hover:bg-slate-200 py-1.5 mx-4 items-center">
                                <button className="p-2 hover:bg-neutral-300 rounded-md">
                                    <img src="/arr.svg" alt="" className="rotate-90"/>
                                </button>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <button className="p-2 hover:bg-neutral-200 mr-1">
                                                <img src="/folder.png" alt=""/>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Zmień ikonę folderu</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <p className="folder__title mr-4">Przyroda</p>
                                <FolderHint className="mr-24 text-sm">4</FolderHint>

                                <button className="p-1 hover:bg-neutral-300 rounded-md self-end">
                                    <img src="/plus.svg" alt=""/>
                                </button>

                            </div>
                            <div className="folder__notes pl-6">
                                <div
                                    className="folder-doc flex flex-row gap-2 items-center hover:bg-slate-200 py-1.5 pl-12 pr-10 mx-4">
                                    <img src="/note.png" alt=""/>
                                    <a href='' className="text-ellipsis overflow-hidden whitespace-nowrap">testowy tekst
                                        który z
                                        pewnością jest bardzo długi</a>
                                </div>
                                <div
                                    className="folder-doc doc__selected flex flex-row gap-2 items-center bg-slate-200 font-bold py-1.5 pl-12 pr-10 mx-4">
                                    <img src="/note.png" alt=""/>
                                    <a href='' className="text-ellipsis overflow-hidden whitespace-nowrap">testowy tekst
                                        który z
                                        pewnością jest bardzo długi</a>
                                </div>
                            </div>
                            <div
                                className="folder pl-10 mt-2 flex flex-row hover:bg-slate-200 py-1.5 mx-4 items-center">
                                <button className="p-2 hover:bg-neutral-300 rounded-md">
                                    <img src="/arr.svg" alt=""/>
                                </button>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <button className="p-2 hover:bg-neutral-200 mr-1">
                                                <img src="/folder.png" alt=""/>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Zmień ikonę folderu</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <p className="folder__title mr-4">Matematyka</p>
                                <FolderHint className="mr-24 text-sm">4</FolderHint>

                            </div>
                            <div
                                className="folder pl-10 flex flex-row hover:bg-slate-200 py-1.5 mx-4 items-center">
                                <button className="p-2 hover:bg-neutral-300 rounded-md">
                                    <img src="/arr.svg" alt=""/>
                                </button>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <button className="p-2 hover:bg-neutral-200 mr-1">
                                                <img src="/folder.png" alt=""/>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Zmień ikonę folderu</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <p className="folder__title mr-4">Matematyka</p>
                                <FolderHint className="mr-24 text-sm">4</FolderHint>

                            </div>
                        </div>
                    </div>
                </SidebarBody>
            </aside>
        </>
    )
}

export default Sidebar;