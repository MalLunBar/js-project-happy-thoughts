import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FormInput } from "./FormInput"
import { CloseButton } from "./CloseButton"
import { useNavigate } from "react-router-dom"

export const LogInForm = () => {
  // const url = "https://js-project-api-mk0z.onrender.com/users/login"
  // Local API
  const url = "http://localhost:8080/users/login"

  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })


  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.email || !formData.password) {
      setError("Please fill in both fields");
      return;
    }

    setError("");

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Incorrect email or password.")
          } else if (res.status === 404) {
            throw new Error("User not found.")
          } else {
            throw new Error("Something went wrong. Please try again.")
          }
        }
        return res.json()

      })
      .then(data => {
        const { accessToken, userId } = data
        if (accessToken && userId) {
          localStorage.setItem("accessToken", accessToken)
          localStorage.setItem("userId", userId)
          navigate("/")

        }
        setFormData({ email: "", password: "" })
      })
      .catch(error => {
        setError(error.message)
      })

  }



  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 m-4 border p-4 shadow-[10px_10px] shadow-black bg-gray-100 rounded-xs">
      <CloseButton />
      <h1 className="text-2xl font-bold text-center mb-2">
        Login to your account
      </h1>
      <FormInput
        id={"email"}
        type={"email"}
        name={"Email"}
        label={"email"}
        placeholder={"Bob@test.com"}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        autoComplete="off"
        autoFocus={true}
      />
      <FormInput
        id={"password"}
        type={"password"}
        name={"Password"}
        label={"password"}
        placeholder={"********"}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        autoComplete="off"

      />
      {error && (
        <p className="text-red-600 text-sm text-center font-medium">
          {error}
        </p>
      )}
      <p>Dont have an account yet?</p>
      <NavLink
        to="/signup" className="underline hover:text-blue-900 hover:decoration-wavy">Sign up
      </NavLink>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Sign In
      </button>
    </form>
  )
}