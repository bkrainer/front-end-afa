import React from "react";
// import { navigate } from "gatsby-link";
import styled from "styled-components"

const PostContainer = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #ffffffe0;
  margin: 50px 0 500px 0;
`

const PostTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
`

const PostDescription = styled.p`

`

const PostCounter = styled.p`
  font-size: 14px;
  text-align: right;
`

export default class CheckpointBox extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {
    return (
      // <ParallaxProvider>
      <PostContainer id={this.props.id}>
        <PostTitle>{this.props.title}</PostTitle>
        <PostDescription>{this.props.description}</PostDescription>
        <PostCounter>{this.props.checkpointNumber}/{this.props.totalCheckpoints}</PostCounter>
      </PostContainer>
        // <Parallax className="custom-class" y={[-20, 20]} tagOuter="figure">
      // </Parallax>
      // </ParallaxProvider>
    );
  }
}