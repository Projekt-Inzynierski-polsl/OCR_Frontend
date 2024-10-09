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
  height: 100vh;
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

              </div>
            </CardContent>
          </Card>
        </MainLayout>
      </main>
    </>
  );
}

export default UploadModel;
