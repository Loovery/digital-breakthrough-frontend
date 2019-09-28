import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Generate Sales Data
function createData(month, born, death) {
  return { month, born, death };
}

const data = {
    2016: [
        createData('Январь', 1000, 120),
        createData('Февраль', 800, 30),
        createData('Март', 900, 40),
        createData('Апрель', 600, 24),
        createData('Май', 400, 53),
        createData('Июнь', 1000, 64),
        createData('Июль', 1400, 45),
        createData('Август', 1400, 75),
        createData('Сентябрь', 1200, 33),
        createData('Октябрь', 1200, 34),
        createData('Ноябрь', 1200, 64),
        createData('Декабрь', 1200, 46),
    ],
    2017: [
        createData('Январь', 1000, 34),
        createData('Февраль', 1300, 55),
        createData('Март', 1600, 34),
        createData('Апрель', 1800, 23),
        createData('Май', 1500, 22),
        createData('Июнь', 1000, 77),
        createData('Июль', 1400, 11),
        createData('Август', 1400, 23),
        createData('Сентябрь', 1200, 42),
        createData('Октябрь', 1200, 24),
        createData('Ноябрь', 1200, 64),
        createData('Декабрь', 1200, 34),
    ],
    2018: [
        createData('Январь', 1000,  34),
        createData('Февраль', 1300,  64),
        createData('Март', 1600,  66),
        createData('Апрель', 1800,  75),
        createData('Май', 1500,  45),
        createData('Июнь', 1000,  43),
        createData('Июль', 1400,  33),
        createData('Август', 1400,  23),
        createData('Сентябрь', 1200,  25),
        createData('Октябрь', 1200,  43),
        createData('Ноябрь', 1200,  23),
        createData('Декабрь', 1200,  11),
    ],
    2019: [
        createData('Январь', 1000, 55),
        createData('Февраль', 1300, 32),
        createData('Март', 1600, 23),
        createData('Апрель', 1800, 12),
        createData('Май', 1500, 42),
        createData('Июнь', 1000, 32),
        createData('Июль', 1400, 53),
        createData('Август', 1400, 57),
        createData('Сентябрь', 1200, 76),
        createData('Октябрь', 1200, 44),
        createData('Ноябрь', 1200, 75),
        createData('Декабрь', 1200, 86),
    ],
};


export default class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectVal: 2016,
        }
    }
    handleChange = e => {
        this.setState({selectVal: e.target.value})
    }
    render(){
        return (
          <React.Fragment>
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
                <MenuItem value={2016}>2016</MenuItem>
                <MenuItem value={2017}>2017</MenuItem>
                <MenuItem value={2018}>2018</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
                </Select>
            </FormControl>
            </Title>
            <ResponsiveContainer>
              <LineChart
                data={data[this.state.selectVal]}
                margin={{
                  top: 16,
                  right: 20,
                  bottom: 40,
                  left: 24,
                }}
      
              >
                <XAxis dataKey="month" interval={0} angle={30} dx={0} dy={20}>
                </XAxis>
                <YAxis>
                  <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
                    Рождаемость
                  </Label>
                </YAxis>
                <Tooltip />
                <Line type="monotone" dataKey="born" stroke="#556CD6" dot={true} />
                <Line type="monotone" dataKey="death" stroke="#f50057" dot={true} />
              </LineChart>
            </ResponsiveContainer>
          </React.Fragment>
        );
    }
}