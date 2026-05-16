"use client"

import { useState } from "react"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [audio, setAudio] = useState("")
  const [loading, setLoading] = useState(false)

  const API = "https://YOUR-BACKEND.onrender.com/generate"

  const generateMusic = async () => {
    setLoading(true)

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          genre: "Afrohouse"
        })
      })

      const data = await res.json()
      setAudio(data.file)

    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🎵 Afrohouse AI Music Studio</h1>

      <input
        placeholder="Describe your song..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          padding: 10,
          width: 300
        }}
      />

      <button
        onClick={generateMusic}
        style={{
          marginLeft: 10,
          padding: 10
        }}
      >
        Generate
      </button>

      {loading && <p>Generating music...</p>}

      {audio && (
        <div style={{ marginTop: 20 }}>
          <audio controls src={audio} />
          <br />
          <a href={audio} download>
            ⬇ Download Song
          </a>
        </div>
      )}
    </div>
  )
}
