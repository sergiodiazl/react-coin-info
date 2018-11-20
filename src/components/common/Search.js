import React from 'react';
import{withRouter}from'react-router-dom';
import './Search.css';
import{handleResponse} from '../../Helpers.js';
import{API_URL}from '../../Config.js';
import Loading from './Loading';
import search from './search.png';

class Search extends React.Component{
	constructor(){
		super();
		this.state={ 
			searchResults:[],
			searchQuery:'',
			loading:false,
		}
		this.handleChange=this.handleChange.bind(this);
		this.handleRedirect=this.handleRedirect.bind(this);
	}
	handleRedirect(currencyId){
		this.setState({
			searchQuery:'',
			searchResults:[],
		})
		this.props.history.push(`/currency/${currencyId}`);
	}
	handleChange(event){
	
		const searchQuery=event.target.value;
		this.setState({searchQuery})
		//si no hay searchquery no se hace la consulta a api
		if(!searchQuery){
			return'';
		}
		this.setState({loading:true})
		fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
		.then(handleResponse)
		.then((result)=>{
			console.log(result);
			this.setState({
				loading:false,
				searchResults:result});
		});
		
		
	}
	renderSearchResults(){
		const{ searchResults,searchQuery,loading}=this.state;
		if(!searchQuery){
			return'';
		}
		if(searchResults.length>0){
			return(
				<div className="Search-result-container">
				{searchResults.map(result=>(
					<div
						key={result.id} 
						className="Search-result"
						onClick={()=>this.handleRedirect(result.id)}
					>
					{result.name}({result.symbol})
					</div>
				))}
				</div>
			);
		}
		else if(!loading){
			return(
			<div className="Search-result-container">
				<div className="Search-no-result">
					No hay resultados
				</div>
			</div>	
			);
		}
	}


	render(){
		const {loading,searchQuery}=this.state;
		return(
			<div className="Search">
				<span className="Search-icon"/>
				<input
					className="Search-input"
					type="text"
					placeholder="Buscar criptomoneda" 
					onChange={this.handleChange} 
					value={searchQuery}
				/>
				{loading &&
				<div className="Search-loading">
					<Loading
						width='12px'
						height='12px'/>
				</div>	}	
				{this.renderSearchResults()}
			</div>);
	}
}
export default withRouter(Search);