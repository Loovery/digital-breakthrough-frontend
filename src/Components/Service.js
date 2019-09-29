import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DvrIcon from '@material-ui/icons/Dvr';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MainContentService from './MainContentService';

let indexs;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    flexWrap:'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    flexBasis: '100%',
    flexWrap: 'wrap'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 300,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Menu classes={classes} fixedHeightPaper={fixedHeightPaper}/>
    </div>
  );
}
class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        listItemFirst: [
            {name: 'Статистика', icon: <EqualizerIcon/>}, 
            {name: 'Центры', icon: <AccountBalanceIcon/>}, 
            {name: 'Новости', icon: <DvrIcon/>}, 
            {name: 'События', icon: <InsertInvitationIcon/>}, 
            {name: 'Рекомендации', icon: <LocalHospitalIcon/>}  ],
        open:  true,
        }
    }
    indexChange = index => {
        this.setState({index})
    }
    handleDrawerClick = () => {
        // const [setOpen] = React.useState(true);
        this.setState({open: !this.state.open})
        // setOpen(false);
    };
    render(){
        return(
            <>
            <AppBar position="absolute" className={clsx(this.props.classes.appBar, this.state.open && this.props.classes.appBarShift)}>
                <Toolbar className={this.props.classes.toolbar}>
                <Typography component="h1" variant="h6" color="inherit"  className={this.props.classes.title} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    Счетная палата РФ
                    <Typography  variant="overline" display="inline" color="inherit"  className={this.props.classes.subTitle} style={{display: 'flex', flexBasis:'100%', justifyContent: 'center'}}>
                        Перинатальные центры
                    </Typography>
                </Typography>
                
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                    </Badge>
                </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                paper: clsx(this.props.classes.drawerPaper, !this.state.open && this.props.classes.drawerPaperClose),
                }}
                open={this.state.open}
            >
                <div className={this.props.classes.toolbarIcon}>
                <IconButton onClick={this.handleDrawerClick}>
                    {this.state.open ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
                </div>
                <Divider />
                <List>
                    <div>
                        {
                            this.state.listItemFirst.map((item, index) => (
                            <ListItem button onClick={()=>{this.indexChange(index)}}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                            </ListItem>
                        ))
                        }
                    </div>
                </List>
                <Divider />
            </Drawer>
            <main className={this.props.classes.content}>
                <div className={this.props.classes.appBarSpacer} />
                    <MainContentService  classes={this.props.classes} fixedHeightPaper={this.props.fixedHeightPaper} ListIndex={this.state.index}/>
                <Copyright />
            </main>
        </>
        )
    }
}