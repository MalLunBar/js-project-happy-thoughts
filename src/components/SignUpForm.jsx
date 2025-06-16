import { useState } from "react"
import { FormInput } from "./FormInput"
import { CloseButton } from "./CloseButton"
import { useNavigate } from "react-router-dom"


export const SignUpForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  // const url = "https://js-project-api-mk0z.onrender.com/users"
  // Local API
  const url = "http://localhost:8080/users/signup"


  const handleSubmit = (event) => {
    event.preventDefault()


    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Could not create account")
        return res.json()
      })
      .then(data => {

        // Clear the form fields after successful signup
        setFormData({ name: "", email: "", password: "" })
        navigate("/login")

      })
      .catch(err => {
        console.error("Error creating account:", err)
        // Handle error, e.g., show an error message to the user
      })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 m-4 border p-4 shadow-[10px_10px] shadow-black bg-gray-100 rounded-xs">
      <CloseButton />
      <h1 className="text-2xl font-bold text-center mb-2">
        Sign up for an account
      </h1>
      <FormInput
        id={"name"}
        type={"name"}
        name={"Name"}
        label={"name"}
        placeholder={"Bob"}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required={true}
        autoComplete="off"
        autoFocus={true}
      />

      <FormInput
        id={"email"}
        type={"email"}
        name={"Email"}
        label={"email"}
        placeholder={"Bob@test.com"}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required={true}
        autoComplete="off"
      />
      <FormInput
        id={"password"}
        type={"password"}
        name={"Password"}
        label={"password"}
        placeholder={"********"}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required={true}
        autoComplete="off"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Sign Up
      </button>
    </form>
  )
}