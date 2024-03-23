import styled from 'styled-components';
import { Input } from "@/components/ui/input"


const LoginHeader = styled.h2`
  font-family: 'Lexend Deca';
`

const LeftPanel = styled.div`
  background-color: #BFE6CE;
  color: #004423;
  padding: 216px 48px;
  height: 100vh;
  h1 {
    line-height: 1.2;
    font-family: 'Space Grotesk';
  }
`

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
  return (
    <>
      <main className="grid grid-cols-2">
        <LeftPanel>
          <h1 className="mt-8 font-bold text-6xl">narzędzie, które odmieni Twoją pracę</h1>
          <p className="mt-4">nie musisz już ograniczać swojej wiedzy do jednego miejsca. myśl i pracuj, gdziekolwiek chcesz. dołącz do platformy za darmo i zeskanuj swoje notatki</p>
        </LeftPanel>
        <div className="left-panel px-24 py-16">
          <img src="./logo_black.png" alt="" />
          <LoginHeader className="text-4xl mt-24">Stwórz darmowe konto </LoginHeader>
          <p className="mt-2">Masz już konto?
            <span className="ml-1">
            <a href="" className="underline">Zaloguj się!</a>
            </span>
          </p>
          <Input type="text" placeholder="Nazwa użytkownika" className="mt-12 py-6 w-2/3 border-slate-300" />
          <Input type="email" placeholder="Adres email" className="mt-6 py-6 w-2/3 border-slate-300" />
          <Input type="password" placeholder="Hasło" className="mt-6 py-6 w-2/3 border-slate-300" />
          <Input type="password" placeholder="Powtórz hasło" className="mt-6 py-6 w-2/3 border-slate-300" />
          <p className="mt-6 text-sm">Kontynuując proces rejestracji, akceptujesz postanowienia Regulaminu.</p>
          <RegisterButton className="text-md mt-16">
            Zarejestruj się
          </RegisterButton>
        </div>
      </main>
    </>
  );
}


export default Register;
