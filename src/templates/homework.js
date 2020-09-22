import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Post from '../components/post'
import Layout from '../components/layout'


const HomeWorkTemplate = ({ data }) => {
  
  const {
    contentfulHomework : post ,
  } = data
 

  return (
    <Layout>
      <SEO title={post.title} description={post.excerpt.excerpt || undefined} />
      <Post
        key={post.id}
        title={post.title}
        date={post.date}
        path={post.slug}
        author={post.author}
        html={post.markdown.childMarkdownRemark.html}
        tags={post.tags}
        coverImage={post.image || undefined}
        excerpt={undefined}
      />
    </Layout>
  )
}

export default HomeWorkTemplate

HomeWorkTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
}

export const pageQuery = graphql`
  query($slug: String) {
    contentfulHomework(slug: {eq: $slug}) {
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
 }
`
