import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navagate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63692f3815219b849611dc7a.mockapi.io/items/' + id);
        setPizza(data);
      } catch (err) {
        console.log(err);
        alert(err);
        navagate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>'Upload pizza...'</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>

      <h4>${pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
