import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PropTypes from 'prop-types'
import { aboutSection1Type, aboutSection2Type, aboutSection3Type, aboutSection4Type } from '../proptypes/about-proptypes'
import Content, { HTMLContent } from '../components/Content'
import Section1 from '../components/about/Section1';
import Section2 from '../components/about/Section2';
import Section3 from '../components/about/Section3';
import Section4 from '../components/about/Section4';


const AboutPage = ({ data }) => {
  console.log('About data: ', data);
  const { markdownRemark: markdownData } = data
  const frontmatter = markdownData.frontmatter;
  const section1 = frontmatter.section1;
  const section2 = frontmatter.section2;
  const section3 = frontmatter.section3;
  const section4 = frontmatter.section4;
  const section5 = frontmatter.section5;

  const StyledSection1 = styled(Section1)`
  height: 50vh;
  min-height: 500px;
  max-height: 900px;
  `;
  const StyledSection2 = styled(Section2)`
  `;
  const StyledSection3 = styled(Section3)`
    background-color: #a5a5a5;
    background-image: linear-gradient(to left, rgba(0, 125, 130, 0), #016165 64%, #016468);
    @media (max-width: 374px) {
      background-color: #018388;
    }
  `;
  const StyledSection4 = styled(Section4)`
  `;

  return (
    <Layout>
      {/* <StyledAboutPageTemplate
        contentComponent={HTMLContent}
        title={markdownData.frontmatter.title}
        content={markdownData.html}
      /> */}
      <StyledSection1 section1={section1} />
      <StyledSection2 section2={section2} />
      <StyledSection3 section3={section3} />
      <StyledSection4 section4={section4} />
    </Layout>
  )
}

export default AboutPage

AboutPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        content: PropTypes.object,
        contentComponent: PropTypes.func,
        section1: aboutSection1Type.isRequired,
        section2: aboutSection2Type.isRequired,
        section3: aboutSection3Type.isRequired,
        section4: aboutSection4Type.isRequired,
      }).isRequired
    }).isRequired
  }).isRequired,
}

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        section1 {
          heading1
          description1
        }
        section2 {
          section
          definition1
          definition2
          source
        }
        section3 {
          section
          belief1 {
            heading
            description
          }
          belief2 {
            heading
            description
          }
          belief3 {
            heading
            description
          }
        }
        section4 {
          section
          director1 {
            name
            role
            description
          }
          director2 {
            name
            role
            description
          }
          director3 {
            name
            role
          }
          director4 {
            name
            role
          }
          director5 {
            name
            role
          }
        }
      }
    }
  }
`

              // duotone: {
              //   highlight: "#a4ded4",
              //   shadow: "#4d384f"
              // }