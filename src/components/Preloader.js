"use client"

import { useState, useEffect } from "react"

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="preloader">
      <div className="loader-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Preloader
