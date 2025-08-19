const Sidebar = ({ isCollapsed, onToggle }) => {
  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`} id="sidebar">
      <div className="logo">
        <img src="assets/img/logo/logo.png" alt="logo" />
      </div>
      <div className="d-flex justify-content-between">
        <button className="theme-btn mb-3 w-100 btn btn-primary me-2">+ New Chat</button>
        <a>
          <img src="assets/img/search.png" alt="search" />
        </a>
      </div>

      <ul className="chat-list">
        <li>
          <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
          What is posh policy?
        </li>
        <li>
          <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
          What is sandwich rule?
        </li>
        <li className="active">
          <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
          Salary date?
          <span className="trashed">
            <i className="fa fa-trash text-white"></i>
          </span>
        </li>
      </ul>

      <div className="mt-4 text-muted small">Yesterday</div>
      <ul className="chat-list">
        <li>
          <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
          What's in your mind?
        </li>
        <li>
          <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
          What's in your mind?
        </li>
        <li>
          <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
          What's in your mind?
        </li>
      </ul>

      <button className="btn logout-btn mt-4">
        <i className="fas fa-sign-out-alt me-2"></i> Log Out
      </button>
    </div>
  )
}

export default Sidebar
