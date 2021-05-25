import React, {useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import { GET_WEATHER_QUERY } from '../graphql/Queries'

function Home() {
    const [citySearched, setCitySearched] = useState("");
    const [getWeather, {loading, data, error}] = useLazyQuery(GET_WEATHER_QUERY, {
        variables: {name: citySearched },
    });

    if (error) return <h1>Error Found</h1>;

    if (data) {
        console.log(data);
    }

    return (
        <div className="home">
            <h1>Search for Weather</h1>
            <input 
                type="text" 
                placeholder="City Name..."
                onChange= {(event) => {
                    setCitySearched(event.target.value);
                }} />
            <button onClick={() => getWeather()}>Search</button>
            
            <div className= "weather">
                {data && (
                    <>
                        <h4>{data.getCityByName.name}</h4>
                        <h4>Temperature: {data.getCityByName.weather.temperature.actual}</h4>
                        <h4>Description: {data.getCityByName.weather.summary.description}</h4>
                        <h4>Wind Speed: {data.getCityByName.weather.wind.speed}</h4>
                    </>
                )}
            </div>

        </div>
    )
}

export default Home;
