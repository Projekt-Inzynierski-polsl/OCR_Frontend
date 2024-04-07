import styled from "styled-components";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from 'js-cookie'

const formSchema = z
  .object({
    nickname: z
      .string()
      .min(3, { message: "Nazwa użytkownika jest za krótka" }),
    email: z.string().email({ message: "Niepoprawny adres email" }),
    password: z.string().min(5, { message: "Hasło jest za krótkie" }),
    confirmedPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Hasła nie są takie same",
    path: ["confirmedPassword"],
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

const LeftPanel = styled.div`
  background-color: #bfe6ce;
  color: #004423;
  padding: 216px 48px;
  height: 100vh;
  h1 {
    line-height: 1.2;
    font-family: "Space Grotesk";
  }
`;

const RegisterButton = styled.button`
  background-color: #004423;
  color: #e9f7ee;
  font-family: "Space Grotesk";
  font-weight: bold;
  padding: 12px 96px;
  border-radius: 16px;
  float: right;
  margin-right: 256px;
`;

function Register() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values) => {
    await axios.post(
      "http://localhost:8051/api/account/register",
      values
    ).then((response) => {
      if (response.status === 200) {
        Cookies.set("authToken", response.data, { path: "/" })
        window.location.href = "/notes";
      }
    }).catch((error) => {
      setErrorMessage(error)
    });
}

  return (
    <>
      <main className="grid grid-cols-2">
        <LeftPanel>
          <h1 className="mt-8 font-bold text-6xl">
            narzędzie, które odmieni Twoją pracę
          </h1>
          <p className="mt-4">
            nie musisz już ograniczać swojej wiedzy do jednego miejsca. myśl i
            pracuj, gdziekolwiek chcesz. dołącz do platformy za darmo i zeskanuj
            swoje notatki
          </p>
        </LeftPanel>
        <div className="left-panel px-24 py-16">
          <img src="./logo_black.png" alt="" />
          <LoginHeader className="text-4xl mt-24">
            Stwórz darmowe konto
          </LoginHeader>
          <p className="mt-2">
            Masz już konto?
            <span className="ml-1">
              <a href="/login" className="underline">
                Zaloguj się!
              </a>
            </span>
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Nazwa użytkownika"
                        className="mt-12 py-6 w-2/3 border-slate-300"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Adres email"
                        className="mt-6 py-6 w-2/3 border-slate-300"
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
              <FormField
                control={form.control}
                name="confirmedPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Powtórz hasło"
                        className="mt-6 py-6 w-2/3 border-slate-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
              <p className="mt-6 text-sm">
                Kontynuując proces rejestracji, akceptujesz postanowienia
                Regulaminu.
              </p>
              <RegisterButton className="text-md mt-16" type="submit">
                Zarejestruj się
              </RegisterButton>
            </form>
          </Form>
        </div>
      </main>
    </>
  );
}

export default Register;
