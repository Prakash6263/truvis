import Header from "../components/Header"
import Footer from "../components/Footer"
import Preloader from "../components/Preloader"
import ScrollTop from "../components/ScrollTop"

const Disclaimer = () => {
  return (
    <div>
      <Preloader />
      <Header />

      <main className="main">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-slider owl-carousel">
            <div className="hero-single" style={{ backgroundImage: "url(assets/img/hero/slider-1.jpg)" }}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-12 col-lg-12">
                    <div className="hero-content position-relative px-4">
                      <div className="linear"></div>
                      <h1 className="hero-title" data-animation="fadeInRight" data-delay=".50s">
                        Disclaimer
                      </h1>
                      <p data-animation="fadeInLeft" data-delay=".75s">
                        Important legal information and disclaimers for using our services
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Section */}
        <div className="complience">
          <div className="container">
            <div className="row text-start">
              <div className="col-md-6 col-lg-3">
                <div className="compliance-box">
                  <h6>Security</h6>
                  <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                  <p>Adipiscing eleifend dictum porttitor mattis adipiscing.</p>
                  <p>Vivamus eget quam.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="compliance-box">
                  <h6>Industry Certified</h6>
                  <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                  <p>Adipiscing eleifend dictum porttitor mattis adipiscing.</p>
                  <p>Vivamus eget quam.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="compliance-box">
                  <h6>ISO Standards</h6>
                  <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                  <p>Adipiscing eleifend dictum porttitor mattis adipiscing.</p>
                  <p>Vivamus eget quam.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="compliance-box">
                  <h6>Audit for Company</h6>
                  <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                  <p>Adipiscing eleifend dictum porttitor mattis adipiscing.</p>
                  <p>Vivamus eget quam.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Content */}
        <div className="py-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="site-heading text-center wow fadeInDown" data-wow-delay=".25s">
                  <img src="assets/img/logo/logo.png" className="mb-3" alt="Truvis Logo" />
                  <h2 className="site-title">
                    Legal <span className="themecolor">Disclaimer</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-11">
                <div className="disclaimer-content">
                  <h4>General Information</h4>
                  <p>
                    The information on this website is provided on an "as is" basis. To the fullest extent permitted by
                    law, this Company excludes all representations, warranties, conditions and terms.
                  </p>

                  <h4>Professional Disclaimer</h4>
                  <p>
                    The Site cannot and does not contain cybersecurity advice. The cybersecurity information is provided
                    for general informational and educational purposes only and is not a substitute for professional
                    advice.
                  </p>

                  <h4>Fairness and Accuracy Disclaimer</h4>
                  <p>
                    The views and opinions expressed on this website are purely the website owner's. While we endeavor
                    to keep the information up to date and correct, we make no representations or warranties of any
                    kind.
                  </p>

                  <h4>No Responsibility Disclaimer</h4>
                  <p>
                    The information on this website is provided with the understanding that the company is not herein
                    engaged in rendering legal, accounting, tax, or other professional advice and services.
                  </p>

                  <h4>Use at Your Own Risk Disclaimer</h4>
                  <p>
                    All information on this website is provided in good faith, however we make no representation or
                    warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability,
                    availability or completeness of any information on the Site.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollTop />
    </div>
  )
}

export default Disclaimer
