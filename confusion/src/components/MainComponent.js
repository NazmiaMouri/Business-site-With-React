import React, { Component } from 'react';
import Home from './HomeComponent'
import About from './AboutComponent'
import Menu from './MenuComponents'
import Contact from './contactComponent'
import  Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { connect} from 'react-redux';
import {addComment,fetchDishes, fetchComments, fetchPromos} from '../redux/ActionCreators'
import {Switch , Route, Redirect, withRouter } from 'react-router-dom';
import {actions} from 'react-redux-form'

const mapStateToProps = state =>{
  return {
    dishes: state.dishes,
    comments:state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = (dispatch) =>({
  addComment: (dishId ,rating,author,comment)=>dispatch(addComment(dishId ,rating,author,comment)),
  fetchDishes:()=>{dispatch(fetchDishes())},
  resetFeedbackForm: ()=>{dispatch(actions.reset('feedback'))},
  fetchComments:()=>{dispatch(fetchComments())},
  fetchPromos:()=>{dispatch(fetchPromos())}
}) 


class Main extends Component {
 

    
  
componentDidMount(){
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchPromos();
  

}
render() {

  const HomePage = () =>{
    return(
      <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
      dishesLoading={this.props.dishes.isLoading}
      dishesError={this.props.dishes.error}
      promosLoading={this.props.promotions.isLoading}
      promosError={this.props.promotions.error}
      promotion={this.props.promotions.promotions.filter((promo)=> promo.featured)[0]}
      leader={this.props.leaders.filter((leader)=> leader.featured)[0]}
      />
    );
  }

  const DishWithId =({match}) =>{
    return(
      <Dishdetail dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                  isLoading={this.props.dishes.isLoading}
                  error={this.props.dishes.error}
                  comments={this.props.comments.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}
                  commentsError={this.props.comments.error}
                  addComment={this.props.addComment}
      />
    );
    
  }
    return (
      <div>
        <Header/>
       <Switch>
         <Route path="/home" component={HomePage}/>
         <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders}/>} />
         <Route exact path='/menu' component={()=><Menu dishes={this.props.dishes}/>}/>
         <Route path='/menu/:dishId' component={DishWithId}/>
         <Route exact path='/contactus' component={() =><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />

         <Redirect to='/home'/>
       </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
