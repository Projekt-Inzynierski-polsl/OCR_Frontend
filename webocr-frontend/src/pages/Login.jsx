import "../common/Login.css";
import styled from 'styled-components';
import { Input } from "@/components/ui/input"


const LoginHeader = styled.h2`
  font-family: 'Lexend Deca';
`

const RightPanel = styled.div`
  background-color: #BFE6CE;
  color: #004423;
  padding: 216px 48px;
  height: 100vh;
`

const LoginButton = styled.button`
  background-color: #004423;
  color: #e9f7ee;
  font-family: "Space Grotesk";
  font-weight: bold;
  padding: 12px 96px;
  border-radius: 16px;
`;

function Login() {
  return (
    <>
      <main className="grid grid-cols-2">
        <div className="left-panel px-24 py-16">
          <img src="./logo_black.png" alt="" />
          <LoginHeader className="text-4xl mt-24">Zaloguj się do platformy</LoginHeader>
          <p className="mt-2">Nie masz jeszcze konta? 
            <span class="ml-1">
            <a href="" className="underline">Zarejestruj się za darmo!</a>
            </span>
          </p>
          <Input type="text" placeholder="Adres email lub nazwa użytkownika" className="mt-12 py-6 w-2/3" />
          <Input type="password" placeholder="Hasło" className="mt-6 py-6 w-2/3" />
          <LoginButton className="text-md mt-10">
            Zaloguj się
        </LoginButton>
        </div>
        <RightPanel>
          <h1 className="mt-8 font-bold text-5xl">wszystko, czego potrzebują Twoje notatki</h1>
          <p className="mt-4">nie musisz już ograniczać swojej wiedzy do jednego miejsca. myśl i pracuj, gdziekolwiek chcesz. dołącz do platformy za darmo i zeskanuj swoje notatki</p>
        </RightPanel>
        
      </main>
    </>
  );
}


export default Login;
