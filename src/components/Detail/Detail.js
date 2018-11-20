import React from 'react';
import{API_URL}from '../../Config.js';
import Loading from '../common/Loading';
import { handleResponse,renderChangePercent } from '../../Helpers';
import './Detail.css';

class Detail extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: {},
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const currencyId = this.props.match.params.id;
    this.fetchCurrency(currencyId);
   
  }
  componentWillReceiveProps(nextProps){
    //detecta cambio de url
    if(this.props.location.pathname !== nextProps.location.pathname){
      const newCurrencyId=nextProps.match.params.id;
      this.fetchCurrency(newCurrencyId);
    }
  }
  fetchCurrency(currencyId){
    this.setState({ loading: true });
    console.log(`${API_URL}/cryptocurrencies/${currencyId}`);
    fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
      .then(handleResponse)
      .then((currency) => {
        this.setState({
          loading: false,
          error: null,
          currency,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.errorMessage,
        });
      });

  }
  render() {
    const { loading, error, currency } = this.state;

    // Render only loading component if loading state is set to true
    if (loading) {
      return <div className="loading-container"><Loading /></div>
    }

    // Render only error message, if error occurred while fetching data
    if (error) {
      return <div className="error">{error}</div>
    }

    return (
      <div className="Detail">
        <h1 className="Detail-heading">
          {currency.name} ({currency.symbol})
        </h1>

        <div className="Detail-container">
          <div className="Detail-item">
            Precio <span className="Detail-value">$ {currency.price}</span>
          </div>
          <div className="Detail-item">
            Ranking <span className="Detail-value">{currency.rank}</span>
          </div>
          <div className="Detail-item">
            Cambio en 24Hs
            <span className="Detail-value">{renderChangePercent(currency.percentChange24h)}</span>
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Market cap</span>
            <span className="Detail-dollar">$</span>
            {currency.marketCap}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Volumen 24 HS</span>
            <span className="Detail-dollar">$</span>
            {currency.volume24h}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Oferta total</span>
             <span className="Detail-dollar">$</span>
            {currency.totalSupply}
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
