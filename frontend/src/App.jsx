import * as motion from "motion/react-client"
import { InputBox } from "./components/InputBox"
import { Welcome } from "./pages/Welcome"
import { SignUp } from "./pages/SignUp"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignIn } from "./pages/SignIn"
import { Dashboard } from "./pages/Dashboard"
import { ProtectedRoute } from "./ProtectedRoute"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
