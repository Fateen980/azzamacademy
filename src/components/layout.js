import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import Contact from './contact'
import Footer from './footer'

import  '../assets/vendor/bootstrap/css/bootstrap.min.css'
import  '../assets/vendor/boxicons/css/boxicons.min.css'
import  '../assets/vendor/venobox/venobox.css'
import  '../assets/vendor/icofont/icofont.min.css'
import  '../assets/vendor/remixicon/remixicon.css'
import  '../assets/vendor/owl.carousel/assets/owl.carousel.min.css'
import  '../styles/layout.css'
import  '../assets/css/style.css'


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          logo {
            src
            alt
          }
          logoText
          defaultTheme
          copyrights
          mainMenu {
            title
            path
          }
          showMenuItems
          menuMoreText
        }
      }
    }
  `)
  const {
    title,
    logo,
    logoText,
    defaultTheme,
    mainMenu,
    showMenuItems,
    menuMoreText,
    copyrights,
  } = data.site.siteMetadata

  return (
    <div className="container">
      <Header
        siteTitle={title}
        siteLogo={logo}
        logoText={logoText}
        defaultTheme={defaultTheme}
        mainMenu={mainMenu}
        mainMenuItems={showMenuItems}
        menuMoreText={menuMoreText}
      />
      <div className="content">{children}</div>
      <Contact />
      <Footer copyrights={copyrights} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
