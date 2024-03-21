import "../common/Home.css";
import Navbar from "../components/Navbar.jsx";
import styled from 'styled-components';

const HeroHeader = styled.h1`
  font-family: 'Space Grotesk';

`;

function Home() {
  return (
    <>
      <header>
        <Navbar></Navbar>
        <div className="hero w-screen flex flex-col justify-center items-center py-24">
          <HeroHeader className="text-6xl font-bold">
            cyfrowy dom dla <span className="colored">Twoich notatek.</span>
          </HeroHeader>
          <p className="text-lg mt-6">
            skanuj swoje notatki z zeszytu szybko i sprawnie. nie musisz
            przepisywać ich ręcznie.
          </p>
          <a href="" className="btn text-xl mt-16">
            Sprawdź platformę
            <img src="/arrow.svg" alt="" />
          </a>
        </div>
      </header>
      <main>
        <div className="content ml-64 mt-32 grid grid-cols-2 gap-16">
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
        <div className="features text-center mt-32 mb-64 relative flex flex-col items-center">
          <h2 className="font-bold text-5xl mt-2 mb-24">notuj w trzech krokach!</h2>
          <div className="steps mt-16 rounded-3xl absolute top-12 left-1/5 px-4 py-6">
            <a href="" className="step step__active py-2 px-4 font-bold text-md rounded-full">Zrób zdjęcie</a>
            <a href="" className="step py-2 px-4 font-bold text-md rounded-full">Zeskanuj tekst</a>
            <a href="" className="step py-2 px-4 font-bold text-md rounded-full">Edytuj notatkę</a>
          </div>
          <div className="step-container grid grid-cols-2 p-32 gap-8 mx-72">
            <div className="step-container__text-container">
              <h3 className="text-4xl font-bold text-left">
                zrób zdjęcie swoim aparatem
              </h3>
              <p className="text-left mt-2">
                wystarczy wyłącznie jedno zdjęcie, by zeskanować Twoją notatkę.
                ułatwisz pracę naszemu systemowi, jeżeli zadbasz o dobre
                oświetlenie Twojego zdjęcia i jego ostrość. dzięki temu
                dokładność będzie znacznie wyższa.
              </p>
            </div>
          </div>
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
          <div className="flex flex-row gap-8 mt-8 my-32">
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
          <h3 className="tracking-widest uppercase font-bold text-md text-right mr-64">
            Opinie użytkowników
          </h3>
          <h2 className="font-bold text-4xl mt-2 text-right mr-64">
            sprawdź, co mówią nasi użytkownicy!
          </h2>
          <p className="text-right max-w-4xl float-right mt-4 mr-64">
            uwaga. nasi użytkownicy nie istnieją, bo to projekt inżynierski i
            nikt z tego nie będzie korzystać. twarze wygenerowane są z użyciem
            Pravatar, który zapewnia je na licencji CC0. opinie wygenerowałem
            Gemini i git. (wypełniacz tekstu, oficjalnie będzie coś innego)
          </p>
          <div className="opinions-container mt-40 mx-64 grid grid-cols-3 gap-8 items-center">
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
          <a href="" className="btn text-xl mt-16">
            Sprawdź platformę
            <img src="/arrow.svg" alt="" />
          </a>
        </div>
      </main>
      <footer>
        <div className="logo flex flex-col ml-64 py-24">
          <img src="/logo.svg" alt="" className="w-32" />
          <p className="mt-4">projektowany z myślą o Tobie</p>
        </div>
        <p className="text-center pb-4">wykonano w 2024 przez avenq, undefined i zerdzinskiego</p>
      </footer>
    </>
  );
}

export default Home;
