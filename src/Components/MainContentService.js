import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import {withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class First extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container maxWidth="lg" className={this.props.classes.container}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={this.props.fixedHeightPaper}>
                        <Chart {...this.props}/>
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={this.props.fixedHeightPaper}>
                        <Deposits />
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper className={this.props.classes.paper}>
                        <Orders />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
class Second extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              defaultZoom={8}
              defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
              <Marker
                position={{ lat: -34.397, lng: 150.644 }}
              />
            </GoogleMap>
          ));
        return(
            <Container maxWidth="lg" className={this.props.classes.container}>
                <Grid container spacing={3}>
                <Paper style={{width:'100%', height: '100%r'}}>
                    <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhpyh11OwEybLYGNP9VRIMfGY7pyBwtdQ&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` , width:`100%`}} />}
                    containerElement={<div style={{ height: `400px` , width: `100%`}} />}
                    mapElement={<div style={{ height: `100%` , width:`100%`}} />}
                    />
                </Paper>
                </Grid>
            </Container>
        )
    }
}
class Third extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container maxWidth="lg" className={this.props.classes.container}>
                <Grid container spacing={3}>
                    
                </Grid>
            </Container>
        )
    }
}
class Fourth extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container maxWidth="lg" className={this.props.classes.container}>
                <Grid container spacing={3}>
                    
                </Grid>
            </Container>
        )
    }
}
class Fifth extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container maxWidth="lg" className={this.props.classes.container}>
                <Grid container spacing={3}>
                    
                </Grid>
            </Container>
        )
    }
}

export default class MainContentService extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            render: <First {...this.props} />
        }
    }
    renderFunc = (index) => {
        let  temp = false
        switch (index + 1) {
            case 1:
                temp = (<First {...this.props} />)
                break
            case 2:              
                temp = (<Second {...this.props} />)
                break
            case 3:
                temp = (<Third {...this.props} />)
                break
            
            case 4:
                temp = (<Fourth {...this.props} />)
                break
            case 5:
                temp = (<Fifth {...this.props} />)
                break
            
            default:
                temp = <First {...this.props} />
        }
        
        return temp
    }
    componentDidUpdate(prevProps){
    
    }
    render(){
        return(
            <>
            {
                this.renderFunc(this.props.ListIndex)
            }
            </>
        )
    }
}
