import "./App.css";
import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import { sortData } from "./util";
import InfoBox from "./InfoBox";
import Table from "./Table";
import Articles from "./Articles";

function App() {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getArticlesData = async () => {
      fetch("https://newsdata.io/api/1/news?apikey=pub_4932a4409af547b9e1996083c51dd4eccdec&q=covid&language=en")
      .then((response) => response.json())
      .then((data) => {
        const articles = data.results.map((article) => ({
          title: article.title,
          link: article.link,
          author: article.creator,
          datePub: article.pubDate,
          source: article.source_id,
          country: article.country,
        }));
        setArticles(data);
        setArticleData(articles);
      });
    };
    getArticlesData();
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/> 
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <div className="app__articles">
          <div className="labels">
            <h1 className="article_title">Recent Articles About COVID-19</h1> 
            <h1 className="article_sub">click title to read article</h1>
          </div>
          <Articles articles={articleData}></Articles>
        </div>
      </div>

      <Card className="app__right">
       <CardContent>
         <h3>Cases by Country</h3>
         <Table countries={tableData} />
       </CardContent>
      </Card>
    </div>
  );
}

export default App;
