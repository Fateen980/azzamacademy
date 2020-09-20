import React from 'react'


const Contact = () => (

  <section id="contact" className="contact section-show">
    <div className="container">

      <div className="section-title">
        <h2>Contact Us</h2>
      </div>

      <div className="row mt-2">

        <div className="col-md-6 d-flex align-items-stretch">
          <div className="info-box">
            <i className="bx bx-map" />
            <h3>My Address</h3>
            <p>Rateb Al BATAINEH Street , Irbid </p>
          </div>
        </div>

        <div className="col-md-6 mt-4 mt-md-0 d-flex align-items-stretch">
          <div className="info-box">
            <i className="bx bx-share-alt" />
            <h3>Social Profiles</h3>
            <div className="social-links">
              <a href="#" className="twitter"><i className="icofont-twitter" /></a>
              <a href="https://web.facebook.com/AzzamAcademy" className="facebook"><i className="icofont-facebook" /></a>
              <a href="#" className="instagram"><i className="icofont-instagram" /></a>
              <a href="#" className="google-plus"><i className="icofont-skype" /></a>
              <a href="#" className="linkedin"><i className="icofont-linkedin" /></a>
            </div>
          </div>
        </div>

        <div className="col-md-6 mt-4 d-flex align-items-stretch">
          <div className="info-box">
            <i className="bx bx-envelope" />
            <h3>Email Me</h3>
            <p>azzamacademy@yahoo.com</p>
          </div>
        </div>
        <div className="col-md-6 mt-4 d-flex align-items-stretch">
          <div className="info-box">
            <i className="bx bx-phone-call" />
            <h3>Call Me</h3>
            <p>0781083139</p>
          </div>
        </div>
      </div>
      <div className="section-title" style={{margin-top:"10px"}}>
        <h6>PLEASE FILL OUT THE FORM BELOW AND WE WILL CONTACT YOU SHORTLY</h6>
      </div>
      <form 
        method="post" 
        name="contactME"
        role="form" 
        action="/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        className="php-email-form mt-4"
      >

        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contactME" />
        <div className="form-row">
          <div className="col-md-6 form-group">
            <input type="text" name="name" required className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
            <div className="validate" />
          </div>
          <div className="col-md-6 form-group">
            <input type="phone" className="form-control" required name="phone" id="phone" placeholder="Your Phone" data-rule="phone" data-msg="Please enter a valid Phone" />
            <div className="validate" />
          </div>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
          <div className="validate" />
        </div>
        <div className="form-group">
          <textarea className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message" />
          <div className="validate" />
        </div>
        <div className="mb-3">
          <div className="loading">Loading</div>
          <div className="error-message" />
          <div className="sent-message">Your message has been sent. Thank you!</div>
        </div>
        <div className="text-center"><button type="submit">Send Message</button></div>
      </form>

    </div>
  </section>


)


export default Contact