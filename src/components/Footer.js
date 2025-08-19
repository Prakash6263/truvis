const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row text-start">
          <div className="col-md-3">
            <img src="assets/img/logo/footer-logo.png" alt="Logo" style={{ width: "70px" }} />
            <p className="logo-text">
              Lorem ipsum dolor sit amet consectetur elit do eiusmod tempor incididunt ut labore et dolore magna aliqua
              minim.
            </p>
            <div className="social-icons mt-3">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="col-md-3">
            <h6>About Us</h6>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Website Security</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6>Quick Links</h6>
            <ul>
              <li>
                <a href="#">Update Your Antivirus</a>
              </li>
              <li>
                <a href="#">Choose Strong Passwords</a>
              </li>
              <li>
                <a href="#">Trusted Websites</a>
              </li>
              <li>
                <a href="#">Greeting Delivery</a>
              </li>
              <li>
                <a href="#">Fast Call Service</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6>Contact Us</h6>
            <ul>
              <li>
                <strong>Address:</strong> 682 Line Drive St Riverside, California
              </li>
              <li>
                <strong>Email:</strong> <a href="mailto:hello@travis.com">hello@travis.com</a>
              </li>
              <li>
                <strong>Phone:</strong> +1 456-656-7004
              </li>
              <li>
                <strong>Fax:</strong> +1 0765-678654
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; Travis is Proudly Owned by <span>2025</span>
      </div>
    </footer>
  )
}

export default Footer
