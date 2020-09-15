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
            <>
              
              <div key={id} className="infoBanner">
                <Link key={id} to={`/${ref}/${slug}`} class={classes.lessonDecoration}>
                  <span>#{title}</span>
                </Link>
              </div>
             
            </>
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
