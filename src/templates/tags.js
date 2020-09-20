import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'
import Navigation from '../components/navigation'

import '../styles/layout.css'

const Tags = ({
  data,
  pageContext: { nextPagePath, previousPagePath, tag },
}) => {


  const {
    allContentfulBlogPost: { edges: posts },
    allContentfulCourses : { edges: Tawjihiposts },
  } = data


  return (
    <>
      <SEO />
      <Layout>
        <div className="infoBanner">
          Posts with tag: <span>#{tag}</span>
        </div>

        {posts.map(({ node }) => {
          const {
              id,
              excerpt: { excerpt:autoExcerpt },
              title,
              date,
              slug,
              author,
              tags,
              image,
              excerpt,
          } = node

          return (
            <Post
              key={id}
              title={title}
              date={date}
              path={slug}
              author={author}
              tags={tags}
              coverImage={image || undefined}
              excerpt={excerpt  || autoExcerpt}
            />
          )
        })}


        {Tawjihiposts.map(({ node }) => {
          const {
              id,
              excerpt: { excerpt:autoExcerpt },
              title,
              date,
              slug,
              author,
              tags,
              image,
              excerpt,
          } = node

          return (
            <Post
              key={id}
              title={title}
              date={date}
              path={slug}
              author={author}
              tags={tags}
              coverImage={image || undefined}
              excerpt={excerpt  || autoExcerpt}
            />
          )
        })}



        <Navigation
          previousPath={previousPagePath}
          previousLabel="Newer posts"
          nextPath={nextPagePath}
          nextLabel="Older posts"
        />
      </Layout>
    </>
  )
}

Tags.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
  }),
}

export const postsQuery = graphql`
  query($limit: Int!, $skip: Int!, $tag: String!) {
    allContentfulBlogPost(
      filter: {tags: {in:[$tag]}}
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
            image {
            fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid
            }
           }
            tags
        }
      }
    }

    allContentfulCourses(
      filter: {tags: {in:[$tag]}}
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
            image {
            fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid
            }
           }
            tags
        }
      }
    }
  }
`

export default Tags
