import Header from "../components/Header"
import Footer from "../components/Footer"
import Preloader from "../components/Preloader"
import ScrollTop from "../components/ScrollTop"

const Privacy = () => {
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
                        Privacy &<br /> Policies
                      </h1>
                      <p data-animation="fadeInLeft" data-delay=".75s">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit adipiscing eleifend
                        <br />
                        dictum elitei potenti mattis viverra eget quam lacus..
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

        {/* Privacy Policy Content */}
        <div className="py-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="site-heading text-center wow fadeInDown" data-wow-delay=".25s">
                  <img src="assets/img/logo/logo.png" className="mb-3" alt="Truvis Logo" />
                  <h2 className="site-title">
                    Privacy & <span className="themecolor">Policies</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-11">
                <p className="text-center">
                  A privacy policy is a legal document where you disclose what data you collect from users, how you
                  manage the collected data and how you use that data. The important objective of a privacy policy is to
                  inform users how you collect, use and manage the collected.
                </p>
                <hr />
                <p className="text-center">
                  The Privacy Policy Generator (privacypolicygenerator.info) is a free generator of privacy policies for
                  websites, apps & Facebook pages/app. You can use our free generator to create the privacy policy for
                  your business.
                </p>
                <hr />
                <p className="text-center">
                  The most important thing to remember is that a privacy policy is required by law if you collect data
                  from users, either directly or indirectly. For example, if you have a contact form on your website you
                  need a privacy policy. But you will also need a privacy policy if you use analytics tools such as
                  Google Analytics.
                </p>
                <hr />
                <p className="text-center">
                  Usually, you can find privacy policies in the footer of a website. We recommend that you place your
                  privacy policy in easy to find locations on your website. A standard privacy policy should include:
                  what data you collect from visitors, how you collect it, why you are collecting the data, how you are
                  using the data.
                </p>
                <hr />
                <p className="text-center">
                  We do not recommend copying someone else's privacy policy. First of all, privacy policies are
                  copyright-protected legal documents. But most importantly, a privacy policy must be generated based on
                  the exact data you collect. Our privacy policy generator can help you with this
                </p>
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

export default Privacy
