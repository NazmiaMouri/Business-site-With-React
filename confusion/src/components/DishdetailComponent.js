import React,{Component}  from 'react';
import {Card, CardHeader, CardImg,  CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,Label,Col,Row,ModalBody,ModalHeader } from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm, Control,Errors } from 'react-redux-form';
import Loading from "./LoadingComponent";
import {baseUrl} from '../shared/baseURL'

const required = (val) => val && val.length;
const maxlength = (len) => (val) => !(val) || (val.length <= len);
const minlength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props)
    this.state={
       
        isModalOpen: false
    };
   
    this.toggleModal=this.toggleModal.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
}
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleSubmit(values){
        this.toggleModal()
        
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

      
    }
    render(){
        return(
            <>
            <Button className='col-5 ml-2 mb-2' outline onClick={this.toggleModal}>
            <span className="fa fa-pencil" /> Submit Comment
            </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                <Row className='form-group'>
                    <Label md={12} htmlFor='rating'>Rating</Label>
                    <Col md={{size: 12}}>
                    <Control.select model='.rating'name='rating'
                    className='form-control'
                    >

                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        
                    </Control.select>
                    </Col>
                </Row>
                <Row className='form-group'>
                    <Label md={12} htmlFor='author'>Your Name</Label>
                    <Col md={12}>
                        <Control.text  model='.author' id='author' name='author'
                        placeholder='Your Name' className='form-control'
                        validators={{
                            required,
                            minlength:minlength(2),
                            maxlength:maxlength(15)}}/>
                        
                        <Errors className='text-danger'
                        model='.author'
                        show='touched'
                        messages={{
                            required: 'Required',
                            minlength : 'Must be greater than 2 characters',
                            maxlength : 'Must be less  than 15 characters'
                        }} />
                    </Col>
                </Row>
                <Row className='form-group'>
                    <Label md={12} htmlFor='comment'>Comment</Label>
                    <Col md={12}>
                    <Control.textarea model='.comment' id='comment' name='comment' 
                    rows='6'  className='form-control'
                    validators={{
                        required}}/>
                    
                    <Errors className='text-danger'
                    model='.comment'
                    show='touched'
                    messages={{
                        required: 'Required',
                       
                    }} />
                    </Col>
                </Row>

                <Button  type='submit' value='submit' className='btn btn-primary' >Submit</Button>
                </LocalForm>
            </ModalBody>
            </Modal>
            </>
        );
    }
}

    function RenderDish ({dish, isLoading,error}){
        if(isLoading){
            return(
                <div className='conatiner'>
                    <div className='row'>
                       <Loading/> 
                    </div>
                </div>
            )
        }
        else if(error){
            return(
                <div className="container">
                    <div className='row'>
                        <h4>{error}</h4>
                    </div>
                </div>
            )
        }
     
        else if( dish != null){
            
            return(
                <div className='col-12 col-md-5 m-1'>
                    <Card >
                        < CardImg width='100%' src={baseUrl + dish.image} alt={dispatchEvent.name}></ CardImg>
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
   
    function RenderComment({comment , addComment,dishId}){
        
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
                        <CommentForm addComment={addComment} dishId={dishId}/>
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
                
                <RenderDish dish={props.dish} isLoading={props.isLoading} error={props.error} />
                <RenderComment comment={props.comments} 
                addComment={props.addComment}
                dishId={props.dish.id}/>

                </div>
            </div>
        ); 
    }


export default Dishdetail;
