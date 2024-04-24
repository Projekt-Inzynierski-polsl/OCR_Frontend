import styled from "styled-components";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/AdminSidebar.jsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ACCEPTED_MODEL_TYPE = [
  "application/x-python-code",
  "application/x-pytorch",
];

const formSchema = z
  .object({
    model: z.instanceof(File),
  })
  .refine((file) => file.type === "application/x-pytorch", {
    message: "Plik musi być w formacie .pt",
    path: ["model"],
  });

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const MainLayout = styled.div`
  background-color: #f9fafb;
  font-family: "Space Grotesk";
`;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ModelButton = styled.button`
  background-color: #004423;
  color: #e9f7ee;
  font-family: "Space Grotesk";
  font-weight: bold;
  padding: 12px 32px;
  border-radius: 16px;
`;

import { useEffect, useState } from "react";
import api from "../APIService.js";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";

function UploadModel() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: new File([], ""),
    },
  });
  function onSubmit(values) {
    const formData = new FormData();
    formData.append("model", values.model);
    api
      .post("http://localhost:8051/api/model/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          //todo: implement toast when uploaded
          console.log("wysłany!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [modelUpdates, setModelUpdates] = useState([]);

  useEffect(() => {
    api
      .get("http://localhost:8051/api/model/updates", {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // todo: zmienic response w sytuacji kiedy bedzie wiadomo co bedzie wysylane i jak
          //setModelUpdates(response.data);
        } else if (response.status === 500) {
          setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  });

  return (
    <>
      <Navbar></Navbar>
      <main className="grid grid-cols-[385px_1fr]">
        <Sidebar></Sidebar>
        <MainLayout>
          <h1 className="font-bold text-3xl ml-40 mt-8">
            Model sieci neuronowej
          </h1>
          <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-3/4 mx-32 mt-8">
            <CardHeader className="text-left ml-2 space-y-0 pt-3 pb-5">
              <CardTitle className="text-xl pb-2">
                Aktualny plik modelu
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="flex flex-row items-center w-4/5">
                <img src="/zap.png" alt="" />
                <div className="flex flex-col ml-4">
                  <p className="font-bold text-md">model_prod.pt</p>
                  <p className="text-sm text-slate-700">
                    128 MB, wrzucony 1 marca 2024
                  </p>
                </div>

                <Dialog>
                  <DialogTrigger>
                    <ModelButton className="ml-12">
                      Aktualizuj model
                    </ModelButton>
                  </DialogTrigger>
                  <DialogContent className="bg-white p-8">
                    <DialogHeader>
                      <DialogTitle>Wrzuć nowy plik modelu</DialogTitle>
                      <DialogDescription>
                        Wybierz plik modelu, który chcesz wrzucić na serwer.
                        Plik musi być w formacie .pt.
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="model"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="file"
                                  accept=".pt"
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.files ? e.target.files[0] : null
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage className="text-red-700" />
                            </FormItem>
                          )}
                        />
                        <ModelButton className="text-md mt-16" type="submit">
                          Aktualizuj
                        </ModelButton>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-3/4 mx-32 mt-8">
            <CardHeader className="text-left ml-2 space-y-0 pt-3 pb-5">
              <CardTitle className="text-xl pb-2">
                Historia zmian wersji modelu
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px] font-bold">
                      Numer wersji
                    </TableHead>
                    <TableHead className="w-[250px]">Status modelu</TableHead>
                    <TableHead>Data zmiany</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modelUpdates.map((update) => (
                    <TableRow key={update.id}>
                      <TableCell className="font-medium">
                        Wersja {update.id}
                      </TableCell>
                      {update.status === "active" ? (
                        <TableCell>
                          <div className="border border-[#0072D8] text-[#0072D8] text-center font-bold text-sm py-1 px-1 w-2/3 rounded-[10px]">
                            Aktywny
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <div className="border border-[#111827] text-[#111827] text-center font-bold text-sm py-1 px-1 w-2/3 rounded-[10px]">
                            Nieaktywny
                          </div>
                        </TableCell>
                      )}
                      <TableCell>{update.date}</TableCell>
                    </TableRow>
                  ))}

                  {/* Empty state dla tabeli modelUpdates */}
                  {modelUpdates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan="3" className="text-center">
                        Brak aktualizacji
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </MainLayout>
      </main>
    </>
  );
}

export default UploadModel;
