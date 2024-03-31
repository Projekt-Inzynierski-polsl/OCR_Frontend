import "../common/Login.css";
import styled from "styled-components";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { Fragment, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'

const formSchema = z.object({
  email: z.string().email({ message: "Niepoprawny adres email" }),
  password: z.string(),
});

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const LoginHeader = styled.h2`
  font-family: "Lexend Deca";
`;

const RightPanel = styled.div`
  background-color: #bfe6ce;
  color: #004423;
  padding: 216px 48px;
  height: 100vh;
`;

const LoginButton = styled.button`
  background-color: #004423;
  color: #e9f7ee;
  font-family: "Space Grotesk";
  font-weight: bold;
  padding: 12px 96px;
  border-radius: 16px;
`;

function Login() {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values) => {
      await axios.post(
        "http://localhost:8051/api/account/login",
        values
      ).then((response) => {
        if (response.status === 200) {
          Cookies.set("authToken", response.data, { path: "/" })
          window.location.href = "/notes";
        }
        else if (response.status === 500) {
          setErrorMessage("Błąd serwera. Spróbuj ponownie później.")
        }
      }).catch((error) => {
        setErrorMessage("Niepoprawne dane logowania")
      });
  }

  if (Cookies.get('authToken')) {
    window.location.href = '/notes';
  }
  else {
    return (
      <>
        <main className="grid grid-cols-2">
          <div className="left-panel px-24 py-16">
            <img src="./logo_black.png" alt="" />
            <LoginHeader className="text-4xl mt-24">
              Zaloguj się do platformy
            </LoginHeader>
            <p className="mt-2">
              Nie masz jeszcze konta?
              <span className="ml-1">
                <a href="/register" className="underline">
                  Zarejestruj się za darmo!
                </a>
              </span>
            </p>
            <p className="font-bold text-red-700 mt-16 mb-0">{errorMessage}</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Adres email"
                          className="mt-6 py-6 w-2/3 border-slate-300"
                          onChange={(e) => setUsername(e.target.value)}
                          {...field}
                        />
                      </FormControl>
  
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Hasło"
                          className="mt-6 py-6 w-2/3 border-slate-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
                <LoginButton type="submit" className="text-md mt-10">
                  Zaloguj się
                </LoginButton>
              </form>
            </Form>
          </div>
          <RightPanel>
            <h1 className="mt-8 font-bold text-5xl">
              wszystko, czego potrzebują Twoje notatki
            </h1>
            <p className="mt-4">
              nie musisz już ograniczać swojej wiedzy do jednego miejsca. myśl i
              pracuj, gdziekolwiek chcesz. dołącz do platformy za darmo i
              zeskanuj swoje notatki
            </p>
          </RightPanel>
        </main>
      </>
    );
  }
  
}

export default Login;
