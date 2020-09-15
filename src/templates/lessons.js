import React from 'react'	
import PropTypes from 'prop-types'	
import { graphql } from 'gatsby'	

import SEO from '../components/seo'	
import Layout from '../components/layout'	
import Post from '../components/post'	

const LessonTemplate = ({ data, pageContext }) => {	




  const {	
    contentfulLessons : post ,	
  } = data	
  const { next, previous } = pageContext	
	

  return (	
    <Layout>	
      <SEO title={post.title} description={post.title || undefined} />	
      <Post	
        key={post.id}	
        title={post.title}	
        date={post.date}	
        path={post.slug}	
        author={post.author}	
        html={post.markedown.childMarkdownRemark.html || undefined}	
        tags={undefined}	
        coverImage={post.image || undefined}	
        previousPost={previous}	
        nextPost={next}	
      />	
    </Layout>	
  )	
}	

export default LessonTemplate	

LessonTemplate.propTypes = {	
  data: PropTypes.object.isRequired,	
  pageContext: PropTypes.shape({	
    next: PropTypes.object,	
    previous: PropTypes.object,	
  }),	
}	

export const pageQuery = graphql`	
  query($slug: String) {	
  contentfulLessons(slug: {eq: $slug}) {	
    ref	
    slug	
    id	
    title	
    markedown {	
      childMarkdownRemark {	
            html	
          }	
      }	
   }	
 }	
`