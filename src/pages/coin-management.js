import React from 'react'
import { Link } from 'react-router-dom'

const Coinmanagement = () => {
  return (
   <>
  {/* preloader */}
  {/* <div className="preloader">
    <div className="loader-ripple">
      <div />
      <div />
    </div>
  </div> */}
  {/* preloader end */}
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n    :root {\n      --bg-light: #ffffff;\n      --bg-dark: #121212;\n      --text-light: #000;\n      --text-dark: #fff;\n      --accent: #3AC6BD;\n      --sidebar-width: 300px;\n      --card-bg: #f9f9f9;\n      --border-color: #eee;\n    }\n    \n    body {\n     \n      margin: 0;\n      background-color: var(--bg-light);\n      color: var(--text-light);\n      transition: all 0.3s ease;\n    }\n    \n    .help-box {\n      background: #0d9488;\n      color: #fff;\n      border-radius: 12px;\n      padding: 1rem;\n      text-align: center;\n      margin: 1rem;\n    }\n    .help-box button {\n      background: #fff;\n      color: #0d9488;\n      border: none;\n      padding: 4px 15px;\n      border-radius: 20px;\n      font-size: 14px;\n    }\n    @media (max-width: 768px) {\n    .sidebar {\n        left: -300px;\n    }\n  }\n  \n  .nav-tabs {\n      border-bottom: none;\n      margin-bottom: 20px;\n    }\n    .nav-tabs .nav-link {\n      border: none;\n      color: #999;\n      font-weight: 500;\n    }\n    .nav-tabs .nav-link.active {\n      color: #00bfa5;\n      border-bottom: 2px solid #00bfa5;\n    }\n  "
    }}
  />
  <main className="main">
    {/* Sidebar */}
    <div className="sidebar" id="sidebar">
      <div className="logo">
        <img src="assets/img/logo/logo.png" alt="logo" />
      </div>
      <ul className="chat-list">
        <li>
          <img src="icons/default.png" style={{ width: 20, marginRight: 10 }} />{" "}
          Dashboard
        </li>
        <li>
          <img src="icons/chart.png" style={{ width: 20, marginRight: 10 }} />{" "}
          Accountancy Audit{" "}
        </li>
        <li>
          <img src="icons/card.png" style={{ width: 20, marginRight: 10 }} />{" "}
          Monetization
        </li>
        <li>
          <img src="icons/repair.png" style={{ width: 20, marginRight: 10 }} />{" "}
          Ai Report
        </li>
      </ul>
      <h6 className="mb-2">Risk Management</h6>
      <ul className="chat-list">
        <li>
          <img src="icons/person.png" style={{ width: 20, marginRight: 10 }} />{" "}
          Attack Simulation Mode
        </li>
        <li className="active">
          <i
            className="fa fa-file"
            style={{ color: "#3ac6bd", marginRight: 10 }}
          />{" "}
          Ai Risk Compliances
        </li>
      </ul>
    </div>
    {/* Main Area */}
    <div className="main2">
      <div className="topbar mb-3">
        <div>
          <button className="btn btn-toggle-sidebar w-auto" id="sidebarToggle">
            <i className="fas fa-bars" />
          </button>
        </div>
        <div className="right w-auto">
          <button className="coin theme-btn">50 Coin</button>
          <a href="#">
            {" "}
            <span className="fw-semibold">
              <i className="fas fa-user icon" /> Username
            </span>
          </a>
          <a href="#">
            <i className="fas fa-cog icon" />
          </a>
          <a href="#">
            <i className="fas fa-bell icon" />
          </a>
        </div>
      </div>
      <div className="middle">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            {/* Form Card */}
            <div className="form-card">
              <div className="row justify-content-center">
                <div className="col-lg-12 mb-5">
                  {/* Tabs */}
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <Link className="nav-link" to="/account-settings">
                        Account
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        to="/coin-management"
                      >
                        Coin Management
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-12">
                  <h5 className="mb-3 text-center">Transection History</h5>
                  <div className="table-responsive bg-white p-2 rounded">
                    <table className="table align-middle mb-0">
                      <thead>
                        <tr>
                          <th>
                            <input type="checkbox" />
                          </th>
                          <th>Transection Id</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Card Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>251456815</td>
                          <td>10-10-2024</td>
                          <td>2 coin</td>
                          <td>45465646XXXX</td>
                        </tr>
                        <tr>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>251456815</td>
                          <td>10-10-2024</td>
                          <td>1 coin</td>
                          <td>445565646XXXX</td>
                        </tr>
                        <tr>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>251456815</td>
                          <td>10-10-2024</td>
                          <td>5 coin</td>
                          <td>556565646XXXX</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <small className="text-dark">
                      Items per page 1-3 of 200 items
                    </small>
                    <nav>
                      <ul className="pagination pagination-sm mb-0 mt-0">
                        <li className="page-item disabled text-dark">
                          <a className="page-link" href="#">
                            &lt;
                          </a>
                        </li>
                        <li className="page-item text-dark">
                          <a className="page-link" href="#">
                            &gt;
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* JS */}
  </main>
  {/* js */}
  {/* JavaScript */}
</>

  )
}

export default Coinmanagement
