import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Button } from 'reactstrap';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


document.body.style = 'background: black;';

class App extends Component {
  constructor() { 
    super();
    this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
    this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
    this.handleClickCount = this.handleClickCount.bind(this);
    this.state = { viewOnlyLike: false, moviesCount: 0 };
   }
  handleClickLikeOn(){
    this.setState({viewOnlyLike: true});
  }
  handleClickLikeOff(){
    this.setState({viewOnlyLike: false});
  }
  handleClickCount(likeStatus){
    // previous status 
    if(likeStatus == false) {
      this.state.moviesCount ++
    } else {
      this.state.moviesCount --
    } 
    console.log(this.state.moviesCount);
  }

  render() {

    let buttonStyle = {
      background: 'black',
      border: 'none'
    }  
    let moviesData ={
      "films":[
        {"name":"L'Odyséee de Pi", "desc":"Après que leur bateau est victime d'une violente tempête et coule au fond du Pacifique, un adolescent et un tigre du Bengale …", "img":"/pi.jpg"},
        {"name":"Maléfique", "desc":"Poussée par la vengeance et une volonté farouche de protéger les terres qu'elle préside, Maléfique place ...", "img":"/malefique.jpg"},
        {"name":"Les Aventures de Tintin", "desc":"Parce qu'il achète la maquette d'un bateau appelé la Licorne, Tintin, un jeune reporter, se retrouve entraîné dans une fantastique aventure...", "img":"/tintin.jpg"}
      ]
    }
    let moviesLast = ["L'Odysée de Pi", "Maléfique", "Les Aventures de Tintin"] 
    let background = {
      background: 'black'
    };
    let films=[]
    for (let i=0; i<moviesData.films.length; i++) {
      films.push(
      <Col>
        <Movie movieName={moviesData.films[i].name} movieDesc={moviesData.films[i].desc} movieimg={moviesData.films[i].img} viewOnlyLike={this.state.viewOnlyLike} handleClickCountParent={this.handleClickCount}/>
      </Col>
      );
    }
    
    return (
      <Container style={background}>
        <Row>
          <Col>
          <Navbar light expand="md">
          <NavbarBrand href="/">
            <CardImg top width="10%" src="logo.png" alt="Card image cap" />
          </NavbarBrand>          
          <Nav navbar>
            <NavItem>
              <Button style={buttonStyle} onClick={this.handleClickLikeOff}>Last releases</Button>
            </NavItem>
            <NavItem>
              {console.log(this.state.moviesCount)}
              <Button style={buttonStyle} onClick={this.handleClickLikeOn}>My movies ({this.state.moviesCount})</Button>
            </NavItem>
            <NavItem>
              <PopoverItem filmNumber={moviesData.films.length} moviesLast={moviesLast}/>
            </NavItem>
            </Nav>
        </Navbar>
          </Col>
        </Row>
        <Row>
          {films}
        </Row>
      </Container>
      );
  };
}


class Movie extends Component {
  constructor() { 
    super();
    this.likeClick = this.likeClick.bind(this);
    this.state = { like: false };
   }

  likeClick(){
    if(this.state.like == true) {
    this.setState({like: false})
    } else {
    this.setState({like: true})
    }
    console.log(this.state.like)
    this.props.handleClickCountParent(this.state.like);
  }
  
  render() {
    let iconColor;
    let visible;
    if(this.state.like == true) {
     iconColor = { color: "#fc6861" };
    } else {
      iconColor = { color: "grey" };
    }
    if(this.props.viewOnlyLike == false || this.state.like == true) {
      visible = { visibility: "visible" };
     } else {
      visible = { visibility: "hidden" };
     }
    return (
    <div>
      <Card style={visible}>
        <CardImg top width="100%" src={this.props.movieimg} alt="Card image cap" />
        <CardBody>
          <FontAwesomeIcon icon={faHeart} style={iconColor} onClick={this.likeClick} />
          <CardTitle>{this.props.movieName}</CardTitle>
          <CardText>{this.props.movieDesc}</CardText>
        </CardBody>
      </Card>
    </div>
    );
  }
}


class PopoverItem extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    let lastMoviesList =""
    if(this.props.moviesLast.length == 0) {
      lastMoviesList = "Aucun film sélectionné";
    } else if (this.props.moviesLast.length == 1) {
      lastMoviesList = this.props.moviesLast[0];
    } else if (this.props.moviesLast.length == 2) {
      lastMoviesList = this.props.moviesLast[0] + ", " + this.props.moviesLast[1];
    } else if (this.props.moviesLast.length == 3) {
      lastMoviesList = this.props.moviesLast[0] + ", " + this.props.moviesLast[1] + ", " + this.props.moviesLast[2];
    } else {
      lastMoviesList = this.props.moviesLast[0] + ", " + this.props.moviesLast[1] + ", " + this.props.moviesLast[2] + ", ...";
    }
    return (
      <span>
        <Button className="mr-1" color="secondary" id={'Popover-'} type="button">
          {this.props.filmNumber} films dans la librairie
        </Button>
        <Popover isOpen={this.state.popoverOpen} target={'Popover-'} toggle={this.toggle}>
          <PopoverHeader>Derniers films ajoutés</PopoverHeader>
          <PopoverBody>{lastMoviesList}</PopoverBody>
        </Popover>
      </span>
    );
  }
}



export default App;
