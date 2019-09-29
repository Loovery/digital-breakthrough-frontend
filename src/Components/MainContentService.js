import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import PerCenters from './PerCenters';
import {withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client";
import axios from 'axios';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import * as d3 from "d3";
import PropTypes from "prop-types";

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
                        <Deposits {...this.props}/>
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper className={this.props.classes.paper}>
                        <Orders {...this.props}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
class Map extends Component {
    constructor() {
      super()
      this.state = {
        russia: [],
        title: 'Выберите область'
      }
    }
    projection() {
      return geoMercator()
        .scale(this.state.scale || this.props.scale)
        .translate([ 0, 650  ])
    }
    mouseUp = (e,d) => {
        // console.log(d)
        let PerCentersInSelectedRegion = this.props.perCentersArr.filter(item=>{
            return item.iso === d.properties.ISO_2
        })
        // console.log('asdasd',PerCentersInSelectedRegion);
        
        this.setState({
            title: d.properties.NAME_1,
            perCentersCount: PerCentersInSelectedRegion.length,
            perCentersNames: PerCentersInSelectedRegion.map(item=>item.name),
            perCentersOpen: PerCentersInSelectedRegion.filter(item=>!item.status),
            perCentersClose: PerCentersInSelectedRegion.filter(item=>item.status)
        }) 
    }
    
    onHover(e) {
        e.currentTarget.style.fillOpacity = '0.7';
    }

    offHover(e) {
        e.currentTarget.style.fillOpacity = '0.5'
    }
    componentDidMount() {
        axios({
            url: 'http://0.0.0.0:3001/api/v1/map',

        }).then((jsonMap) => {
            // console.log(jsonMap)
            const map = jsonMap.data;
            
            this.setState({
                map: feature(map, map.objects.russia).features,
            })
        })
        
    }
    componentDidUpdate(prevProps){
        if (prevProps&&prevProps.scale !== this.props.scale) {
            this.setState({scale: this.props.scale})
        }
    }
    render() {
      return (
        <div style={{position: 'relative'}}> 
        <Paper className={this.props.classes.paper} style={{display: 'flex', justifyContent: 'center', alignItems: 'center',position:'absolute', minWidth: '150px'}}>
            <div>{this.state.title}</div>
            <div>
                {
                    this.state.perCentersCount && 
                    <div>Количество центров: {this.state.perCentersCount}</div>
                }
                {
                    this.state.perCentersOpen &&
                    <>
                    <div>Открытых: {this.state.perCentersOpen && this.state.perCentersOpen.length}</div>
                    <div>
                        {   this.state.perCentersOpen &&
                            this.state.perCentersOpen.map((item, index)=>(
                                <div style={{backgroundColor: '#3f51b580',  width: '100%', height: '100%', border: item.name.length ? '1px solid #3f51b5' : 0, borderRadius: '4px', margin: '2px'}}>
                                {item.name}
                                </div>
                            ))
                        } 
                    </div>
                    </>
                }
                {
                    this.state.perCentersClose  && 
                    <>
                    <div>Закрытых: {this.state.perCentersClose && this.state.perCentersClose.length}</div>
                    <div>
                        {   this.state.perCentersClose &&
                            this.state.perCentersClose.map((item, index)=>(
                                <div style={{backgroundColor: '#FF050580',  width: '100%', height: '100%', border: item.name.length ? '1px solid #FF0505' : 0, borderRadius: '4px', margin: '2px'}}>                            
                                {item.name}
                                </div>
                            ))
                        } 
                    </div>
                    </>
                }
            </div>
        </Paper>
        <svg width={ '100%' } height={ '100%' } viewBox="0 0 800 450">
          <g className="countries" >
            {
                this.state.map && this.state.map.map((d,i) => (
                    <path
                      key={ `path-${ i }` }
                      d={ geoPath().projection(this.projection(this.state.scale))(d) }
                      className="country"
                      fill={ '#0dafcd' }
                      fillOpacity={ 0.5 }
                      stroke="#FFFFFF"
                      strokeWidth={ 0.5 }
                      onMouseEnter={(e)=>this.mouseUp(e,d)}
                      onMouseOver = { this.onHover }
                      onMouseOut = { this.offHover }
                      onClick={()=>this.props.handleMapClick(d)}
                      name={d.properties.NAME_1}
                      ref = {ref => this.ref = ref}
                    />
                  ))
            }
          </g>
        </svg>
        </div>
      )
    }
  }

class Second extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            scale: 250,
        }
    }
    getCentersList = () => {
        axios({
          url: 'http://localhost:3001/api/v1/dataset',
        }).then(res => {
            let perCentersArr = [];
            console.log(res)
            res.data.map(item=>{
                item.centers.map(elem => {
                    perCentersArr.push({region: item.name, name: elem.name, address: elem.adress, dateOpen: elem.date_open, dateClose: elem.date_close, status: elem.isClosed, iso: item.iso})
                })
            })
            this.setState({perCentersArr: perCentersArr})
            // console.log(perCentersArr);
            
        }).catch(err => console.log(err))
      }
      handleMapClick = (d) => {
          let clickedPerCentersArr = this.state.perCentersArr.filter(item=>{
              return item.iso == d.properties.ISO_2
          })
          this.setState({clickedPerCentersArr: clickedPerCentersArr})
          
      }
      componentDidMount(){
          this.getCentersList()
      }
    render(){
        return(
            <Container maxWidth="lg" className={this.props.classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper style={{width:'100%', height: '100%', position: 'relative'}}>
                            {
                                <Map data = {this.state.data} width = {100} height={100} scale={this.state.scale} perCentersArr={this.state.perCentersArr} {...this.props} handleMapClick={this.handleMapClick}/>
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>                
                        <Paper className={this.props.classes.paper}>
                            <PerCenters {...this.props} clickedPerCentersArr={this.state.clickedPerCentersArr} />
                        </Paper>
                    </Grid>
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
