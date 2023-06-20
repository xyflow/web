import React from 'react';

export default function index(props) {
  return <div>{props.test}</div>;
}

export const getStaticProps = async () => {
  return {
    props: {
      test: 'this is a regular nextjs page!',
    },
  };
};
