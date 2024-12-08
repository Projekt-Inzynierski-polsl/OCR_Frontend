import "../common/Home.css";
import styled from "styled-components";

const HeroHeader = styled.h1`
  font-family: "Space Grotesk";
`;
import api from "../APIService.js";
const HomeNavbar = styled.header`
  background-color: #00844e;
  color: #e9f7ee;
`;
import Cookies from "js-cookie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

import { useNavigate, useLocation } from 'react-router-dom'
function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("authToken", { path: "/" });
    navigate('/')
  };
  const [userData, setUserData] = useState({});
  useEffect(() => {
    api
      .get("http://localhost:8051/api/user/logged", {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
  }, []);

  return (
    <>
      <HomeNavbar>
        <nav className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-96 lg:pt-8 pt-12 ">
          <img src="/logo.svg" alt="" />
          {Cookies.get("authToken") ? (
            <div className="user-container flex flex-row items-center">
              <div className="user ml-4">
                <p className="user text-lg">{userData.nickname}</p>
                <p className="email text-sm">{userData.email}</p>
              </div>
              <button
                className="flex flex-row items-center ml-10 gap-2"
                onClick={handleLogout}
              >
                <img src="/log-out.svg" alt="" />
                Wyloguj się
              </button>
            </div>
          ) : (
            <div className="button-container flex flex-col lg:flex-row items-center gap-8 mt-8">
              <a href="/login" className="text-lg btn__secondary">
                Zaloguj się
              </a>
              <a href="/register" className="text-lg btn__inverse">
                Zarejestruj się
              </a>
            </div>
          )}
        </nav>
        <div className="hero w-screen flex flex-col justify-center items-center py-24">
          <HeroHeader className="text-4xl text-center lg:text-6xl font-bold">
            cyfrowy dom dla <span className="colored mt-2 max-md:block">Twoich notatek.</span>
          </HeroHeader>
          <p className="text-lg mt-6 text-center mx-8 lg:mx-0">
            skanuj swoje notatki z zeszytu szybko i sprawnie. nie musisz
            przepisywać ich ręcznie.
          </p>
          <a href="/notes" className="btn text-xl mt-16">
            Sprawdź platformę
            <img src="/arrow.svg" alt="" />
          </a>
        </div>
      </HomeNavbar>
      <main>
        <div className="content mx-8 lg:ml-64 mt-32 grid lg:grid-cols-2 gap-16">
          <div className="text">
            <h3 className="tracking-widest uppercase font-bold text-md">
              Jak to działa?
            </h3>
            <h2 className="font-bold text-4xl mt-2">wiedza napędzana AI</h2>
            <p className="mt-4 max-w-2xl">
              dzięki wykorzystaniu sztucznej inteligencji i pracy naszych
              naukowców, jednym pstryknięciem aparatu zmienisz zapisaną w
              zeszycie notatkę w wygodny do edycji dokument, który możesz
              edytować jak zwykły dokument.
            </p>
          </div>
          <img src="/alexander-sinn_ai-heart.png" alt="" />
        </div>
        <div className="features text-center mt-32 mb-64 relative flex flex-col items-center justify-center">
          <h2 className="font-bold text-5xl mt-2 mb-8 lg:mb-24">
            notuj w trzech krokach!
          </h2>
          <Tabs defaultValue="photo" className="" data-orientation="vertical">
            <TabsList className="lg:mt-16 mt-6 rounded-3xl mx-4 lg:absolute lg:top-12 lg:px-4 py-6 bg-[#004423] lg:left-[30%] xl:left-[38%] max-md:flex max-md:flex-col gap-4 max-md:px-4">
              <TabsTrigger
                value="photo"
                className="step data-[state=active]:bg-[#e9f7ee] py-2 px-4 font-bold text-md rounded-full"
              >
                Zrób zdjęcie
              </TabsTrigger>
              <TabsTrigger
                value="scan"
                className="step data-[state=active]:bg-[#e9f7ee] py-2 px-4 font-bold text-md rounded-full"
              >
                Zeskanuj tekst
              </TabsTrigger>
              <TabsTrigger
                value="edit"
                className="step data-[state=active]:bg-[#e9f7ee] py-2 px-4 font-bold text-md rounded-full"
              >
                Edytuj notatkę
              </TabsTrigger>
            </TabsList>
            <TabsContent value="photo">
              <div className="step-container grid lg:grid-cols-2 p-16 md:p-32 gap-8 xl:mx-72 mx-2 md:mx-4">
                <div className="step-container__text-container">
                  <h3 className="text-4xl font-bold text-left">
                    zrób zdjęcie swoim aparatem
                  </h3>
                  <p className="text-left mt-2">
                    wystarczy wyłącznie jedno zdjęcie, by zeskanować Twoją
                    notatkę. ułatwisz pracę naszemu systemowi, jeżeli zadbasz o
                    dobre oświetlenie Twojego zdjęcia i jego ostrość. dzięki
                    temu dokładność będzie znacznie wyższa.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="scan">
              <div className="step-container grid lg:grid-cols-2 p-16 md:p-32 gap-8 xl:mx-72 mx-2 md:mx-4">
                <div className="step-container__text-container">
                  <h3 className="text-4xl font-bold text-left">
                    zeskanuj notatkę korzystając z OCR
                  </h3>
                  <p className="text-left mt-2">
                    wykorzystaj nasz algorytm, by przekształcić zdjęcie w tekst.
                    nasz system rozpozna pismo odręczne i przekształci je w
                    cyfrowy dokument, który możesz edytować.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="edit">
              <div className="step-container grid lg:grid-cols-2 p-16 md:p-32 gap-8 xl:mx-72 mx-2 md:mx-4">
                <div className="step-container__text-container">
                  <h3 className="text-4xl font-bold text-left">
                    edytuj uzyskaną notatkę
                  </h3>
                  <p className="text-left mt-2">
                    po zeskanowaniu, możesz edytować swoją notatkę tak, jakbyś
                    pracował na zwykłym dokumencie. dodawaj, usuwaj, formatuj i
                    zapisuj swoje notatki w jednym miejscu.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="target flex flex-col items-center">
          <h3 className="tracking-widest uppercase font-bold text-md text-center pt-10">
            Dla kogo?
          </h3>
          <h2 className="font-bold text-4xl mt-2 text-center">
            zaprojektowany dla każdego fana kartki i długopisu
          </h2>
          <p className="text-center mt-2 mb-8">
            sprawdź, jak możemy pomóc Ci w codziennej pracy z Twoimi notatkami
          </p>
          <div className="flex lg:flex-row flex-col gap-8 mt-8 my-32 mx-8 md:mx-0">
            <div className="persona relative">
              <img src="/student.png" alt="" />
              <h3 className="absolute top-8 left-6 font-bold text-3xl">
                dla uczniów i studentów
              </h3>
              <p className="absolute bottom-8 left-6">
                wiele przedmiotów? możesz dzielić je na foldery, w których
                notatki organizują się same!
              </p>
            </div>
            <div className="persona relative">
              <img src="/prof.png" alt="" />
              <h3 className="absolute top-8 left-6 font-bold text-3xl">
                dla profesjonalistów
              </h3>
              <p className="absolute bottom-8 left-6">
                zero zabłąkanych kartek z notatkami ze spotkań. udostępnij
                notatki swojemu zespołowi!
              </p>
            </div>
            <div className="persona relative">
              <img src="/business.png" alt="" />
              <h3 className="absolute top-8 left-6 font-bold text-3xl">
                dla biznesu
              </h3>
              <p className="absolute bottom-8 left-6">
                zorganizuj wszystkie swoje firmowe dokumenty w jednym miejscu,
                któremu możesz zaufać
              </p>
            </div>
          </div>
        </div>
        <div className="testimonials mt-32">
          <h3 className="tracking-widest uppercase font-bold text-md lg:text-right lg:mr-64 text-center">
            Opinie użytkowników
          </h3>
          <h2 className="font-bold text-4xl lg:mt-2 lg:text-right lg:mr-64 text-center mt-4">
            sprawdź, co mówią nasi użytkownicy!
          </h2>
          <div className="opinions-container mt-8 lg:mt-40 mx-4 lg:mx-64 grid xl:grid-cols-3 gap-8 items-center">
            <div className="opinion py-10 px-8 flex flex-col justify-between gap-y-24">
              <p className="text-xl">
                “Ten system to <b>prawdziwy game-changer!</b> Szybko i sprawnie
                konwertuje moje notatki ręczne na tekst cyfrowy, oszczędzając mi
                mnóstwo czasu i wysiłku. Polecam wszystkim!”
              </p>
              <div className="user-container flex flex-row items-center gap-4">
                <img src="/user1.png" alt="" />
                <div className="name flex flex-col">
                  <p className="font-bold text-md">Martyna Adamska</p>
                  <p className="title text-sm">studentka</p>
                </div>
              </div>
            </div>
            <div className="opinion py-10 px-8 flex flex-col justify-between gap-y-24">
              <p className="text-xl">
                “Byłem sceptycznie nastawiony do systemów OCR, ale pozytywnie
                mnie zaskoczył! Rozpoznaje pismo odręczne z dużą dokładnością,
                nawet gdy moje notatki są nieczytelne. Super!”
              </p>
              <div className="user-container flex flex-row items-center gap-4">
                <img src="/user2.png" alt="" />
                <div className="name flex flex-col">
                  <p className="font-bold text-md">Marcin Żurawski</p>
                  <p className="title text-sm">Sales Director @ ZHSA</p>
                </div>
              </div>
            </div>
            <div className="opinion py-10 px-8 flex flex-col justify-between gap-y-24">
              <p className="text-xl">
                “Ten system OCR to prawdziwe wyzwanie dla tradycyjnych metod
                notowania. Jest szybki, wydajny i oferuje wiele funkcji. Idealne
                narzędzie do zarządzania wiedzą!”
              </p>
              <div className="user-container flex flex-row items-center gap-4">
                <img src="/user3.png" alt="" />
                <div className="name flex flex-col">
                  <p className="font-bold text-md">Jan Polański</p>
                  <p className="title text-sm">CEO/Founder @ ezPresso</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="last-cta flex flex-col items-center justify-center mt-48 mb-16">
          <h3 className="tracking-widest uppercase font-bold text-md text-center">
            Platforma #1 do notatek
          </h3>
          <h2 className="font-bold text-4xl mt-4 text-center max-w-4xl">
            zapomnij o jednym zeszycie do wszystkiego. zorganizuj swoje notatki
            już teraz!
          </h2>
          <a href="/notes" className="btn text-xl mt-16">
            Sprawdź platformę
            <img src="/arrow.svg" alt="" />
          </a>
        </div>
      </main>
      <footer>
        <div className="logo flex flex-col lg:ml-64 py-16 lg:py-24">
          <img src="/logo.svg" alt="" className="w-32 ml-8 md:ml-0" />
          <p className="mt-4 ml-8 md:ml-0">projektowany z myślą o Tobie</p>
        </div>
        <p className="text-center pb-4">
          wykonano w 2024
        </p>
      </footer>
    </>
  );
}

export default Home;
