"use client"

import { useState, useEffect } from "react"

const FileViewerModal = ({ file, isOpen, onClose }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isOpen && file) {
      setLoading(true)
      setError(null)

      const loadingTimeout = setTimeout(() => {
        console.log("[v0] File loading timeout - assuming loaded")
        setLoading(false)
      }, 3000) // 3 second timeout

      return () => clearTimeout(loadingTimeout)
    }
  }, [isOpen, file])

  if (!isOpen || !file) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const renderFileContent = () => {
    const fileUrl = `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/${file.path}`

    console.log("[v0] Rendering file:", file.name, "URL:", fileUrl)

    if (file.type?.startsWith("image/")) {
      return (
        <div className="image-container">
          <img
            src={fileUrl || "/placeholder.svg"}
            alt={file.name}
            onLoad={() => {
              console.log("[v0] Image loaded successfully")
              setLoading(false)
            }}
            onError={(e) => {
              console.log("[v0] Image failed to load:", e)
              setLoading(false)
              setError("Failed to load image")
            }}
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </div>
      )
    } else if (file.type === "application/pdf") {
      return (
        <div className="pdf-container" style={{ width: "100%", height: "80vh" }}>
          <iframe
            src={fileUrl}
            width="100%"
            height="100%"
            onLoad={() => {
              console.log("[v0] PDF iframe loaded")
              setLoading(false)
            }}
            onError={(e) => {
              console.log("[v0] PDF iframe error:", e)
              setLoading(false)
              setError("Failed to load PDF")
            }}
            style={{ border: "none", borderRadius: "8px" }}
            title={file.name}
          />
          {!loading && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                backgroundColor: "rgba(0,0,0,0.7)",
                padding: "8px 12px",
                borderRadius: "4px",
              }}
            >
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "12px",
                }}
              >
                📄 Open in new tab
              </a>
            </div>
          )}
        </div>
      )
    } else {
      if (loading) {
        setLoading(false)
      }

      return (
        <div className="file-download" style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>📄</div>
          <h3>{file.name}</h3>
          <p>This file type cannot be previewed</p>
          <a
            href={fileUrl}
            download={file.name}
            className="btn btn-primary"
            style={{
              padding: "10px 20px",
              backgroundColor: "#3AC6BD",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              display: "inline-block",
              marginTop: "10px",
            }}
          >
            Download File
          </a>
        </div>
      )
    }
  }

  return (
    <div
      className="file-viewer-modal"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          maxWidth: "90vw",
          maxHeight: "90vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="modal-header"
          style={{
            padding: "15px 20px",
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>{file.name}</h4>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666",
              padding: "0",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div
          className="modal-body"
          style={{
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "200px",
            position: "relative",
          }}
        >
          {loading && (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "24px",
                  marginBottom: "10px",
                  animation: "spin 1s linear infinite",
                }}
              >
                ⏳
              </div>
              <p>Loading...</p>
            </div>
          )}

          {error && (
            <div style={{ textAlign: "center", color: "#e74c3c" }}>
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>❌</div>
              <p>{error}</p>
              <button
                onClick={() => {
                  setError(null)
                  setLoading(true)
                  // Trigger re-render
                  setTimeout(() => setLoading(false), 2000)
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#3AC6BD",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && renderFileContent()}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default FileViewerModal
