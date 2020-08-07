import React  from 'react';
import {Card, CardHeader, CardImg,  CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom'


    function RenderDish ({dish}){
     
        if( dish != null){
            
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
   
    function RenderComment({comment}){
        
        if( comment == null){
           
            return(
                <div> </div>
               
            );
        }
           
         const comments=comment.map((comment)=>{
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
                <Breadcrumb>
                   
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>

                </Breadcrumb>
                <div className='col-12'>
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
                </div>
                <div className='row'>
                
                <RenderDish dish={props.dish} />
                <RenderComment comment={props.comments} />

                </div>
            </div>
        ); 
    }
      

export default Dishdetail;
