import React from 'react'
import Sidebar from '../components/AccountSidebar'
import TopBar from '../components/AccountTopBar'

const Buycoin = () => {
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
        "\n    :root {\n      --bg-light: #ffffff;\n      --bg-dark: #121212;\n      --text-light: #000;\n      --text-dark: #fff;\n      --accent: #3AC6BD;\n      --sidebar-width: 300px;\n      --card-bg: #f9f9f9;\n      --border-color: #eee;\n    }\n    \n    body {\n     \n      margin: 0;\n      background-color: var(--bg-light);\n      color: var(--text-light);\n      transition: all 0.3s ease;\n    }\n\n    .help-box {\n      background: #0d9488;\n      color: #fff;\n      border-radius: 12px;\n      padding: 1rem;\n      text-align: center;\n      margin: 1rem;\n    }\n    .help-box button {\n      background: #fff;\n      color: #0d9488;\n      border: none;\n      padding: 4px 15px;\n      border-radius: 20px;\n      font-size: 14px;\n    }\n    @media (max-width: 768px) {\n    .sidebar {\n        left: -300px;\n    }\n  }\n  "
    }}
  />
  <main className="main">
    {/* Sidebar */}
 <Sidebar />
    {/* Main Area */}
    <div className="main2">
   <TopBar />
      <div className="middle">
        <div className="row justify-content-center">
          <div className="col-lg-12 mb-5">
            <h4>Buy Coin</h4>
          </div>
          <div className="col-lg-6">
            {/* Form Card */}
            <div className="form-card">
              <center>
                <img
                  src="assets/img/logo/logo.png"
                  alt="logo"
                  style={{ width: 100, marginBottom: 20 }}
                />
              </center>
              <form>
                <div className="mb-3 text-start">
                  <label className="form-label">Enter Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your full name"
                  />
                </div>
                <div className="mb-3 text-start">
                  <label className="form-label">Card Details</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Card Number"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3 text-start">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="CVV"
                    />
                  </div>
                  <div className="col-md-6 mb-3 text-start">
                    <label className="form-label">Exp Date</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="mm/dd/yyyy"
                    />
                  </div>
                </div>
                <div className="form-check mb-3 text-start">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="saveCard"
                  />
                  <label className="form-check-label" htmlFor="saveCard">
                    Save Card
                  </label>
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Buy Now
                </button>
              </form>
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

export default Buycoin
