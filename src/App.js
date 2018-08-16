import React from 'react';

import Titles from './components/titles';

import Form from './components/forms';

import Weather from './components/weather';

const API_KEY = "807ea766c60491744d9371b1bb7625d0";

class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = encodeURIComponent(e.target.elements.city.value);
    const country = encodeURIComponent(e.target.elements.country.value);

    if(city && country) {

        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},
        ${country}&APPID=${API_KEY}&units=metric`);

        const data = await api_call.json();

        if(data.cod && data.cod == 404) {

          this.setState({
            error: 'Cidade não encontrada'
          })
          return;

        };

        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
        });

      } else {

        this.setState({
          error: 'Preencha todos os campos'
        })

      }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">

                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
