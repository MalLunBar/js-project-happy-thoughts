import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainSection } from "./section/MainSection"
import { Header } from "./section/Header"
import { SignUp } from "./section/SignUp"
import { LogIn } from "./section/LogIn"

export const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <section className="max-w-md min-h-screen px-5 mx-auto">
                <MainSection />
              </section>
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Header />
              <section className="max-w-md min-h-screen px-5 py-10 mx-auto">
                <SignUp />
              </section>
            </>
          } />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <section className="max-w-md min-h-screen px-5 py-10 mx-auto">
                <LogIn />
              </section>
            </>
          } />
      </Routes>
    </BrowserRouter>

  )
}
