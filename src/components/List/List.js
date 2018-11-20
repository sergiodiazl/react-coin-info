import React from 'react';
import Table from './Table.js';
import Pagination from'./Pagination.js';
import{handleResponse} from '../../Helpers.js';
import Loading from '../common/Loading';
import{API_URL}from '../../Config.js';
class List extends React.Component{
	constructor(){
		super();
		this.state={
			loading:false,
			currencies:[],
			error:null,
			totalPages:0,
			page:1,
		};
		this.handlePaginationClick=this.handlePaginationClick.bind(this);
	}
	componentDidMount(){	
		this.fetchCurrencies();
	}

	fetchCurrencies(){
		this.setState({loading:true});
		const {page}=this.state;
		fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
    		.then(handleResponse)
    	
    	.then((data) => {
    		const{currencies,totalPages}=data;
    		this.setState({
    			currencies,
    			loading:false,
    			totalPages,
    			});
    		console.log('Success', data);
    	})
    	.catch((error) => {
    		this.setState({error:error.message,loading:false});
      	console.log('Error', error);
    	});
	}
	handlePaginationClick(direction){

		let nextPage=this.state.page;
		nextPage=direction==='next'?nextPage+1:nextPage-1;
		this.setState({page:nextPage},()=>{
			this.fetchCurrencies();
			//callback on state change
		});

	}
	render(){
		const{loading,error,currencies,page,totalPages}=this.state;
		
		if (loading){
			return (<div className="loading-container"><Loading/></div>);
		}
		if(error){
			return (<div className="error">{error}</div>);
		}

		return(
			<div>
			<Table currencies={this.state.currencies}
			renderChangePercent={this.renderChangePercent}/>
			<Pagination page={page}
			totalPages={totalPages}
			handlePaginationClick={this.handlePaginationClick}/>
			</div>
		);
	}
}




export default List;