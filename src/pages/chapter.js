import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'


const ChapterPage = ({ data }) => {


    const {
    allContentfulTawjihi : { edges: posts },
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
              path={`/Tawjihi/${slug}`}
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

ChapterPage.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
  }),
}

export const postsQuery = graphql`
  query {
    allContentfulTawjihi(
      sort: { fields: [date], order: DESC }
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

export default ChapterPage
