import { FormCard } from "../components/FormCard"
import { MessageList } from "../components/MessasgeList"
import { useState, useEffect } from "react"
import { Loader } from "../components/Loader"
import { LikeCount } from "../components/LikeCount"
import { AuthorizationError } from "../components/AuthorizationError"




export const MainSection = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")
  const [likedCount, setLikedCount] = useState(0)
  const [showAuthError, setShowAuthError] = useState(false)
  const [sortOrder, setSortOrder] = useState("desc")
  const [minHearts, setMinHearts] = useState("")
  const userId = localStorage.getItem("userId")

  // const url = "https://happy-thoughts-api-4ful.onrender.com/thoughts"
  //Local API
  const url = "http://localhost:8080/thoughts"

  //My render url 
  // const url = "https://js-project-api-mk0z.onrender.com/thoughts"


  const fetchData = () => {
    setIsLoading(true)
    setApiError("")

    const params = new URLSearchParams()

    if (minHearts) {
      params.append("minLikes", minHearts)
    }

    const fetchUrl = `${url}?${params.toString()}`

    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          throw new Error("API response indicated failure")
        }

        let sortedMessages = [...data.response]
        sortedMessages.sort((a, b) => {
          if (sortOrder === "asc") {
            return new Date(a.createdAt) - new Date(b.createdAt)
          } else {
            return new Date(b.createdAt) - new Date(a.createdAt)
          }
        })

        setMessages(sortedMessages)

      })
      .catch(err => {
        console.error(err)
        setApiError("Could not load messages. Please try again later")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const addMessage = (message) => {
    setApiError("")
    const accessToken = localStorage.getItem("accessToken")
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken
      },
      body: JSON.stringify({ message: message })
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("userId")
            setShowAuthError(true)
            throw new Error("You need to be logged in to post a thought!")
          }
          throw new Error("Could not save your thought")
        }
        return res.json()
      })
      .then(newMessage => {
        setMessages(prev => [newMessage.response, ...prev])

      })
      .catch(err => setApiError(err.message))
  }

  const likeMessage = (id) => {
    setApiError("")

    fetch(`${url}/${id}/like`, {
      method: "PATCH",
    })
      .then(res => {
        if (!res.ok) throw new Error("Could not like thought")
        return res.json()
      })
      .then(updatedLikes => {
        setMessages(prev =>
          prev.map(msg =>
            msg._id === id ? { ...msg, hearts: updatedLikes.response.hearts } : msg
          )
        )
      })
      .catch(err => {
        console.error("Could not like message", err)
        setApiError("Could not like message. Please try again later")
      })
  }

  const editMessage = (id, message) => {

    const accessToken = localStorage.getItem("accessToken")

    setApiError("")
    fetch(`${url}/${id}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken
      },
      body: JSON.stringify({ message })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update the message")
        return res.json()
      })
      .then(updatedMessage => {
        setMessages((prev) =>
          prev.map((msg) => (msg._id === id ? updatedMessage.response : msg))
        )
      })
      .catch(err => {
        console.error("Edit message error:", err)
        setApiError("Could not update message. Please try again later.")
      })
  }

  const deleteMessage = (id) => {

    const accessToken = localStorage.getItem("accessToken")

    setApiError("")
    fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete the message")
        }
        return res.json()
      })
      .then(() => {
        setMessages((prev) => prev.filter((msg) => msg._id !== id))
      })
      .catch(err => {
        console.log(err)
        setApiError("Could not delete message. Please try again later.")
      })

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
  }, [sortOrder, minHearts])

  return (
    <section className="max-w-md min-h-screen p-5 mx-auto">
      <FormCard
        onSubmit={addMessage}
        apiError={apiError} />

      {isLoading && <Loader />}
      {likedCount > 0 && <LikeCount likeCount={likedCount} />}

      {showAuthError && <AuthorizationError errMessage={apiError}
        onClose={handleCloseAuthError} />}

      <div className="flex justify-between items-center mb-4 my-4">
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>

        <select
          onChange={(e) => setMinHearts(e.target.value)}
          value={minHearts}>
          <option value="">All hearts</option>
          <option value="5">5+ hearts</option>
          <option value="10">10+ hearts</option>
          <option value="20">20+ hearts</option>
        </select>
      </div>

      <MessageList
        userId={userId}
        messages={messages}
        onLike={handleLike}
        onDelete={deleteMessage}
        onEdit={editMessage} />
    </section>
  )
}

