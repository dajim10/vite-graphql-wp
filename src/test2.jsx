import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import './App.css';

function App() {
  const [nodes, setNodes] = useState([]);
  const categoryId = 21; // Update with the desired category ID as an integer

    const graphql = `query {
        posts(where: { 
          categoryId: 21
        }) {
          nodes {
            id
            title
            date
            link
            guid
            categories {
              edges {
                node {
                  id
                  name
                }
              }
            }
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
      `;
    
//   const graphql = {
//     query: `
//       query GetFilteredPosts($categoryId: ID!) {
//         posts(where: { categories: { edges: { node: { id: $categoryId } } } }) {
//           nodes {
//             id
//             title
//             date
//             link
//             guid
//             categories {
//               edges {
//                 node {
//                   id
//                   name
//                 }
//               }
//             }
//             featuredImage {
//               node {
//                 altText
//                 sourceUrl
//               }
//             }
//           }
//         }
//       }
//     `,
//     variables: {
//       categoryId: 'dGVybToyMQ==',
//     }
//   };
  

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphql),
    redirect: 'follow'
  };

  useEffect(() => {
    fetch("https://www.rmutsv.ac.th/ruts/graphql", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result); // Inspect the response object
        // if (result.data && result.data.posts && result.data.posts.nodes) {
        //   setNodes(result.data.posts.nodes);
        // } else {
        //   console.log('Invalid response structure');
        // }
      })
      .catch(error => console.log('error', error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 30,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <h1>welcome</h1>

      <Carousel
        showArrows
        infiniteLoop
        autoPlay
        emulateTouch
        transitionTime={2000}
      >
        {nodes.map((item, index) => (
          <div key={index}>
            {item.categories && (
              <p>{item.categories.edges[0].node.name}</p>
            )}

            {item.featuredImage && (
              <img
                src={item.featuredImage.node.sourceUrl}
                alt={item.featuredImage.node.altText}
              />
            )}
          </div>
        ))}
      </Carousel>

      
    </>
  );
}

export default App;
