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

  const [error, setError] = useState({})
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/


  const clearFieldError = (field) => {
    setError((prev) => {
      const updated = { ...prev }
      delete updated[field]
      return updated
    })

  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const fieldErrors = {}
    if (!emailRegex.test(formData.email)) {
      fieldErrors.email = "Please enter a valid email address."
    }
    if (!formData.password) {
      fieldErrors.password = "Please enter your password."
    }

    if (Object.keys(fieldErrors).length) {
      setError(fieldErrors)
      return
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        if (response.status === 401) { throw new Error("Incorrect email or password.") }
        if (response.status === 404) { throw new Error("User not found.") }

        throw new Error("Something went wrong. Please try again.")
      }

      const { accessToken, userId } = await response.json()
      if (accessToken && userId) {
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("userId", userId)
        navigate("/")

      }
      setFormData({ email: "", password: "" })
    } catch (error) {
      setError({ generic: error.message })

    }
  }


  return (
    <form
      noValidate onSubmit={handleSubmit}
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
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value })
          clearFieldError("email")
        }}
        aria-invalid={!!error.email}
        aria-describedby="email-error"
        autoComplete="off"
        autoFocus
        required
      />
      {error.email && (
        <p id="email-error" className="text-sm font-medium text-red-600">
          {error.email}
        </p>
      )}

      <FormInput
        id={"password"}
        type={"password"}
        name={"Password"}
        label={"password"}
        placeholder={"********"}
        value={formData.password}
        onChange={(e) => {
          setFormData({ ...formData, password: e.target.value })
          clearFieldError("password")
        }}
        aria-invalid={!!error.password}
        aria-describedby="password-error"
        required
        autoComplete="off"

      />

      {error.password && (
        <p id="password-error" className="text-red-600 text-sm text-center font-medium">
          {error.password}
        </p>
      )}

      {error.generic && (
        <p className="text-red-600 text-sm text-center font-medium">
          {error.generic}
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