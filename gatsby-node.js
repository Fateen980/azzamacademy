const { paginate } = require('gatsby-awesome-pagination')
const { forEach, uniq, filter, not, isNil, flatMap } = require('rambdax')
const path = require('path')
const { toKebabCase } = require('./src/helpers')


const pageTemplate     = path.resolve(`./src/templates/page.js`)
const tawjihiTemplate  = path.resolve(`./src/templates/tawjihi.js`)
const homeworkTemplate = path.resolve(`./src/templates/homework.js`)
const chapterTemplate  = path.resolve(`./src/templates/chapter.js`)
const lessonTemplate   = path.resolve(`./src/templates/lessons.js`)
const indexTemplate    = path.resolve(`./src/templates/index.js`)
const tagsTemplate     = path.resolve(`./src/templates/tags.js`)

exports.createPages = ({ actions, graphql, getNodes }) => {
  const { createPage } = actions
  const allNodes = getNodes()



  return graphql(`
  {
    allContentfulBlogPost(sort: {fields: [date], order: DESC}, limit: 1000) {
      edges {
        node {
          title
          slug
          tags
        }
      }
    }

    site {
      siteMetadata {
        postsPerPage
      }
    }
  }   
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const {
      allContentfulBlogPost : { edges: markdownPages },
      site: { siteMetadata },
    } = result.data

    const sortedPages = markdownPages.sort((pageA, pageB) => {
      const typeA = pageA.node.slug
      const typeB = pageB.node.slug

      return (typeA > typeB) - (typeA < typeB)
    })


    const posts = allNodes

    // Create posts index with pagination
    paginate({
      createPage,
      items: posts,
      component: indexTemplate,
      itemsPerPage: siteMetadata.postsPerPage,
      pathPrefix: '/',
    })

    // Create each markdown page and post
    forEach(({ node }, index) => {
      const previous = index === 0 ? null : sortedPages[index - 1].node
      const next =
        index === sortedPages.length - 1 ? null : sortedPages[index + 1].node
      const isNextSameType = node.slug === (next && next.slug)
      const isPreviousSameType =
        node.slug === (previous && previous.slug)


      createPage({
        path: node.slug,
        component: pageTemplate,
        context: {
          slug: node.slug,
          next: isNextSameType ? next : null,
          previous: isPreviousSameType ? previous : null,
        },
      })
    }, sortedPages)

    // Create tag pages
    const tags = filter(
      tag => not(isNil(tag)),
      uniq(flatMap(post => post.tags, posts)),
    )

    forEach(tag => {
      const postsWithTag = posts.filter(
        post =>
          post.tags && post.tags.indexOf(tag) !== -1,
      )

      paginate({
        createPage,
        items: postsWithTag,
        component: tagsTemplate,
        itemsPerPage: siteMetadata.postsPerPage,
        pathPrefix: `/tag/${toKebabCase(tag)}`,
        context: {
          tag,
        },
      })
    }, tags)

    return {
      sortedPages,
      tags,
    }
  })
  .then(() => graphql(`
    {
      allContentfulCourses {
        edges {
          node {
            title
            slug
            tags
          }
        }
      }
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }   
    `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors)
      }
  
      const {
        allContentfulCourses : { edges: markdownPages },
        site: { siteMetadata },
      } = result.data
  
      const sortedPages = markdownPages.sort((pageA, pageB) => {
        const typeA = pageA.node.slug
        const typeB = pageB.node.slug
  
        return (typeA > typeB) - (typeA < typeB)
      })
  
  
      const posts = allNodes
  
      // Create posts index with pagination
      paginate({
        createPage,
        items: posts,
        component: indexTemplate,
        itemsPerPage: siteMetadata.postsPerPage,
        pathPrefix: '/',
      })
  
      // Create each markdown page and post
      forEach(({ node }, index) => {
        const previous = index === 0 ? null : sortedPages[index - 1].node
        const next =
          index === sortedPages.length - 1 ? null : sortedPages[index + 1].node
        const isNextSameType = node.slug === (next && next.slug)
        const isPreviousSameType =
          node.slug === (previous && previous.slug)
  
  
        createPage({
          path: `/Tawjihi/${node.slug}/` ,
          component: tawjihiTemplate,
          context: {
            slug: node.slug,
            course: node.slug,
            next: isNextSameType ? next : null,
            previous: isPreviousSameType ? previous : null,
          },
        })
      }, sortedPages)
  
      // Create tag pages
      const tags = filter(
        tag => not(isNil(tag)),
        uniq(flatMap(post => post.tags, posts)),
      )
  
      forEach(tag => {
        const postsWithTag = posts.filter(
          post =>
            post.tags && post.tags.indexOf(tag) !== -1,
        )
  
        paginate({
          createPage,
          items: postsWithTag,
          component: tagsTemplate,
          itemsPerPage: siteMetadata.postsPerPage,
          pathPrefix: `/tag/${toKebabCase(tag)}`,
          context: {
            tag,
          },
        })
      }, tags)
  
      return {
        sortedPages,
        tags,
      }
    }))

  .then(() => graphql(`
    {
      allContentfulChapters {
        edges {
          node {
            title
            slug
            course
            
          }
        }
      }
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }   
    `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors)
      }
  
      const {
        allContentfulChapters : { edges: markdownPages },
        site: { siteMetadata },
      } = result.data

      
  
      const sortedPages = markdownPages.sort((pageA, pageB) => {
        const typeA = pageA.node.slug
        const typeB = pageB.node.slug
  
        return (typeA > typeB) - (typeA < typeB)
      })
  
  
      const posts = allNodes
  
      // Create posts index with pagination
      paginate({
        createPage,
        items: posts,
        component: indexTemplate,
        itemsPerPage: siteMetadata.postsPerPage,
        pathPrefix: '/',
      })
  
      // Create each markdown page and post
      forEach(({ node }, index) => {
        const previous = index === 0 ? null : sortedPages[index - 1].node
        const next =
          index === sortedPages.length - 1 ? null : sortedPages[index + 1].node
        const isNextSameType = node.slug === (next && next.slug)
        const isPreviousSameType =
          node.slug === (previous && previous.slug)
  
  
        createPage({
          path: `/${node.course}/${node.slug}` ,
          component: chapterTemplate,
          context: {
            slug: node.slug,
            ref: node.slug,
            next: isNextSameType ? next : null,
            previous: isPreviousSameType ? previous : null,
          },
        })
      }, sortedPages)
  
      return {
        sortedPages,
      }
    }))


  .then(() => graphql(`
    {
      allContentfulLessons(sort: {order: ASC, fields: contentfulid}) {
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
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }   
    `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors)
      }
  
      const {
        allContentfulLessons : { edges: markdownPages },
        site: { siteMetadata },
      } = result.data

      
  
      const sortedPages = markdownPages.sort((pageA, pageB) => {
        const typeA = pageA.node.slug
        const typeB = pageB.node.slug
  
        return (typeA > typeB) - (typeA < typeB)
      })
  
  
      const posts = allNodes
  
      // Create posts index with pagination
      paginate({
        createPage,
        items: posts,
        component: indexTemplate,
        itemsPerPage: siteMetadata.postsPerPage,
        pathPrefix: '/',
      })
  
      // Create each markdown page and post
      forEach(({ node }, index) => {
        const previous = index === 0 ? null : sortedPages[index - 1].node
        const next =
          index === sortedPages.length - 1 ? null : sortedPages[index + 1].node
        const isNextSameType = node.slug === (next && next.slug)
        const isPreviousSameType =
          node.slug === (previous && previous.slug)
  
  
        createPage({
          path: `/${node.ref}/${node.slug}` ,
          component: lessonTemplate,
          context: {
            slug: node.slug,
            ref:  node.ref,
            next: isNextSameType ? next : null,
            previous: isPreviousSameType ? previous : null,
          },
        })
      }, sortedPages)
  
      return {
        sortedPages,
      }
    }))

  .then(() => graphql(`
    {
      allContentfulHomework {
        edges {
          node {
            title
            slug
            tags
          }
        }
      }
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }   
    `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors)
      }
  
      const {
        allContentfulHomework : { edges: markdownPages },
        site: { siteMetadata },
      } = result.data
  
      const sortedPages = markdownPages.sort((pageA, pageB) => {
        const typeA = pageA.node.slug
        const typeB = pageB.node.slug
  
        return (typeA > typeB) - (typeA < typeB)
      })
  
  
      const posts = allNodes
  
      // Create posts index with pagination
      paginate({
        createPage,
        items: posts,
        component: indexTemplate,
        itemsPerPage: siteMetadata.postsPerPage,
        pathPrefix: '/',
      })
  
      // Create each markdown page and post
      forEach(({ node }, index) => {
        const previous = index === 0 ? null : sortedPages[index - 1].node
        const next =
          index === sortedPages.length - 1 ? null : sortedPages[index + 1].node
        const isNextSameType = node.slug === (next && next.slug)
        const isPreviousSameType =
          node.slug === (previous && previous.slug)
  
  
        createPage({
          path: `/homework/${node.slug}/` ,
          component: homeworkTemplate,
          context: {
            slug: node.slug,
            next: isNextSameType ? next : null,
            previous: isPreviousSameType ? previous : null,
          },
        })
      }, sortedPages)
  
      // Create tag pages
      const tags = filter(
        tag => not(isNil(tag)),
        uniq(flatMap(post => post.tags, posts)),
      )
  
      forEach(tag => {
        const postsWithTag = posts.filter(
          post =>
            post.tags && post.tags.indexOf(tag) !== -1,
        )
  
        paginate({
          createPage,
          items: postsWithTag,
          component: tagsTemplate,
          itemsPerPage: siteMetadata.postsPerPage,
          pathPrefix: `/tag/${toKebabCase(tag)}`,
          context: {
            tag,
          },
        })
      }, tags)
  
      return {
        sortedPages,
        tags,
      }
    }))


}

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
    }

    type Frontmatter {
      title: String!
      author: String
      date: Date! @dateformat
      path: String!
      tags: [String!]
      excerpt: String
      coverImage: File @fileByRelativePath
    }
  `
  createTypes(typeDefs)
}
