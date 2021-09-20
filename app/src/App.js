import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import {Header, Media, Buttons} from './components/Styles';



function App() {


  //Initial data value is null
  const [data, setData] = useState(null);

const getData = () => {
  const URL = 'https://www.plugco.in/public/take_home_sample_feed';
  axios.get(URL).then(res => {
    // after fetching the data set the value to the fetched data
    setData(res.data.campaigns);
  })
  // If there is an error console.log the error and set the data values to the error
  .catch((error) => {
    console.log(error);
    setData(error);
  })
}


// Run the getData function on mount
useEffect(() => {
  getData()
}, [])


const copy = (link) => {
  navigator.clipboard.writeText(link)
}



  console.log(data)

  return (
    <div className="App">
      {/* if data === null display loading */}
      {data === null && <h1>Loading...</h1>}
      {/* If there is an error display failed request */}
      {data === 'error' && <h1>Failed Request! Please try again later</h1>}
      {/* If data is fetched succesfully, map through */}
      {data !== null && data.map((cam, index) => {
        return (
          <div key={index}>
            <Header>
          <img src={cam['campaign_icon_url']} alt='icon'/>
          <div>
            <h3>{cam['campaign_name']}</h3>
            <p>{cam['pay_per_install']}</p>
          </div>
            </Header>
            <Media>
              {
                cam.medias.map((content, index) => {
                  return (
                    <div className='media' key={index}> 
                    <img src={content['cover_photo_url']} alt=''/>
                    {content['media_type'] === 'video' &&<i id='play' className='fas fa-play'></i>}
                    <Buttons>
                    <button onClick={() => copy(content['tracking_link'])}><i className="fal fa-link fa-flip-vertical"></i> </button>
                        <button><a href={content['download_url']} download><i className="fal fa-arrow-to-bottom"></i></a></button>
                    </Buttons>
                    </div>
                  )
                })
              }
            </Media>
            </div>
        )
      })}
    </div>
  );
}

export default App;
