import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import {withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client";
import axios from 'axios';
import * as d3 from "d3";
import PropTypes from "prop-types";
// import queue from 'queue';

// var topojson = Object.assign({}, require('topojson-client'))
// var d3 = Object.assign({}, require("d3-format"), require("d3-geo"), require("d3-geo-projection"));


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
// function Map() {
//     var width = 960,
//   height = 500;

//   // Setting color domains(intervals of values) for our map

//   var color_domain = [50, 150, 350, 750, 1500]
//   var ext_color_domain = [0, 50, 150, 350, 750, 1500]
//   var legend_labels = ["< 50", "50+", "150+", "350+", "750+", "> 1500"]              
//   var color = d3.scale.threshold()
//   .domain(color_domain)
//   .range(["#adfcad", "#ffcb40", "#ffba00", "#ff7d73", "#ff4e40", "#ff1300"]);

//   var div = d3.select("body").append("div")   
//   .attr("class", "tooltip")               
//   .style("opacity", 0);

//   var svg = d3.select("body").append("svg")
//   .attr("width", width)
//   .attr("height", height)
//   .style("margin", "10px auto");

//   var projection = d3.geo.albers()
//   .rotate([-105, 0])
//   .center([-10, 65])
//   .parallels([52, 64])
//   .scale(700)
//   .translate([width / 2, height / 2]);

//   var path = d3.geo.path().projection(projection);

//   //Reading map file and data

//   queue()
//   .defer(d3.json, "/d/5685937/russia_1e-7sr.json")
//   .defer(d3.csv, "Accidents.csv")
//   .await(ready);

//   //Start of Choropleth drawing

//   function ready(error, map, data) {
//    var rateById = {};
//    var nameById = {};

//    data.forEach(function(d) {
//     rateById[d.RegionCode] = +d.Deaths;
//     nameById[d.RegionCode] = d.RegionName;
//   });

//   //Drawing Choropleth

//   svg.append("g")
//   .attr("class", "region")
//   .selectAll("path")
//   .data(topojson.object(map, map.objects.russia).geometries)
//   //.data(topojson.feature(map, map.objects.russia).features) <-- in case topojson.v1.js
//   .enter().append("path")
//   .attr("d", path)
//   .style("fill", function(d) {
//     return color(rateById[d.properties.region]); 
//   })
//   .style("opacity", 0.8)

//   //Adding mouseevents
//   .on("mouseover", function(d) {
//     d3.select(this).transition().duration(300).style("opacity", 1);
//     div.transition().duration(300)
//     .style("opacity", 1)
//     div.text(nameById[d.properties.region] + " : " + rateById[d.properties.region])
//     .style("left", (d3.event.pageX) + "px")
//     .style("top", (d3.event.pageY -30) + "px");
//   })
//   .on("mouseout", function() {
//     d3.select(this)
//     .transition().duration(300)
//     .style("opacity", 0.8);
//     div.transition().duration(300)
//     .style("opacity", 0);
//   })
  
//    // Adding cities on the map

//   d3.tsv("cities.tsv", function(error, data) {
//     var city = svg.selectAll("g.city")
//     .data(data)
//     .enter()
//     .append("g")
//     .attr("class", "city")
//     .attr("transform", function(d) { return "translate(" + projection([d.lon, d.lat]) + ")"; });

//     city.append("circle")
//     .attr("r", 3)
//     .style("fill", "lime")
//     .style("opacity", 0.75);

//     city.append("text")
//     .attr("x", 5)
//     .text(function(d) { return d.City; });
//   });
  
//   }; // <-- End of Choropleth drawing
 
//   //Adding legend for our Choropleth

//   var legend = svg.selectAll("g.legend")
//   .data(ext_color_domain)
//   .enter().append("g")
//   .attr("class", "legend");

//   var ls_w = 20, ls_h = 20;

//   legend.append("rect")
//   .attr("x", 20)
//   .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
//   .attr("width", ls_w)
//   .attr("height", ls_h)
//   .style("fill", function(d, i) { return color(d); })
//   .style("opacity", 0.8);

//   legend.append("text")
//   .attr("x", 50)
//   .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
//   .text(function(d, i){ return legend_labels[i]; });

// }
// class Map extends React.Component {

//     scaleColor = d3.scaleSequential(d3.interpolateViridis);
//     scaleHeight = d3.scaleLinear();
//     scaleWidth = d3.scaleBand().padding(0.1);

//     componentDidMount() {
//         this.updateChart();
//     }

//     componentDidUpdate() {
//         this.updateChart();
//     }

//     updateChart() {
//         this.updateScales();      
//         const { data, height, animDuration } = this.props;
//         const bars = d3.select(this.viz)
//                             .selectAll(".bar")
//                             .data(data, function(d) { return d ? d.item : d3.select(this).attr("item"); });
//         bars
//             .transition().duration(animDuration)
//                 .attr("y", (d) => ( this.scaleHeight(d.count) ))
//                 .attr("height", (d) => (height - this.scaleHeight(d.count)) )
//                 .attr("x", (d) => ( this.scaleWidth(d.item) ) )
//                 .attr("width", this.scaleWidth.bandwidth() )
//                 .style("fill",  (d) => ( this.scaleColor(d.item) ));
//     }

//     updateScales() {
//         const { data, width, height } = this.props;
//         this.scaleColor.domain([0, data.length]);
//         this.scaleWidth
//                  .domain(data.map((d) => (d.item)))
//                  .range([0, width]);
//         this.scaleHeight
//                   .domain(d3.extent(data, (d) => (d.count)))
//                   .range([height - 20, 0]);
//     }

//     render() {
//         const { width, height, data } = this.props;
//         const bars = data.map((d) => (
//                         <rect key={d.item}
//                             item={d.item}
//                             className="bar"
//                             y={height} rx="5" ry="5"
//                         />));
//         return (
//             <svg ref={ viz => (this.viz = viz) }
//                         width={width} height={height} >
//                 { bars }
//             </svg>
//         );        
//     }
// }

// Map.defaultProps = {
//     animDuration: 600
// };

// Map.propTypes = {
//      data: PropTypes.array.isRequired,
//       width: PropTypes.number.isRequired,
//      height: PropTypes.number.isRequired,
//      animDuration: PropTypes.number
// };
class Map extends Component {
    constructor() {
      super()
      this.state = {
        russia: [],
      }
    }
    projection() {
      return geoMercator()
        .scale(100)
        .translate([ 800 / 2, 450 / 2 ])
    }
    componentDidMount() {
        axios({
            url: './russia.json',

        }).then((jsonMap) => {
            console.log(jsonMap)
            const map = jsonMap.data;
            
            this.setState({
                map: feature(map, map.objects.russia).features,
            })
        })
    }
    render() {
      return (
        <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
          <g className="countries">
            {
              this.state.map.map((d,i) => (
                <path
                  key={ `path-${ i }` }
                  d={ geoPath().projection(this.projection())(d) }
                  className="country"
                  fill={ `rgba(38,50,56,${1 / this.state.map.length * i})` }
                  stroke="#FFFFFF"
                  strokeWidth={ 0.5 }
                />
              ))
            }
          </g>
          <g className="markers">
            <circle
              cx={ this.projection()([8,48])[0] }
              cy={ this.projection()([8,48])[1] }
              r={ 10 }
              fill="#E91E63"
              className="marker"
            />
          </g>
        </svg>
      )
    }
  }

class Second extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
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
                <Paper style={{width:'100%', height: '100%'}}>
                    {/* <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` , width:`100%`}} />}
                    containerElement={<div style={{ height: `400px` , width: `100%`}} />}
                    mapElement={<div style={{ height: `100%` , width:`100%`}} />}
                    /> */}
                    {
                        <Map data = {this.state.data} width = {100} height={100} />
                    }
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
