import Navbar from "../components/Navbar.jsx";
import styled from "styled-components";

const FirstNoteHero = styled.div`
  background-color: #bfe6ce;
  color: #374151;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

import React from "react";
function Unauthorized() {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="flex flex-col items-center">
        <FirstNoteHero className="py-16 w-full">
          <h1 className="text-5xl font-bold">Błąd 403</h1>
          <p className="max-w-3xl text-center mt-4 text-md">
            Nie masz uprawnień do tej akcji. Zaloguj się na konto administratora.
          </p>
        </FirstNoteHero>
      </main>
    </>
  );
}

export default Unauthorized;
