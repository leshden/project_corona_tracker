
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const data = await fetch(changeableUrl);
    const {confirmed, recovered, deaths, lastUpdate} = await data.json();
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async () => {
    try {
      const rawData = await fetch('https://api.covidtracking.com/v1/us/daily.json');
      const  data  = await rawData.json();
      return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
    } catch (error) {
      return error;
    }
  };

export const fetchCountries = async () => {
  try {
    const data = await fetch(`${url}/countries`);
    const {countries} = await data.json();
    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
