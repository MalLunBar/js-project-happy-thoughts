import { useState, useEffect } from "react"

import { FormCard } from "../components/FormCard"
import { MessageList } from "../components/MessasgeList"
import { Loader } from "../components/Loader"
import { LikeCount } from "../components/LikeCount"
import { AuthorizationError } from "../components/AuthorizationError"
import { CloseButton } from "../components/CloseButton"


export const MainSection = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")
  const [likedCount, setLikedCount] = useState(0)
  const [showAuthError, setShowAuthError] = useState(false)
  const [sortOrder, setSortOrder] = useState("desc")
  const [minHearts, setMinHearts] = useState("")
  const [showLikedOnly, setShowLikedOnly] = useState(false)
  const [likeError, setLikeError] = useState("")

  const userId = localStorage.getItem("userId")

  // const url = "https://happy-thoughts-api-4ful.onrender.com/thoughts"
  //Local API
  // const url = "http://localhost:8080/thoughts"

  //My render url 
  const url = "https://js-project-api-mk0z.onrender.com/thoughts"


  const fetchData = async () => {
    setIsLoading(true)
    setApiError("")

    const accessToken = localStorage.getItem("accessToken")

    const params = new URLSearchParams()
    if (minHearts) params.append("minLikes", minHearts)

    const fetchUrl = showLikedOnly
      ? `${url}/liked${params.toString() ? "?" + params.toString() : ""}`
      : `${url}?${params.toString()}`

    try {
      const res = await fetch(fetchUrl, {
        headers: {
          ...(accessToken && { Authorization: accessToken })
        }
      })

      if (!res.ok) {
        throw new Error("Failed to fetch messages")
      }

      const data = await res.json();

      let sortedMessages = [...data.response].sort((a, b) => {
        return sortOrder === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      })

      setMessages(sortedMessages)
    } catch (err) {
      console.error(err)
      setApiError("Could not load messages. Please try again later")
    } finally {
      setIsLoading(false)
    }
  }


  const addMessage = async (message) => {
    setApiError("")
    const accessToken = localStorage.getItem("accessToken")
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken
        },
        body: JSON.stringify({ message: message })
      })
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("accessToken")
          localStorage.removeItem("userId")
          setShowAuthError(true)
          throw new Error("You need to be logged in to post a thought!")
        }
        throw new Error("Could not save your thought")
      }
      const newMessage = await res.json()
      setMessages(prev => [newMessage.response, ...prev])
    } catch (err) {
      setApiError(err.message)
    }
  }

  const likeMessage = async (id) => {
    setApiError("")
    const accessToken = localStorage.getItem("accessToken")

    try {
      const res = await fetch(`${url}/${id}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: accessToken })
        }
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Failed to like the thought")
      }

      const updatedLikes = await res.json()

      setMessages(prev =>
        prev.map(msg =>
          msg._id === id ? { ...msg, hearts: updatedLikes.response.hearts } : msg
        )
      )
      setLikeError("")

    } catch (err) {
      console.error("Could not like message", err)
      setLikeError(err.message || "Could not like message. Please try again later.")
    }
  }


  const editMessage = async (id, message) => {
    const accessToken = localStorage.getItem("accessToken")
    setApiError("")
    try {
      const res = await fetch(`${url}/${id}/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken
        },
        body: JSON.stringify({ message })
      })
      if (!res.ok) throw new Error("Failed to update the message")
      const updatedMessage = await res.json()
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? updatedMessage.response : msg))
      )
    } catch (err) {
      console.error("Edit message error:", err)
      setApiError("Could not update message. Please try again later.")
    }
  }


  const deleteMessage = async (id) => {
    const accessToken = localStorage.getItem("accessToken")
    setApiError("")
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken
        }
      })
      if (!res.ok) {
        throw new Error("Failed to delete the message")
      }
      await res.json()
      setMessages((prev) => prev.filter((msg) => msg._id !== id))
    } catch (err) {
      console.log(err)
      setApiError("Could not delete message. Please try again later.")
    }
  }

  const handleLike = (id) => {
    likeMessage(id)
    setLikedCount(c => c + 1)
  }

  const handleCloseAuthError = () => {
    setShowAuthError(false)
    setApiError("")
  }

  useEffect(() => {
    fetchData()
  }, [sortOrder, minHearts, showLikedOnly])

  return (
    <section className="max-w-md min-h-screen p-5 mx-auto">
      {userId && (
        <button
          onClick={() => setShowLikedOnly(prev => !prev)}
          className="bg-gray-200 text-fuchsia-950 px-3 py-1 mb-5 rounded-2xl shadow"
        >
          {showLikedOnly ? "🤍 Show All Thoughts" : "❤️ Show My Liked Thoughts"}
        </button>
      )}

      <FormCard
        onSubmit={addMessage}
        apiError={apiError} />

      {showAuthError && <AuthorizationError errMessage={apiError}
        onClose={handleCloseAuthError} />}

      {likeError && (
        <>
          {/* Full-screen overlay */}
          <div className="flex fixed inset-0 bg-black opacity-50 z-40" />

          <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white text-red-700 border border-red-300 shadow-xl rounded-lg px-6 py-4 text-center max-w-sm">

            <div className="absolute top-2 right-2">
              <CloseButton
                onClick={() => setLikeError("")}
              />
            </div>
            <p className="mt-2">{likeError}</p>
          </div>
        </>
      )}

      <div className="flex justify-between items-center mb-4 my-4">
        <label
          htmlFor="sortOrder"
          className="sr-only">Sort on newest or oldest First
        </label>
        <select
          id="sortOrder"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>

        <label
          htmlFor="minHearts"
          className="sr-only">Filter by minimum hearts
        </label>
        <select
          id="minHearts"
          onChange={(e) => setMinHearts(e.target.value)}
          value={minHearts}>
          <option value="">All hearts</option>
          <option value="5">5+ hearts</option>
          <option value="10">10+ hearts</option>
          <option value="20">20+ hearts</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {likedCount > 0 && <LikeCount likeCount={likedCount} />}

      <MessageList
        userId={userId}
        messages={messages}
        onLike={handleLike}
        onDelete={deleteMessage}
        onEdit={editMessage} />
    </section>
  )
}

