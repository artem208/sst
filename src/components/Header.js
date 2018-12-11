import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
    grow: {
        flexGrow: 1
    }
};

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuAnchor: null
        };

        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleMenu(event) {
        this.setState({ menuAnchor: event.currentTarget });
    }

    handleClose() {
        this.setState({ menuAnchor: null });
    }

    render() {

        const { classes } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Task tracker
                    </Typography>
                    {!!this.props.user && (
                        <div>
                            <IconButton
                                aria-owns={!!this.state.menuAnchor ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                color="inherit"
                                onClick={this.handleMenu}
                                className = {classes.menuButton}
                            >
                                <AccountCircle />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.menuAnchor}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={!!this.state.menuAnchor}
                                onClose={this.handleClose}

                            >
                                <MenuItem >{this.props.user.userName}</MenuItem>
                                <MenuItem onClick={this.props.logOut}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        );

    }
}


const mapStateToProps = (state) => {
    return (
        {
            user: state.auth.user
        }
    )
}

export default withStyles(styles)(connect(mapStateToProps, { logOut })(Header));