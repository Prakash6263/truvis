import Header from "../components/Header"
import Footer from "../components/Footer"

const About = () => {
  return (
    <div>
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
                        About <br /> Us
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

        {/* Counter Area */}
        <div className="counter-area">
          <div className="counter-wrap">
            <div className="container">
              <div className="row g-4">
                <div className="col-lg-6 col-sm-6">
                  <h2 className="mb-3">
                    How We Manages the <span style={{ color: "#3AC6BD" }}>RISK</span>
                  </h2>
                  <p className="mb-3">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit adipis eleifend dictum potenti mattis viverra
                    eget quam lacus enimcing inti porttitor bibendum elit duiteri nisl eget quam lacus enimcing inti
                    porttitor bibendum elit dui nisl.
                  </p>
                  <div className="row g-4">
                    <div className="col-lg-6 col-sm-6">
                      <div className="counter-box">
                        <div className="icon">
                          <img src="assets/img/bgc1.png" alt="" />
                        </div>
                        <div>
                          <div className="d-flex align-self-center">
                            <span className="counter" data-count="+" data-to="6560" data-speed="3000">
                              250
                            </span>
                            <span className="addon">+</span>
                          </div>
                          <h6 className="title">Cyber Security Experts</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="counter-box">
                        <div className="icon">
                          <img src="assets/img/bgc2.png" alt="" />
                        </div>
                        <div>
                          <div className="d-flex align-self-center">
                            <span className="counter" data-count="+" data-to="2750" data-speed="3000">
                              2750
                            </span>
                            <span className="addon">+</span>
                          </div>
                          <h6 className="title">Cyber Security Projects</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit adipis eleifend dictum potenti mattis viverra
                    eget quam lacus enimcing inti porttitor bibendum elit duiteri nisl eget quam lacus enimcing inti
                    porttitor bibendum elit dui nisl.
                  </p>
                </div>

                <div className="col-lg-6 col-sm-6">
                  <div className="row g-4">
                    <div className="col-lg-6 col-sm-6">
                      <div className="counter-box">
                        <div className="icon">
                          <img src="assets/img/bgc3.png" alt="" />
                        </div>
                        <div>
                          <div className="d-flex align-self-center">
                            <span className="counter" data-count="+" data-to="13" data-speed="3000">
                              13{" "}
                            </span>
                            <span className="addon">K</span>
                          </div>
                          <h6 className="title">Customer Served Globally</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="counter-box">
                        <div className="icon">
                          <img src="assets/img/bgc4.png" alt="" />
                        </div>
                        <div>
                          <div className="d-flex align-self-center">
                            <span className="counter" data-count="+" data-to="70" data-speed="3000">
                              70
                            </span>
                            <span className="addon">%</span>
                          </div>
                          <h6 className="title">Customer Retention Rate</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <img src="assets/img/counter1.png" style={{ width: "100%" }} alt="counter" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="py-60">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-md-6">
                <div className="blog-box">
                  <h2 className="mb-3">
                    We Provide All Kind Advanced
                    <br />
                    Security Services
                  </h2>
                  <img
                    src="assets/img/security1.png"
                    alt="Main Blog"
                    className="img-fluid rounded"
                    style={{ width: "100%", height: "320px", objectFit: "cover" }}
                  />
                </div>
              </div>

              <div className="col-md-6 right-blog">
                <div className="blog-box d-flex gap-5 mb-5">
                  <div>
                    <p className="servicetitle pb-3">UPGRATION</p>
                    <h6 className="blog-title">Software Upgration</h6>
                    <p className="blog-text mb-0">
                      Lorem ipsum dolor sit amet adipiscing
                      <br />
                      elit adipis eleifend dictum potenti
                      <br />
                      mattis viverra.
                    </p>
                  </div>
                  <div>
                    <p className="servicetitle pb-3">ANTIVIRUS</p>
                    <h6 className="blog-title">Latest Antivirus</h6>
                    <p className="blog-text mb-0">
                      Lorem ipsum dolor sit amet adipiscing
                      <br />
                      elit adipis eleifend dictum potenti
                      <br />
                      mattis viverra.
                    </p>
                  </div>
                </div>

                <div className="blog-box gap-5 d-flex">
                  <div>
                    <p className="servicetitle pb-3">THREATS</p>
                    <h6 className="blog-title">Identifying Threats</h6>
                    <p className="blog-text mb-0">
                      Lorem ipsum dolor sit amet adipiscing
                      <br />
                      elit adipis eleifend dictum potenti
                      <br />
                      mattis viverra.
                    </p>
                  </div>
                  <div>
                    <p className="servicetitle pb-3">SUPPORT</p>
                    <h6 className="blog-title">24/7 User</h6>
                    <p className="blog-text mb-0">
                      Lorem ipsum dolor sit amet adipiscing
                      <br />
                      elit adipis eleifend dictum potenti
                      <br />
                      mattis viverra.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-video py-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 mx-auto">
                <div className="site-heading text-center wow fadeInDown" data-wow-delay=".25s">
                  <h2 className="site-title text-white">Security that keep you Save</h2>
                  <p className="text-white">
                    Lorem ipsum dolor sit amet con sectetur adi piscing elit adipis elei fend dictum <br />
                    potenti mattis viverra eget quam lacus enimcing inti potenti ipsum.
                  </p>
                </div>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="project-box">
                  <h5 className="text-white mb-3">Software Upgration</h5>
                  <p className="text-white">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit adipis
                    <br />
                    eleifend dictum potenti mattis viverra eget.
                  </p>
                  <a href="#" style={{ color: "#3AC6BD" }}>
                    View Project Details
                  </a>
                </div>
              </div>

              <div className="col-md-7">
                <div className="project-box">
                  <img src="assets/img/image1.png" alt="project" />
                </div>
              </div>

              <div className="col-md-7">
                <div className="project-box">
                  <img src="assets/img/image2.png" alt="project" />
                </div>
              </div>

              <div className="col-md-5">
                <div className="project-box">
                  <h5 className="text-white mb-3">Artificial Intelligence</h5>
                  <p className="text-white">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit adipis
                    <br />
                    eleifend dictum potenti mattis viverra eget.
                  </p>
                  <a href="#" style={{ color: "#3AC6BD" }}>
                    View Project Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div className="blog-area py-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="site-heading text-center wow fadeInDown" data-wow-delay=".25s">
                  <h2 className="site-title">Latest Tips & Tricks</h2>
                  <p>
                    Lorem ipsum dolor sit amet con sectetur adi piscing elit adipis elei fend dictum <br />
                    potenti mattis viverra eget quam lacus enimcing inti potenti ipsum.
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-start">
              <div className="col-md-6">
                <div className="blog-box">
                  <img
                    src="assets/img/blog/01.png"
                    alt="Main Blog"
                    className="img-fluid rounded"
                    style={{ width: "100%", height: "350px", objectFit: "cover" }}
                  />
                  <p className="blog-date mt-3">12 Jan 2024</p>
                  <h5 className="blog-title">Protect Your Workplace From Cyber Attacks</h5>
                  <p className="blog-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit adipisci eligendi dicta cum potiti.
                  </p>
                </div>
              </div>

              <div className="col-md-6 right-blog">
                <div className="blog-box d-flex mb-4">
                  <div className="me-3">
                    <img src="assets/img/blog/02.png" alt="Small Blog 1" />
                  </div>
                  <div>
                    <p className="blog-date">11 Jan 2024</p>
                    <h6 className="blog-title">The Security Risks Of Change Package</h6>
                    <p className="blog-text mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisc
                      <br />
                      elit adipis eleifend dictum potenti mattis viverra
                      <br />
                      ege adipiscing.
                    </p>
                  </div>
                </div>

                <div className="blog-box d-flex">
                  <div className="me-3">
                    <img src="assets/img/blog/03.png" alt="Small Blog 2" />
                  </div>
                  <div>
                    <p className="blog-date">10 Jan 2024</p>
                    <h6 className="blog-title">Avoid Mistakes In Social Media Posts</h6>
                    <p className="blog-text mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisc
                      <br />
                      elit adipis eleifend dictum potenti mattis viverra
                      <br />
                      ege adipiscing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default About
