import React  from 'react';
import {Card, CardHeader, CardImg,  CardText, CardBody, CardTitle } from 'reactstrap';



    function RenderDish ({dish}){
     
        if( dish != null){
            console.log(dish)
            return(
                <div className='col-12 col-md-5 m-1'>
                    <Card >
                        < CardImg width='100%' src={dish.image} alt={dispatchEvent.name}></ CardImg>
                        <CardBody>
                            <CardTitle heading>{dish.name}</CardTitle> 
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else{
            return(
                <div>
                   
                </div>
               
            );
        }
    }
   
    function RenderComment({dish}){
        
        if( dish == null){
            return(
                <div> </div>
               
            );
        }
           
         var comments=dish.comments.map((comment)=>{
          return(
                <CardBody key={comment.id}>
                            <blockquote className="blockquote ">
                            <p>                                                           
                                {' '}
                                {comment.comment}{' '}
                            </p>
                            <footer className="blockquote-footer">
                            {comment.author}&nbsp;, &nbsp;
                            {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}
                               
                            </footer>
                            </blockquote>
                 </CardBody>
             
            );
           })

           return(
            <div  className='col-12 col-md-5 m-1'>
               <Card>
                    <CardHeader><h4>Comments</h4></CardHeader>
                        {comments}
            </Card>
            </div>
            );
        }
    
        
   
   const Dishdetail=(props)=>{
        return(
            <div className='container'>
            <div className='row'>
            
            <RenderDish dish={props.dish} />
            <RenderComment dish={props.dish} />

            </div>
            </div>
        ); 
    }
      

export default Dishdetail;
