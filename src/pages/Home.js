"use client"

import { useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Preloader from "../components/Preloader"
import ScrollTop from "../components/ScrollTop"

const Home = () => {
  useEffect(() => {
    // Initialize carousel and other jQuery plugins after component mounts
    if (window.$ && window.$.fn.owlCarousel) {
      window.$(".hero-slider").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: false,
        dots: false,
      })

      window.$(".testimonial-slider").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        nav: false,
        dots: true,
      })
    }
  }, [])

  const toggleVideo = (videoId, btn) => {
    const video = document.getElementById(videoId)
    if (video.paused) {
      video.play()
      btn.innerText = "❚❚"
    } else {
      video.pause()
      btn.innerText = "▶"
    }
  }

  return (
    <div>
      <Preloader />
      <Header />

      <main className="main">
        {/* Hero Area */}
        <div className="hero-section">
          <div className="hero-slider owl-carousel">
            <div className="hero-single" style={{ backgroundImage: "url(assets/img/hero/slider-1.jpg)" }}>
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-12 col-lg-7">
                    <h6 className="hero-sub-title" data-animation="fadeInUp" data-delay=".25s">
                      Your One Stop AI Solutions for Businesses: Governance, Compliance, Standards and Audits
                    </h6>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-12 col-lg-12">
                    <div className="hero-content position-relative px-4">
                      <div className="linear"></div>
                      <h1 className="hero-title" data-animation="fadeInRight" data-delay=".50s">
                        We Provide <br /> Risk Management & <br /> Cybersecurity Solutions
                      </h1>
                      <p data-animation="fadeInLeft" data-delay=".75s">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit adipiscing eleifend
                        <br />
                        dictum elitei potenti mattis viverra eget quam lacus..
                      </p>
                      <div className="hero-btn" data-animation="fadeInUp" data-delay="1s">
                        <button className="btn btn-primary d-flex text-white f-13 align-items-center">
                          <img src="assets/img/1.png" className="me-2" alt="" /> Risk Management & Cybersecurity
                        </button>
                        <button className="btn btn-success d-flex text-white f-13 align-items-center">
                          <img src="assets/img/2.png" className="me-2" alt="" /> ISO Standards & Compliance
                        </button>
                        <button className="btn btn-warning d-flex text-white f-13 align-items-center">
                          <img src="assets/img/3.png" className="me-2" alt="" /> Audit for Company Compliance
                        </button>
                        <button className="btn btn-info d-flex text-white f-13 align-items-center">
                          <img src="assets/img/4.png" className="me-2" alt="" /> AI Compliance Check
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-single" style={{ backgroundImage: "url(assets/img/hero/slider-2.jpg)" }}>
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-12 col-lg-7">
                    <h6 className="hero-sub-title" data-animation="fadeInUp" data-delay=".25s">
                      Your One Stop AI Solutions for Businesses: Governance, Compliance, Standards and Audits
                    </h6>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-12 col-lg-12">
                    <div className="hero-content position-relative px-4">
                      <div className="linear"></div>
                      <h1 className="hero-title" data-animation="fadeInRight" data-delay=".50s">
                        We Provide <br /> Risk Management & <br /> Cybersecurity Solutions
                      </h1>
                      <p data-animation="fadeInLeft" data-delay=".75s">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit adipiscing eleifend
                        <br />
                        dictum elitei potenti mattis viverra eget quam lacus..
                      </p>
                      <div className="hero-btn" data-animation="fadeInUp" data-delay="1s">
                        <button className="btn btn-warning d-flex text-white f-13 align-items-center">
                          <img src="assets/img/1.png" className="me-2" alt="" /> Risk Management & Cybersecurity
                        </button>
                        <button className="btn btn-info d-flex text-white f-13 align-items-center">
                          <img src="assets/img/2.png" className="me-2" alt="" /> ISO Standards & Compliance
                        </button>
                        <button className="btn btn-success d-flex text-white f-13 align-items-center">
                          <img src="assets/img/3.png" className="me-2" alt="" /> Audit for Company Compliance
                        </button>
                        <button className="btn btn-primary d-flex text-white f-13 align-items-center">
                          <img src="assets/img/4.png" className="me-2" alt="" /> AI Compliance Check
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-single" style={{ backgroundImage: "url(assets/img/hero/slider-3.jpg)" }}>
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-12 col-lg-7">
                    <h6 className="hero-sub-title" data-animation="fadeInUp" data-delay=".25s">
                      Your One Stop AI Solutions for Businesses: Governance, Compliance, Standards and Audits
                    </h6>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-12 col-lg-12">
                    <div className="hero-content position-relative px-4">
                      <div className="linear"></div>
                      <h1 className="hero-title" data-animation="fadeInRight" data-delay=".50s">
                        We Provide <br /> Risk Management & <br /> Cybersecurity Solutions
                      </h1>
                      <p data-animation="fadeInLeft" data-delay=".75s">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit adipiscing eleifend
                        <br />
                        dictum elitei potenti mattis viverra eget quam lacus..
                      </p>
                      <div className="hero-btn" data-animation="fadeInUp" data-delay="1s">
                        <button className="btn btn-success d-flex text-white f-13 align-items-center">
                          <img src="assets/img/1.png" className="me-2" alt="" /> Risk Management & Cybersecurity
                        </button>
                        <button className="btn btn-primary d-flex text-white f-13 align-items-center">
                          <img src="assets/img/2.png" className="me-2" alt="" /> ISO Standards & Compliance
                        </button>
                        <button className="btn btn-info d-flex text-white f-13 align-items-center">
                          <img src="assets/img/3.png" className="me-2" alt="" /> Audit for Company Compliance
                        </button>
                        <button className="btn btn-warning d-flex text-white f-13 align-items-center">
                          <img src="assets/img/4.png" className="me-2" alt="" /> AI Compliance Check
                        </button>
                      </div>
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

        {/* About Area */}
        <div className="about-area py-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 align-self-center">
                <div className="about-left wow fadeInLeft" data-wow-delay=".25s">
                  <div className="about-img">
                    <div className="row">
                      <div className="col-6">
                        <img className="img-1" src="assets/img/about/01.png" alt="" />
                      </div>
                      <div className="col-6">
                        <img className="img-2" src="assets/img/about/02.png" alt="" style={{ marginTop: "25px" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="about-right wow fadeInUp" data-wow-delay=".25s">
                  <div className="site-heading mb-3">
                    <h2 className="site-title">We Try To Create A Safer World For You</h2>
                  </div>
                  <p className="about-text mb-2">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit adipis eleifenddictum potenti mattis viverra.
                  </p>
                  <ul className="list-group">
                    <li className="list-group-item listt">01. Trusted Partner</li>
                    <li className="list-group-item listt">02. Product Security</li>
                    <li className="list-group-item listt">03. System Security</li>
                    <li className="list-group-item listt">04. Operational Security</li>
                  </ul>
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
                    Our Approach Is Simple But Not
                    <br />
                    Time-Wasting
                  </h2>
                  <p className="mb-3">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit adipis eleifend dictum potenti mattis viverra
                    eget quam lacus enimcing inti porttitor bibendum elit duiteri nisl eget quam lacus enimcing inti
                    porttitor bibendum elit dui nisl.
                  </p>
                  <div className="row g-4">
                    <div className="col-lg-6 col-sm-6">
                      <div className="counter-box wow fadeInRight">
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
                      <div className="counter-box wow fadeInRight">
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
                      <div className="counter-box wow fadeInLeft">
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
                      <div className="counter-box wow fadeInLeft">
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
                    <img src="assets/img/counter.png" style={{ width: "100%" }} alt="" />
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
                <div className="blog-box wow fadeInLeft">
                  <h2 className="mb-3">
                    We Provide All Kind Advanced
                    <br />
                    Security Services
                  </h2>
                  <img
                    src="assets/img/security.png"
                    alt="Main Blog"
                    className="img-fluid rounded"
                    style={{ width: "100%", height: "320px", objectFit: "cover" }}
                  />
                </div>
              </div>

              <div className="col-md-6 right-blog">
                <div className="blog-box d-flex gap-5 mb-5 wow fadeInRight">
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

        {/* Video Projects Section */}
        <div className="bg-video py-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 mx-auto">
                <div className="site-heading text-center wow fadeInDown" data-wow-delay=".25s">
                  <h2 className="site-title text-white">Our Top Projects To Show You</h2>
                  <p className="text-white">
                    Lorem ipsum dolor sit amet con sectetur adi piscing elit adipis elei fend dictum <br />
                    potenti mattis viverra eget quam lacus enimcing inti potenti ipsum.
                  </p>
                </div>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="project-box wow fadeInUp">
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
                <div className="project-box wow fadeInLeft">
                  <video
                    className="project-video"
                    id="video1"
                    src="https://www.w3schools.com/html/movie.mp4"
                    poster="assets/img/videobg1.png"
                  ></video>
                  <div className="play-btn" onClick={(e) => toggleVideo("video1", e.target)}>
                    ▶
                  </div>
                </div>
              </div>

              <div className="col-md-7">
                <div className="project-box wow fadeInRight">
                  <video
                    className="project-video"
                    id="video2"
                    src="https://www.w3schools.com/html/movie.mp4"
                    poster="assets/img/videobg2.png"
                  ></video>
                  <div className="play-btn" onClick={(e) => toggleVideo("video2", e.target)}>
                    ▶
                  </div>
                </div>
              </div>

              <div className="col-md-5">
                <div className="project-box wow fadeInDown">
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

        {/* Partners Section */}
        <div className="py-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-sm-6">
                <h2>
                  Our Top Most
                  <br />
                  Loyal Trusted
                  <br />
                  Partners
                </h2>
              </div>

              <div className="col-lg-8 col-sm-6">
                <div className="row wow fadeInUp">
                  <div className="col-lg-4 col-sm-6">
                    <img src="assets/img/p1.png" alt="" />
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <img src="assets/img/p2.png" alt="" />
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <img src="assets/img/p3.png" alt="" />
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <img src="assets/img/p4.png" alt="" />
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <img src="assets/img/p5.png" alt="" />
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <img src="assets/img/p6.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-60">
          <div className="container testimonial-bg">
            <div className="testimonial-slider owl-carousel owl-theme wow fadeInUp" data-wow-delay=".25s">
              <div className="testimonial-item">
                <div className="testimonial-quote">
                  <p>
                    There are many variations passage available the majority have suffered of the alteration in some
                    form by injected humour or randomised words which look even slightly believable.
                  </p>
                </div>
                <div className="testimonial-content">
                  <div className="testimonial-author-img">
                    <img src="assets/img/testimonial/01.jpg" alt="" />
                  </div>
                  <div className="testimonial-author-info">
                    <h4>Niesha Phips</h4>
                    <p>Customer</p>
                  </div>
                </div>
                <div className="testimonial-rate">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-quote">
                  <p>
                    There are many variations passage available the majority have suffered of the alteration in some
                    form by injected humour or randomised words which look even slightly believable.
                  </p>
                </div>
                <div className="testimonial-content">
                  <div className="testimonial-author-img">
                    <img src="assets/img/testimonial/02.jpg" alt="" />
                  </div>
                  <div className="testimonial-author-info">
                    <h4>Niesha Phips</h4>
                    <p>Customer</p>
                  </div>
                </div>
                <div className="testimonial-rate">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-quote">
                  <p>
                    There are many variations passage available the majority have suffered of the alteration in some
                    form by injected humour or randomised words which look even slightly believable.
                  </p>
                </div>
                <div className="testimonial-content">
                  <div className="testimonial-author-img">
                    <img src="assets/img/testimonial/03.jpg" alt="" />
                  </div>
                  <div className="testimonial-author-info">
                    <h4>Niesha Phips</h4>
                    <p>Customer</p>
                  </div>
                </div>
                <div className="testimonial-rate">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Area */}
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
                <div className="blog-box wow fadeInLeft">
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
                <div className="blog-box d-flex mb-4 wow fadeInRight">
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

                <div className="blog-box d-flex wow fadeInRight">
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
      <ScrollTop />
    </div>
  )
}

export default Home
