import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchTask } from '../actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Task extends PureComponent {

    constructor(props) {
        super(props);

        this.state = { mode: 'view' };
    }

    componentDidMount() {
        this.props.fetchTask(this.props.authToken, this.props.match.params['id']);
    }

    componentWillUnmount() {
        //здесь надо зачистить task в store
    }

    render() {
        const { task } = this.props;
        if (!task) {
            return null
        } else {

            return (
                <Fragment>
                    <form noValidate autoComplete="off">
                        <TextField
                            label="Title"
                            value={task.title}
                            //onChange={this.handleChange('name')}
                            fullWidth
                            margin="normal"
                            variant="filled"

                        />
                        <TextField
                            label="Date"
                            type="date"
                            value={task.date}
                            //onChange={this.handleChange('name')}
                            margin="normal"
                            variant="filled"

                        />
                        <TextField
                            label="Status"
                            value={task.status.name}
                            //onChange={this.handleChange('name')}
                            margin="normal"
                            variant="filled"

                        />
                        <TextField
                            label="Priority"
                            value={task.priority}
                            //onChange={this.handleChange('name')}
                            margin="normal"
                            variant="filled"
                        />
                        <TextField
                            label="Description"
                            multiline
                            rows="4"
                            value={task.desc}
                            fullWidth
                            margin="normal"
                            variant="filled"
                        />
                        <TextField
                            label="Plan time"
                            value={task.planTime}
                            //onChange={this.handleChange('name')}
                            margin="normal"
                            variant="filled"
                        />
                        <TextField
                            label="Fact time"
                            value={task.factTime}
                            //onChange={this.handleChange('name')}
                            margin="normal"
                            variant="filled"
                        />

                    </form>

                    <Button variant="contained" onClick={() => {this.props.history.goBack()}}>
                        CLOSE
                    </Button>

                </Fragment>
            )
        }
    }

}

const mapStateToProps = (state) => {

    const { auth, task } = state;

    return {
        authToken: auth.user.authToken,
        task
    };
}

export default connect(mapStateToProps, { fetchTask })(Task);