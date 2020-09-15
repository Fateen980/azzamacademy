import React from 'react'
import PropTypes from 'prop-types'

const Footer = ({ copyrights }) => (
  <footer>
    {copyrights ? (
      <div
        dangerouslySetInnerHTML={{
          __html: copyrights,
        }}
      />
    ) : (
      <>
        <span className="footerCopyrights">
          © 2020 Azzam Academy
        </span>
        <span className="footerCopyrights">
          created by <a href="https://zeromastery.com">Zero Mastery</a>
        </span>
      </>
    )}
  </footer>
)

Footer.propTypes = {
  copyrights: PropTypes.string,
}

export default Footer
