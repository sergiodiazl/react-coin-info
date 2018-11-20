import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import  {renderChangePercent} from '../../Helpers';
import './Table.css'
const Table =(props)=>{
	const{currencies,history}=props;
	return(
		<div className='Table-container'>
			
			<table className='Table'>
				<thead className='Table-head'>
					<tr>
					<th>CriptoMoneda</th>
					<th>Precio</th>
					<th>Market cap</th>
					<th>Cambio en 24Hs</th>
					</tr>
				</thead>
				<tbody className="Table-body">
					{currencies.map((currency)=>(
						<tr 
							key={currency.id}
							onClick={()=>history.push(`/currency/${currency.id}`)}
						>
							<td>
								<span className="Table-ranking">{currency.rank}</span>
								{currency.name}
							</td>
							<td>
								<span className="Table-dollar">${currency.price}</span>
							</td>
							<td>
								<span className="Table-dollar">${currency.marketCap}</span>
							</td>
							<td>
								{renderChangePercent(currency.percentChange24h)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			</div>
		);
}
Table.propTypes={
	currencies:PropTypes.array.isRequired,
	history:PropTypes.object.isRequired,
}
export default withRouter(Table);