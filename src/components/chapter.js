import React from 'react'
import PropTypes from 'prop-types'
import {Link } from 'gatsby'

import classes from '../styles/sass/index.module.sass'

const Chapter = ({name , course , slug }) => (
  
  <>
    <section className={classes.chapter}>
      <h2 className={classes.chapterTitle}>

        <Link to={`/${course}/${slug}`} className={classes.chapterColor}>
          {name}
        </Link>
      </h2>
    </section>
  </>
)

Chapter.propTypes = {
    name       : PropTypes.string,
    course     : PropTypes.string,
    slug       : PropTypes.string,
}

export default Chapter
