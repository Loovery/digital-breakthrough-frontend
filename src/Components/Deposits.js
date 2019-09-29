import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default class Deposits extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectVal: '',

        }
    }
//   const classes = useStyles();
getData = () => {
    Axios({
        url: 'http://localhost:3001/api/v1/dataset/born_and_dead'
    }).then(res => {
        console.log(res);
        let stat = res.data.map(item => {
            return {year: item.year, 'Родилось': item.city_and_valley.all.born, 'Умерло': item.city_and_valley.all.dead}
        })
        this.setState({stat: stat, allStat: res.data})
        // let stat = {res.}
    })
}
handleChange = (e) => {
    let selectedYear = this.state.allStat.filter(item => {
        return item.year == e.target.value
    })
    console.log('select', selectedYear[0].city.all.dead);
    
    this.setState({selectVal: e.target.value, selectedYear: selectedYear[0]})
}
componentDidMount(){
    this.getData()
}
  render(){

      return (
        <React.Fragment>
          <Title>Статистика</Title>
          <Title>
                <FormControl className={this.props.classes.formControl}>
                    <InputLabel htmlFor="age-simple">Год</InputLabel>
                    <Select
                    value={this.state.selectVal}
                    onChange={(e)=>this.handleChange(e)}
                    inputProps={{
                        name: 'Год',
                        id: 'age-simple',
                    }}
                    style={{paddingLeft: 10, color: '#5f5f5f'}}
                    >
                        {
                            this.state.stat && this.state.stat.map((item, index) => {
                                console.log(item)
                                return <MenuItem  key={index} value={item.year}>{item.year}</MenuItem>
                            }
                            )
                        }
                    {/* <MenuItem value={2017}>2017</MenuItem>
                    <MenuItem value={2018}>2018</MenuItem>
                    <MenuItem value={2019}>2019</MenuItem> */}
                    </Select>
                </FormControl>
            </Title>
          <div>
            <div style={{width: '100%'}}>Родилось в городах: {this.state.selectedYear && this.state.selectedYear.city.all.born}</div>
            <div style={{width: '100%'}}>Родилось в деревнях: {this.state.selectedYear && this.state.selectedYear.valley.all.born}</div>
            <div style={{width: '100%'}}>Итог: {this.state.selectedYear && this.state.selectedYear.city_and_valley.all.born}</div>
            <div style={{width: '100%'}}>Умерло в городах: {this.state.selectedYear && this.state.selectedYear.city.all.dead}</div>
            <div style={{width: '100%'}}>Умерло в деревнях: {this.state.selectedYear && this.state.selectedYear.valley.all.dead}</div>
            <div style={{width: '100%'}}>Итог: {this.state.selectedYear && this.state.selectedYear.city_and_valley.all.dead}</div>
            {/* <Link color="primary" href="javascript:;">
              View balance
            </Link> */}
          </div>
        </React.Fragment>
      );
  }
}