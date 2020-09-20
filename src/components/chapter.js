import React from 'react'
import PropTypes from 'prop-types'
import {Link } from 'gatsby'

import classes from '../styles/sass/index.module.sass'

const Chapter = ({name , course , slug }) => (

  <section id="contact" className="contact section-show">
    <div className="interests container">

      <div className="section-title">
        <h2>Chapter</h2>
      </div>

      <Link to={`/${course}/${slug}`} className={classes.chapterColor}>


        <div className="icon-box">
          <i className="book-alt" style={{color:'#ffbb2c'}} />
          <h3>{name}</h3>
        </div>


      </Link>
    </div>
  </section>

)

Chapter.propTypes = {
    name       : PropTypes.string,
    course     : PropTypes.string,
    slug       : PropTypes.string,
}

export default Chapter
