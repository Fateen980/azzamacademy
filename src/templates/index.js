import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'
import Navigation from '../components/navigation'

const Index = ({ data, pageContext: { nextPagePath, previousPagePath } }) => {
  const {
    allContentfulBlogPost : { edges: posts },
  } = data


  return (
    <>
      <SEO />
      <Layout>
        {posts.map(({ node }) => {
          const {
              id,
              excerpt: { excerpt:autoExcerpt },
              title,
              date,
              slug,
              author,
              excerpt,
              image,
              tags,
          } = node

          return (
            <Post
              key={id}
              title={title}
              date={date}
              path={slug}
              author={author}
              tags={tags}
              coverImage={image || autoExcerpt}
              excerpt={excerpt  || autoExcerpt}
            />
          )
        })}

      
      </Layout>
    </>
  )
}

Index.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
  }),
}

export const postsQuery = graphql`
  query($limit: Int!, $skip: Int!) {
    allContentfulBlogPost(
      filter: {slug: {ne: "about"}}
      sort: { fields: [date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
            id
            title
            date(formatString: "DD MMMM YYYY")
            slug
            author
            excerpt {
              excerpt
            }
            tags
            image {
            fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid
           }
         }
        }
      }
    }
  }
`

export default Index
