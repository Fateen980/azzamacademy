import React from 'react'
import PropTypes from 'prop-types'
import { graphql , Link } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'

import classes from '../styles/sass/index.module.sass'

const ChapterTemplate = ({ data }) => {
  
  const {
    allContentfulLessons : { edges: lessons }  ,
  } = data
 

  return (
    <Layout>
      <SEO title={lessons.title} description={lessons.title || undefined} />

      {lessons.map(({ node }) => {
          const {
            ref,
            slug,
            title,
            id,
          } = node

          return (
            <section id="contact" className="contact section-show">
              <div className="interests container">

                <div className="section-title">
                  <h2>Lesson</h2>
                </div>

                <Link key={id} to={`/${ref}/${slug}`} class={classes.lessonDecoration}>


                  <div className="icon-box">
                    <i className="book-alt" style={{color:'#ffbb2c'}} />
                    <h3>{title}</h3>
                  </div>


                </Link>
              </div>
            </section>
          )
        })}


    </Layout>
  )
}

export default ChapterTemplate

ChapterTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
}

export const pageQuery = graphql`
  query($ref: String) {
    allContentfulLessons(filter: {ref: {eq: $ref}}
                         sort: {order: ASC, fields: contentfulid}) {
    edges {
      node {
        contentfulid
        ref
        slug
        title
        id
      }
    }
  }
 }
`
