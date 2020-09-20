const postCssPresetEnv = require(`postcss-preset-env`)
const postCSSNested = require('postcss-nested')
const postCSSUrl = require('postcss-url')
const postCSSImports = require('postcss-import')
const cssnano = require('cssnano')
const postCSSMixins = require('postcss-mixins')

module.exports = {
  siteMetadata: {
    title: `Azzam Academy`,
    description: `Azzam Academy`,
    copyrights: '',
    author: `@orwa`,
    logo: {
      src: '',
      alt: '',
    },
    logoText: 'Azzam Academy',
    defaultTheme: 'dark',
    postsPerPage: 100,
    showMenuItems: 2,
    menuMoreText: 'Show more',
    mainMenu: [
      {
        title: 'About',
        path: '/about',
      },
      {
        title: 'Courses',
        path: '/Tawjihi',
      },
    ],
  },
  plugins: [
    `babel-preset-gatsby`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: '4kjgwhli9daq',
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken:'6-Vtg-zHuiMH7TrXq5fa_Donid4vsYEHtnTpqejhAKQ',
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          postCSSUrl(),
          postCSSImports(),
          postCSSMixins(),
          postCSSNested(),
          postCssPresetEnv({
            importFrom: 'src/styles/variables.css',
            stage: 1,
            preserve: false,
          }),
          cssnano({
            preset: 'default',
          }),
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 100,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `azzam-academy`,
        short_name: `azzam-academy`,
        start_url: `/`,
        background_color: `#292a2d`,
        theme_color: `#292a2d`,
        display: `minimal-ui`,
        icon: `src/images/hello-icon.png`,
      },
    },
  ],
}
