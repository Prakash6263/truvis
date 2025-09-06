const MarkdownRenderer = ({ content }) => {
  const renderMarkdown = (text) => {
    if (!text) return ""

    // Split by lines to handle line breaks properly
    const lines = text.split("\n")
    const elements = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Handle headers (### )
      if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={i}
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              margin: "15px 0 10px 0",
              color: "inherit",
            }}
          >
            {line.replace("### ", "")}
          </h3>,
        )
      }
      // Handle bullet points (- )
      else if (line.startsWith("- ")) {
        elements.push(
          <div
            key={i}
            style={{
              marginLeft: "20px",
              marginBottom: "8px",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "-15px",
                fontWeight: "bold",
              }}
            >
              •
            </span>
            {renderInlineFormatting(line.replace("- ", ""))}
          </div>,
        )
      }
      // Handle empty lines
      else if (line.trim() === "") {
        elements.push(<br key={i} />)
      }
      // Handle regular paragraphs
      else if (line.trim()) {
        elements.push(
          <p
            key={i}
            style={{
              margin: "8px 0",
              lineHeight: "1.5",
            }}
          >
            {renderInlineFormatting(line)}
          </p>,
        )
      }
    }

    return elements
  }

  const renderInlineFormatting = (text) => {
    // Handle bold text (**text**)
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} style={{ fontWeight: "bold" }}>
            {part.slice(2, -2)}
          </strong>
        )
      }
      return part
    })
  }

  return (
    <div
      style={{
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
    >
      {renderMarkdown(content)}
    </div>
  )
}

export default MarkdownRenderer
