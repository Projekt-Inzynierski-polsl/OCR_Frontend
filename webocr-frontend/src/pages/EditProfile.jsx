import styled from "styled-components";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/AdminSidebar.jsx";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import api from "../APIService.js";
import Cookies from "js-cookie";

const formSchema = z.object({
  nickname: z.string().min(1, { message: "Nazwa użytkownika jest za krótka" }),
  email: z.string().email({ message: "Niepoprawny adres email" }),
  admin: z.boolean().default(false),
});
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

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

import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function EditProfile() {
  const { userId } = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      email: "",
    },
  });
  const { toast } = useToast();
  const [adminChecked, setAdminChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userActions, setUserActions] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const handleSubmit = (values) => {
    api
    .put(`http://localhost:8051/api/user/${userId}`, {
      email: values.email,
      nickname: values.nickname,
      roleId: values.admin ? 1 : 2,
    }, {
      headers: {
        Authorization: `Bearer ${Cookies.get("authToken")}`,
      },
    })
    .then((response) => {
      setCurrentUser({
        nickname: values.nickname,
        email: values.email,
        roleId: values.admin ? 1 : 2,
      });
      toast({
        title: "Zapisano zmiany!",
      });
      form.setValue("nickname", values.nickname);
      form.setValue("email", values.email);
      if (values.admin === 1) {
        form.setValue("admin", true);
      }
    })
  };

  const actionDictionary = {
    1: "Rejestracja",
    2: "Zalogowano",
    3: "Odświeżenie tokena",
    4: "Wylogowanie",
    5: "Stworzono folder",
    6: "Usunięto folder",
    7: "Zaktualizowano folder",
    8: "Zablokowano folder",
    9: "Odblokowano folder",
    10: "Stworzono notatkę",
    12: "Usunięto notatkę",
    13: "Zaktualizowano notatkę",
    14: "Zmieniono folder notatki",
    15: "Zaktualizowano kategorię notatki",
    16: "Zgłoszono błąd",
    17: "Zaktualizowano profil",
    18: "Usunięto użytkownika",
    19: "Usunięto błąd",
    20: "Wyczyszczono tabelę błędów",
    21: "Dodano kategorię",
    22: "Usunięto kategorię",
    23: "Zaktualizowano kategorię",
    24: "Udostępniono notatkę",
    25: "Udostępniono folder",
  };

  const handleUserActions = async (values) => {
    const actions = values.map((action) => {
      const actionDate = new Date(action.logTime.trim());
      return {
        id: action.id,
        date: actionDate.toLocaleString(),
        action: actionDictionary[action.actionId],
      };
    });
    setUserActions(actions);
  };

  const handleDelete = async () => {
    await api
      .delete(`http://localhost:8051/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          window.location.href = "/users";
        } else if (response.status === 500) {
          setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    api
      .get(`http://localhost:8051/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        setCurrentUser(response.data);
        form.setValue("nickname", response.data.nickname);
        form.setValue("email", response.data.email);
        if (response.data.roleId === 1) {
          form.setValue("admin", true);
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
    api
      .get(`http://localhost:8051/api/userLog`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        setMaxPage(Math.ceil(response.data.items.length / 10));
      });
    getPaginatedUserActions();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(100);
  const getPaginatedUserActions = () => {
    api
      .get(`http://localhost:8051/api/userLog`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
        params: {
          userId: userId,
          pageSize: 10,
          pageNumber: currentPage,
        },
      })
      .then((response) => {
        handleUserActions(response.data.items);
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <main className="grid grid-cols-[385px_1fr]">
        <Sidebar></Sidebar>
        <MainLayout>
          <h1 className="font-bold text-3xl ml-40 mt-8">
            Profil użytkownika {currentUser.nickname}
          </h1>
          <div className="dashboard-info gap-4 mt-8 mx-32">
            <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-3/5">
              <Form {...form}>
                <CardContent className="pb-6 pl-16 pt-6 mr-64">
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-8"
                  >
                    <p className="font-bold text-red-700 mb-4 mt-6"></p>
                    <div className="text-inputs grid grid-cols-2 gap-16">
                      <div className="input-container">
                        <p className="font-bold text-lg mb-2">
                          Nazwa użytkownika
                        </p>
                        <FormField
                          control={form.control}
                          name="nickname"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="text"
                                    className="py-6 border-slate-300"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                      <div className="input-container">
                        <p className="font-bold text-lg mb-2">Adres e-mail</p>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="email"
                                    className="py-6 border-slate-300"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-xl font-bold mt-8">Konto użytkownika</p>
                    <div className="flex flex-row items-center">
                      <FormField
                        control={form.control}
                        name="admin"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-center space-y-0 gap-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div>
                              <FormLabel>
                                Ma uprawnienia administratora
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <SaveChangesButton
                      className="float-right mt-8"
                      type="submit"
                    >
                      Zapisz zmiany
                    </SaveChangesButton>
                  </form>
                </CardContent>
              </Form>
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
                        <p className="mb-6">Tej czynności nie można cofnąć!</p>
                        <DeleteAccountButton
                          className="mt-2"
                          onClick={handleDelete}
                        >
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
                    {userActions.length > 0 ? (
                      userActions.map((action) => (
                        <TableRow key={action.id}>
                          <TableCell className="font-medium">
                            {action.date}
                          </TableCell>
                          <TableCell>{action.action}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="2" className="text-center">
                          Brak akcji użytkownika
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50 select-none"
                            : "cursor-pointer select-none"
                        }
                        onClick={() => {
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                            getPaginatedUserActions();
                          }
                        }}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        className={
                          currentPage === maxPage
                            ? "pointer-events-none opacity-50 select-none"
                            : "cursor-pointer select-none"
                        }
                        onClick={() => {
                          if (currentPage < maxPage) {
                            setCurrentPage(currentPage + 1);
                            getPaginatedUserActions();
                          }
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </div>
        </MainLayout>
      </main>
    </>
  );
}

export default EditProfile;
