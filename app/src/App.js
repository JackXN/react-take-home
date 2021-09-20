import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';



function App() {

const [appInfo, setAppInfo] = useState();

  useEffect(() => {
    fetch('https://www.plugco.in/public/take_home_sample_feed')
    .then((res) => res.json())
    .then(res => console.log(res))
    .then((res) => res.campaigns.map((camp) => {
      return {
        name: camp.campaign_name
      }
    } ))
  }, [])


  return (
    <div className="App">
        <h1>PLUGS</h1>
          <hr/>
      <div className='header_container'>
        <Header/>
      </div>
    </div>
  );
}

export default App;
