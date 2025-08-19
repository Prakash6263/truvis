"use client"

import { useState, useEffect } from "react"

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <a
      href="#"
      id="scroll-top"
      className={isVisible ? "visible" : ""}
      onClick={(e) => {
        e.preventDefault()
        scrollToTop()
      }}
    >
      <i className="far fa-arrow-up"></i>
    </a>
  )
}

export default ScrollTop
