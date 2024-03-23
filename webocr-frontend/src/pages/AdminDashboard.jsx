import styled from 'styled-components';
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/AdminSidebar.jsx"

const MainLayout = styled.div`
    background-color: #F9FAFB;
    font-family: 'Space Grotesk';
`

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


function AdminDashboard() {
    return (
        <>
            <Navbar></Navbar>
            <main className="grid grid-cols-[385px_1fr]">
                <Sidebar></Sidebar>
                <MainLayout>
                    <div className="stats flex flex-row mx-32 mt-10 gap-4">
                        <Card className="bg-white border border-slate-100 flex flex-col items-end justify-end pt-8 w-1/4">
                            <CardContent className="pb-0">
                                <p className="text-5xl font-bold text-right mr-2">459</p>
                            </CardContent>
                            <CardHeader className="text-right mr-2 space-y-0 pt-3 pb-5">
                                <CardTitle className="text-xl pb-2">Aktywni użytkownicy</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="bg-white border border-slate-100 flex flex-col items-end justify-end pt-4 w-1/4">
                            <CardContent className="pb-0">
                                <p className="text-5xl font-bold text-right mr-2 text-red-600">459</p>
                            </CardContent>
                            <CardHeader className="text-right mr-2 space-y-0 pt-3 pb-5">
                                <CardTitle className="text-xl pb-2">Aktywne błędy skanowania</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="bg-white border border-slate-100 flex flex-col items-end justify-end pt-4 w-1/4">
                            <CardContent className="pb-0">
                                <p className="text-5xl font-bold text-right mr-2 text-green-700">459</p>
                            </CardContent>
                            <CardHeader className="text-right mr-2 space-y-0 pt-3 pb-5">
                                <CardTitle className="text-xl pb-2">Naprawione błędy skanowania</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="bg-white border border-slate-100 flex flex-col items-end justify-end pt-4 w-1/4">
                            <CardContent className="pb-0">
                                <p className="text-5xl font-bold text-right mr-2">553</p>
                            </CardContent>
                            <CardHeader className="text-right mr-2 space-y-0 pt-3 pb-5">
                                <CardTitle className="text-xl pb-2">Ilość notatek z dzisiejszego dnia</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="dashboard-info flex flex-row items-top gap-4 mt-8 mx-32">
                        <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-3/4">
                            <CardHeader className="text-left ml-2 space-y-0 pt-3 pb-5">
                                <CardTitle className="text-xl pb-2">Aktywne błędy skanowania</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[150px] font-bold">ID zgłoszenia</TableHead>
                                            <TableHead>Odczytane słowo</TableHead>
                                            <TableHead>Prawidłowe słowo</TableHead>
                                            <TableHead>Data zgłoszenia</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">#11033</TableCell>
                                            <TableCell>Toster</TableCell>
                                            <TableCell>Tester</TableCell>
                                            <TableCell>31 sierpnia 2023</TableCell>
                                            <TableCell>
                                                <div className="border border-[#760B0D] text-[#760B0D] text-center font-bold text-sm py-2 px-2 w-3/5 rounded-[10px]">Niesprawdzony</div>
                                            </TableCell>
                                            <TableCell>
                                                <a href="" className="font-bold text-blue-700 text-md">Szczegóły</a>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">#11033</TableCell>
                                            <TableCell>Toster</TableCell>
                                            <TableCell>Tester</TableCell>
                                            <TableCell>31 sierpnia 2023</TableCell>
                                            <TableCell>
                                                <div className="border border-[#760B0D] text-[#760B0D] text-center font-bold text-sm py-2 px-2 w-3/5 rounded-[10px]">Niesprawdzony</div>
                                            </TableCell>
                                            <TableCell>
                                                <a href="" className="font-bold text-blue-700 text-md">Szczegóły</a>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">#11033</TableCell>
                                            <TableCell>Toster</TableCell>
                                            <TableCell>Tester</TableCell>
                                            <TableCell>31 sierpnia 2023</TableCell>
                                            <TableCell>
                                                <div className="border border-[#760B0D] text-[#760B0D] text-center font-bold text-sm py-2 px-2 w-3/5 rounded-[10px]">Niesprawdzony</div>
                                            </TableCell>
                                            <TableCell>
                                                <a href="" className="font-bold text-blue-700 text-md">Szczegóły</a>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">#11033</TableCell>
                                            <TableCell>Toster</TableCell>
                                            <TableCell>Tester</TableCell>
                                            <TableCell>31 sierpnia 2023</TableCell>
                                            <TableCell>
                                                <div className="border border-[#760B0D] text-[#760B0D] text-center font-bold text-sm py-2 px-2 w-3/5 rounded-[10px]">Niesprawdzony</div>
                                            </TableCell>
                                            <TableCell>
                                                <a href="" className="font-bold text-blue-700 text-md">Szczegóły</a>
                                            </TableCell>
                                        </TableRow>
                                        
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-1/4">
                            <CardHeader className="text-left ml-2 space-y-0 pt-3 pb-5">
                                <CardTitle className="text-xl pb-2">Historia aktualizacji modelu</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[185px] font-bold">Numer zmiany</TableHead>
                                            <TableHead>Data zmiany</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">1443</TableCell>
                                            <TableCell>31 sierpnia 2023</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">1443</TableCell>
                                            <TableCell>31 sierpnia 2023</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">1443</TableCell>
                                            <TableCell>31 sierpnia 2023</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">1443</TableCell>
                                            <TableCell>31 sierpnia 2023</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">1443</TableCell>
                                            <TableCell>31 sierpnia 2023</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </MainLayout>
            </main>
        </>
    )
}

export default AdminDashboard;


