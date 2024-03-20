import './Navbar.css'

function Navbar() {
    return (
      <>
          <nav className='flex flex-row items-center justify-between px-96 pt-8'>
            <img src="/logo.svg" alt="" />
            <div className="button-container flex flex-row items-center gap-8">
            <a href="" className='text-lg btn__secondary'>Zaloguj się</a>
            <a href="" className="text-lg btn__inverse">Zarejestruj się</a>
            </div>
          </nav>  
      </>
    )
  }
  
export default Navbar;