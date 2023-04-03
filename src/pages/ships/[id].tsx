import axios from 'axios';
import styles from '@/styles/Ship.module.css';

export default function ShipPage({ ship }) {
  const getShipProperties = () => {
    return {
      name: ship.name,
      mglt: ship.MGLT,
      consumables: ship.consumables,
      cost: ship.cost_in_credits,
      crew: ship.crew,
      rating: ship.hyperdrive_rating,
      length: ship.length,
      manufacturer: ship.manufacturer,
      speed: ship.max_atmosphering_speed,
      model: ship.model,
      passengers: ship.passengers,
      class: ship.starship_class,
    };
  };

  const rows = [];
  const object = getShipProperties();
  for (const property in object) {
    property != 'name' &&
      rows.push(
        <li>
          <span className={styles.rowTitle}>{property.toUpperCase()}: </span>
          {object[property]}
        </li>,
      );
  }

  return (
    <div className={styles.main}>
      <div className={styles.listWrapper}>
        <h1>{getShipProperties().name}</h1>
        <ul className={styles.list}>{rows.map(element => element)}</ul>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const shipsResponse = await axios.get('https://swapi.dev/api/starships');
  const { count } = shipsResponse?.data;
  const requestsNumber = Math.ceil(count / 10);
  const countArray = [];
  for (let i = 0; i < requestsNumber; i++) {
    countArray.push(i);
  }
  const promisesArray = [];
  countArray.forEach((element, index) => {
    promisesArray.push(
      axios.get(`https://swapi.dev/api/starships/?page=${index + 1}`),
    );
  });
  const responses = await Promise.all(promisesArray);
  const resultsArray = responses.map(ship => ship?.data?.results);
  const shipsResult = resultsArray.flat(1);

  return {
    paths: shipsResult.map(ship => {
      return {
        params: { id: ship.url.split('/')[ship.url.split('/').length - 2] },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const result = await axios.get(
    `https://swapi.dev/api/starships/${params.id}`,
  );
  const ship = result?.data;
  return {
    props: {
      ship,
    },
  };
}
