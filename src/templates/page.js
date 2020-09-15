import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'

const BlogPostTemplate = ({ data, pageContext }) => {
  
 
  const {
    contentfulBlogPost : post ,
  } = data
  const { next, previous } = pageContext


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
        previousPost={previous}
        nextPost={next}
      />
    </Layout>
  )
}

export default BlogPostTemplate

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
}

export const pageQuery = graphql`
  query($slug: String) {
    contentfulBlogPost(slug: {eq: $slug}) {
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
