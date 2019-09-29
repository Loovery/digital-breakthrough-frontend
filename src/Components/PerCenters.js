import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default class PerCenters extends React.Component {
  // const this.props.classes = useStyles();
  constructor(props){
    super(props);
    this.state = {
        perCentersArr: []
    }
  }
  getCentersList = () => {
    axios({
      url: 'http://localhost:3001/api/v1/dataset',
    }).then(res => {
        let perCentersArr = [];
        res.data.map(item=>{
            item.centers.map(elem => {
                perCentersArr.push({region: item.name, name: elem.name, address: elem.adress, dateOpen: elem.date_open, dateClose: elem.date_close, status: elem.isClosed})
            })
        })
        this.setState({perCentersArr: perCentersArr})
        // console.log(perCentersArr);
        
    }).catch(err => console.log(err))
  }
  componentDidMount(){
    this.getCentersList()
    
  }
  componentDidUpdate(prevProps){
      if (prevProps && prevProps.clickedPerCentersArr !== this.props.clickedPerCentersArr) {
        this.setState({clickedPerCentersArr: this.props.clickedPerCentersArr})
      }
  }
  render(){

    return (
      <React.Fragment>
        <Title>Перинатальные центры</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Регион</TableCell>
              <TableCell>Назавание</TableCell>
              <TableCell>Адрес</TableCell>
              <TableCell>Дата открытия</TableCell>
              <TableCell>Дата закрытия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
                (this.state.clickedPerCentersArr || this.state.perCentersArr).map((row, index) => (
              <TableRow key={index} style={{backgroundColor: row.status ? 'rgba(255, 5, 5, 0.25)' : 'rgba(63, 81, 181, 0.25)', border: row.name.length && row. status ? '1px solid #FF0505' : '1px solid #3f51b5',}} >
                <TableCell>{row.region || '-'}</TableCell>
                <TableCell>{row.name || '-'}</TableCell>
                <TableCell>{row.address || '-'}</TableCell>
                <TableCell>{row.dateOpen || '-'}</TableCell>
                <TableCell>{row.dateClose || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={this.props.classes.seeMore} onClick={()=>this.setState({clickedPerCentersArr: false})}>
          <Link color="primary" href="javascript:;" >
            Сбросить фильтр
          </Link>
        </div>
      </React.Fragment>
    );
  }
}