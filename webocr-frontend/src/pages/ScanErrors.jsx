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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


function ScanErrors() {
    return (
        <>
            <Navbar></Navbar>
            <main className="grid grid-cols-[385px_1fr]">
                <Sidebar></Sidebar>
                <MainLayout>
                    <h1 className="font-bold text-3xl ml-40 mt-8">Błędy skanowania</h1>
                    <div className="dashboard-info flex flex-row items-top gap-4 mt-8 mx-32">
                        <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-4/5">
                            <CardHeader className="text-left ml-2 space-y-0 pt-3 pb-5">
                                <CardTitle className="text-xl pb-2">Lista błędów</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[200px] font-bold">ID błędu</TableHead>
                                            <TableHead>Odczytane słowo</TableHead>
                                            <TableHead>Zmienione słowo</TableHead>
                                            <TableHead>Status błędu</TableHead>
                                            <TableHead>Data błędu</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">#13048</TableCell>
                                            <TableCell>Toster</TableCell>
                                            <TableCell>Tester</TableCell>
                                            <TableCell>
                                                <div
                                                    className="border border-[#760B0D] text-[#760B0D] text-center font-bold text-sm py-2 px-2 w-3/5 rounded-[10px]">Niesprawdzony
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                            1 marca 2024 22:22
                                            </TableCell>
                                            <TableCell>
                                                <a href="" className="font-bold text-blue-700 text-md">Sprawdź błąd</a>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">#13048</TableCell>
                                            <TableCell>Toster</TableCell>
                                            <TableCell>Tester</TableCell>
                                            <TableCell>
                                                <div
                                                    className="border border-[#760B0D] text-[#760B0D] text-center font-bold text-sm py-2 px-2 w-3/5 rounded-[10px]">Niesprawdzony
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                1 marca 2024 22:22
                                            </TableCell>
                                            <TableCell>
                                                <a href="" className="font-bold text-blue-700 text-md">Sprawdź błąd</a>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">#13048</TableCell>
                                            <TableCell>Toster</TableCell>
                                            <TableCell>Tester</TableCell>
                                            <TableCell>
                                                <div
                                                    className="border border-[#760B0D] text-[#760B0D] text-center font-bold text-sm py-2 px-2 w-3/5 rounded-[10px]">Niesprawdzony
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                1 marca 2024 22:22
                                            </TableCell>
                                            <TableCell>
                                                <a href="" className="font-bold text-blue-700 text-md">Sprawdź błąd</a>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">#13048</TableCell>
                                            <TableCell>Toster</TableCell>
                                            <TableCell>Tester</TableCell>
                                            <TableCell>
                                                <div
                                                    className="border border-[#760B0D] text-[#760B0D] text-center font-bold text-sm py-2 px-2 w-3/5 rounded-[10px]">Niesprawdzony
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                1 marca 2024 22:22
                                            </TableCell>
                                            <TableCell>
                                                <a href="" className="font-bold text-blue-700 text-md">Sprawdź błąd</a>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">#13048</TableCell>
                                            <TableCell>Toster</TableCell>
                                            <TableCell>Tester</TableCell>
                                            <TableCell>
                                                <div
                                                    className="border border-[#760B0D] text-[#760B0D] text-center font-bold text-sm py-2 px-2 w-3/5 rounded-[10px]">Niesprawdzony
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                1 marca 2024 22:22
                                            </TableCell>
                                            <TableCell>
                                                <a href="" className="font-bold text-blue-700 text-md">Sprawdź błąd</a>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">#13048</TableCell>
                                            <TableCell>Toster</TableCell>
                                            <TableCell>Tester</TableCell>
                                            <TableCell>
                                                <div
                                                    className="border border-[#760B0D] text-[#760B0D] text-center font-bold text-sm py-2 px-2 w-3/5 rounded-[10px]">Niesprawdzony
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                1 marca 2024 22:22
                                            </TableCell>
                                            <TableCell>
                                                <a href="" className="font-bold text-blue-700 text-md">Sprawdź błąd</a>
                                            </TableCell>
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

export default ScanErrors;


