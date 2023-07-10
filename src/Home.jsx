import { useState, useEffect } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { gql } from '@apollo/client'


import './App.css';

function Home() {
  const [nodes, setNodes] = useState([]);
  // fetch 

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "wordpress_test_cookie=WP%20Cookie%20check");
  // dGVybToyMQ==
  const categoryName = 'pr';


  // categories(where: {slug: ["pr","job"]

  const graphql = JSON.stringify({
    query: `
    {
      posts (where : {categoryName : "pr" } ) {
                              nodes{
                                  id
                                  title
                                  date
                                  link
                                  guid
                                  categories  {
                                    edges {
                                      node {
                                        id
                                        name
                                        slug
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
    `

  })

  
  const graphqlSdgs = JSON.stringify({
    query: `
    {
      posts  {
                              nodes{
                                  id
                                  title
                                  date
                                  link
                                  guid
                                  categories  {
                                    edges {
                                      node {
                                        id
                                        name
                                        slug
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
    `

  })


  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };
  const requestOptionsSdgs = {
    method: 'POST',
    headers: myHeaders,
    body: graphqlSdgs,
    redirect: 'follow'
  };

  const fetchSdgs = async () => {
    await fetch(`https://sdgs.rmutsv.ac.th/graphql`, requestOptionsSdgs)
        .then(response => response.json())
        .then(result => {
            console.log(result.data.posts)
            const newData = result.data.posts.nodes;
            setNodes(prevNodes => [...prevNodes, ...newData]);
        })
        .catch(error => console.log(error));
}  
    
  useEffect(() => {
    fetch(`https://www.rmutsv.ac.th/ruts/graphql`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.data.posts);
          setNodes(result.data.posts.nodes)
          fetchSdgs();

      })
      .catch(error => console.log('error', error));
  }, [])

  // end fetch

  const settings = {
    dots: true,
    infinite: true,
    speed: 30,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };

  return (
    <>

      <Carousel
        showArrows={true}
        infiniteLoop
        autoPlay
        emulateTouch
        interval={5000}
        // transitionTime={5000}
        stopOnHover={true}
        // width={900}
        showThumbs={false}
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


            {/* <h2>{item.title}</h2> */}

          </div>
        ))}

      </Carousel>


      {/* <Slider {...settings}>
        {nodes.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
            {item.featuredImage && (
              <img
                src={item.featuredImage.node.sourceUrl}
                alt={item.featuredImage.node.altText}
                style={{ height: '100vh' }}
              />
            )}
          </div>
        ))}
      </Slider> */}

      {/* {nodes.map((item, index) => (
  <div key={index}>
    <h2>{item.title}</h2>
    {item.featuredImage && (
      <img
        src={item.featuredImage.node.sourceUrl}
        alt={item.featuredImage.node.altText}
      />
    )}
  </div>
))} */}
    </>
  )
}

export default Home
