import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Chapter from '../components/chapter'
import Layout from '../components/layout'


const TawjihiPostTemplate = ({ data }) => {
  
  const {
    contentfulTawjihi : post ,
    allContentfulChapters : { edges: chapters }  ,
  } = data
 

  return (
    <Layout>
      <SEO title={post.title} description={post.excerpt.excerpt || undefined} />

      {chapters.map(({ node }) => {
          const {
            id,
            title,
            course,
            slug,
          } = node

          return (
            <Chapter key={id} course={course} name={title} slug={slug} />
          )
        })}

    </Layout>
  )
}

export default TawjihiPostTemplate

TawjihiPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
}

export const pageQuery = graphql`
  query($slug: String , $course: String) {
    contentfulTawjihi(slug: {eq: $slug}) {
    id  
    author
    date
    slug
    tags
    title
    excerpt {
      excerpt
    }
      image {
            fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid
           }
     }

      markdown {
          childMarkdownRemark {
            html
          }
        }
     }

 allContentfulChapters(
   filter: {course: {eq: $course }}
   sort: { fields: [contentfulid], order: ASC }) {
    edges {
      node {
        description
        id
        next
        prev
        slug
        title
        course
      }
    }
  }
 }
`
