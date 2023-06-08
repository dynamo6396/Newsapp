import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
export class News extends Component {    
    constructor(){
        super();
        console.log('Hellow I am a constructor from news component')
        this.state={
             articles: [],
             loading: false,
             page:1 
          }
        }
        async componentDidMount(){
          let url=`https:newsapi.org/v2/top-headlines?country=us&category=business&apiKey=349e9845efec49b68c8f53f288e27ff5&page=1 &pageSize=${this.props.size}`;          
          this.setState({loading:true});
          let data= await fetch(url);
          let parseddata=await data.json();
          console.log(parseddata);
          this.setState({articles:parseddata.articles,totalarticles:parseddata.totalResults,loading:false}) 
          
        }
        handlePreviousClick= async()=>{
          console.log("Previous")
          this.setState({loading:true});
          if(this.state.page+1<=Math.ceil(this.state.totalarticles/20)){
            let url=`https:newsapi.org/v2/top-headlines?country=us&category=business&apiKey=349e9845efec49b68c8f53f288e27ff5&page=${this.state.page-1} &pageSize=${this.props.size}`;
            let data= await fetch(url);
            let parseddata=await data.json();
            console.log(parseddata);
            this.setState( {
             articles:parseddata.articles,
             page:this.state.page-1,
             loading:false
           }) 
          }
        }
        handleNextClick= async()=>{
         console.log("Next")
         this.setState({loading:true});
         if(this.state.page+1<=Math.ceil(this.state.totalarticles/20)){
          let url=`https:newsapi.org/v2/top-headlines?country=us&category=business&apiKey=349e9845efec49b68c8f53f288e27ff5&page=${this.state.page+1} &pageSize=${this.props.size}`;
          let data= await fetch(url);
          let parseddata=await data.json();
          console.log(parseddata);      
          this.setState( {
           articles:parseddata.articles,
           page:this.state.page+1,
           loading:false
         }) 
        }
        
       }

       
  render() {
    return (
      <div>
        <div className="container my-3">
          <h1 className="text-center">Top-Headlines</h1>
           {this.state.loading&& <Spinner/>}
            <div className="row">
               { !this.state.loading&& this.state.articles.map((element)=>{
                    return <div className="col-md-4">
                          <NewsItem title={element.title?element.title.slice(0,45)+"...":""} description={element.description?element.description.slice(0,88)+"...":""} imageurl={element.urlToImage} newsUrl={element.url}/>
                      </div>

               })}
            </div>
            <div className="container d-flex justify-content-between">
              <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
              <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalarticles/20)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>        
      </div>
    )
  }
}

export default News
