import React, { Component } from 'react';
import { authenticateUser } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class AuthForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: ''
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    renderError() {

        return (this.props.authError ?
            <p style={ {color: 'red', textAlign: 'center'} }>{this.props.authError}</p> :
            null);
    }

    render() {
        const { userName, password } = this.state;

        return (
            <Paper>
                <form>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="user">Username</InputLabel>
                        <Input id="user" name="user" autoComplete="user" autoFocus value={userName} onChange={e => this.handleFieldChange('userName', e)} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="current-password" value={password} onChange={e => this.handleFieldChange('password', e)} />
                    </FormControl>
                    
                    {this.renderError()}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                    >
                        Sign in
                </Button>
                </form>
            </Paper>
        );

    }

    handleSubmit(e) {
        const { userName, password } = this.state;
        e.preventDefault();
        this.props.authenticateUser(userName, password);
    }

    handleFieldChange(field, event) {
        this.setState({ ...this.state, [field]: event.target.value });
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        authError: state.auth.authError
    }
};

export default withRouter(connect(mapStateToProps, { authenticateUser })(AuthForm));