import styled from "styled-components";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/AdminSidebar.jsx";

const MainLayout = styled.div`
  background-color: #f9fafb;
  font-family: "Space Grotesk", sans-serif;
`;
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";

const SaveChangesButton = styled.button`
  background-color: #004423;
  color: #e9f7ee;
  font-family: "Space Grotesk", sans-serif;
  font-weight: bold;
  padding: 12px 96px;
  border-radius: 16px;
`;

const DeleteAccountButton = styled.button`
  border: 1px solid #760b0d;
  color: #760b0d;
  font-family: "Space Grotesk", sans-serif;
  font-weight: bold;
  padding: 12px 96px;
  border-radius: 16px;
`;

function EditProfile() {
  return (
    <>
      <Navbar></Navbar>
      <main className="grid grid-cols-[385px_1fr]">
        <Sidebar></Sidebar>
        <MainLayout>
          <h1 className="font-bold text-3xl ml-40 mt-8">
            Profil użytkownika tester
          </h1>
          <div className="dashboard-info gap-4 mt-8 mx-32">
            <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-3/5">
              <CardContent className="pb-6 pl-16 pt-6 mr-64">
                <div className="text-inputs grid grid-cols-2 gap-16">
                  <div className="input-container">
                    <p className="font-bold text-lg mb-2">Nazwa użytkownika</p>
                    <Input
                      type="text"
                      className="py-6 border-slate-300"
                      value="toster"
                    />
                  </div>
                  <div className="input-container">
                    <p className="font-bold text-lg mb-2">Adres e-mail</p>
                    <Input
                      type="email"
                      className="py-6 border-slate-300"
                      value="tester"
                    />
                  </div>
                </div>
                <p className="text-xl font-bold mt-8">Konto użytkownika</p>
                <div className="flex items-center space-x-4 mt-6">
                  <Checkbox id="admin" />
                  <Label htmlFor="admin">Ma uprawnienia administratora</Label>
                </div>
                <SaveChangesButton className="float-right mt-8">
                  Zapisz zmiany
                </SaveChangesButton>
              </CardContent>
            </Card>
            <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-3/5 mt-8">
              <CardHeader className="text-left ml-2 space-y-0 pt-3 pb-5 pl-14">
                <CardTitle className="text-2xl font-bold pb-2 text-[#760B0D]">
                  Usuń konto
                </CardTitle>
                <CardDescription>
                  Uwaga! Tej czynności nie da się odwrócić i konto zostanie
                  usunięte bezpowrotnie!
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6 pl-16 mr-64">
                <Dialog>
                  <DialogTrigger asChild>
                    <DeleteAccountButton className="mt-8">
                      Usuń konto użytkownika
                    </DeleteAccountButton>
                  </DialogTrigger>
                  <DialogContent className="bg-white p-8 max-w-[720px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-red-700 mb-2">
                        Czy na pewno chcesz usunąć konto użytkownika?
                      </DialogTitle>
                      <DialogDescription>
                        <p className="mb-6">
                          Tej czynności nie można cofnąć!
                        </p>
                        <DeleteAccountButton className="mt-2">
                            Usuń konto użytkownika
                        </DeleteAccountButton>
                        
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-3/5 mt-8">
              <CardHeader className="text-left ml-2 space-y-0 pt-3 pb-5 pl-14">
                <CardTitle className="text-2xl font-bold pb-2">
                  Aktywność użytkownika
                </CardTitle>
                <CardDescription>Tabela z logami użytkownika.</CardDescription>
              </CardHeader>
              <CardContent className="pb-6 pl-16 mr-64">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold w-[216px]">
                        Data i godzina zdarzenia
                      </TableHead>
                      <TableHead>Rodzaj zdarzenia</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        31 marca 2024 14:12
                      </TableCell>
                      <TableCell>Poprawne zalogowanie do konta</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        31 marca 2024 14:12
                      </TableCell>
                      <TableCell>Poprawne zalogowanie do konta</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        31 marca 2024 14:12
                      </TableCell>
                      <TableCell>Poprawne zalogowanie do konta</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        31 marca 2024 14:12
                      </TableCell>
                      <TableCell>Poprawne zalogowanie do konta</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        31 marca 2024 14:12
                      </TableCell>
                      <TableCell>Poprawne zalogowanie do konta</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        31 marca 2024 14:12
                      </TableCell>
                      <TableCell>Poprawne zalogowanie do konta</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        31 marca 2024 14:12
                      </TableCell>
                      <TableCell>Poprawne zalogowanie do konta</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        31 marca 2024 14:12
                      </TableCell>
                      <TableCell>Poprawne zalogowanie do konta</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </MainLayout>
      </main>
    </>
  );
}

export default EditProfile;
