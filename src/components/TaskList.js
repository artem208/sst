import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTasks, changeTasksDisplayMode, changeTasksSorting, setFilterText } from '../actions/index';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const fields = {

    'short': [
        {name: 'date', sortProp: 'date', title: 'Date', presentation: value => value.toLocaleDateString()}, 
        {name: 'title', sortProp:'title', title: 'Title'}, 
        {name: 'status', sortProp: 'status.name', title: 'Status', presentation: value =>  value.name}
    ],
    'extended': [
        { name: 'date', sortProp: 'date', title: 'Date', presentation: value => value.toLocaleDateString()},
        { name: 'title', sortProp: 'title', title: 'Title'},
        { name: 'status', sortProp: 'status.name', title: 'Status', presentation: value => value.name},
        { name: 'desc', sortProp: 'desc', title: 'Description'},
        { name: 'priority', sortProp: 'priority', title: 'Priority'}, 
        { name: 'planTime', sortProp: 'planTime', title: 'Planned time'},
        { name: 'factTime', sortProp: 'factTime', title: 'Fact time'}
    ]
};

class TaskList extends Component {

    constructor(props) {
        super(props);

        this.onDisplayModeChange = this.onDisplayModeChange.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.onSortHandler = this.onSortHandler.bind(this);
        this.onChangeFilterText = this.onChangeFilterText.bind(this);
        this.onRowClick = this.onRowClick.bind(this);

    }

    componentWillMount() {

        this.props.fetchTasks(this.props.authToken);

        this.timerId = setInterval(this.refreshData, 50000);

    }

    componentWillUnmount() {
        if (this.timerId)
            clearInterval(this.timerId);
    }

    refreshData() {

        this.props.fetchTasks(this.props.authToken);

    }

    onDisplayModeChange(e) {

        this.props.changeTasksDisplayMode(e.target.value);

    }

    renderModeSelect() {
        return (
            <Select
                value={this.props.displayMode}
                onChange={this.onDisplayModeChange}
            >
                <MenuItem value={1}>Short table</MenuItem>
                <MenuItem value={2}>Extended table</MenuItem>
                <MenuItem value={3}>Board</MenuItem>
            </Select>
        );
    }

    onSortHandler({name, sortProp}) {
        const { sorting, changeTasksSorting } = this.props;

        return function() {
            if (sorting) {
                if (sorting.name == name) {
                    changeTasksSorting({ name, sortProp, asc: !sorting.asc });
                } else {
                    changeTasksSorting({ name, sortProp, asc: true});
                }
            } else {
                changeTasksSorting({ name, sortProp, asc: true})
            }
        }
    }

    renderHeaderCells() {

        const { sorting, displayMode } = this.props;

        return fields[ displayMode == 1 ? 'short' : 'extended' ].map(field => 
            <TableCell key={field.name} sortDirection={sorting && field.name == sorting.name ? sorting.asc ? 'asc' : 'desc' : false}>
                <TableSortLabel
                    active={sorting && sorting.name == field.name}
                    direction={sorting && sorting.asc ? 'asc' : 'desc'}
                    onClick={this.onSortHandler(field)}
                >
                    {field.title}
                </TableSortLabel>
            </TableCell>
            );
    }

    onChangeFilterText(ev, fieldName) {
        this.props.setFilterText(fieldName,ev.target.value);
    }

    renderFilterCells() {
        
        const { displayMode, filters } = this.props;

        return fields[ displayMode == 1 ? 'short' : 'extended' ].map(field => 
            <TableCell key={field.name}>
                <TextField
                    margin='normal' variant='outlined' fullWidth
                    onChange = {(ev) => this.onChangeFilterText(ev, field.name)}
                    value = {filters[field.name] ? filters[field.name] : ''}
                ></TextField>
            </TableCell>
        );

    }

    renderRowCells(task) {

        const { displayMode } = this.props;

        return fields[ displayMode == 1 ? 'short' : 'extended' ].map(field => 
            <TableCell key={field.name}>
                   { field.presentation ? field.presentation(task[field.name]) : task[field.name] }
            </TableCell>
        );

    }

    render() {

        const { tasks } = this.props;
        return (
            <Fragment>
                {this.renderModeSelect()}
                <Table >
                    <TableHead>
                        <TableRow>
                            {this.renderHeaderCells()}
                        </TableRow>
                        <TableRow>
                            {this.renderFilterCells()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map(task => {
                            return (
                                <TableRow 
                                    key={task._id} 
                                    hover
                                    onClick={(ev) => this.onRowClick(task._id,ev)}
                                    >
                                    {this.renderRowCells(task)}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Fragment>
        );
    }

    onRowClick(taskId,event) {

        this.props.history.push(`/tasks/${taskId}`);

    }
    
}



const mapStateToProps = (state) => {

    const { tasks, auth } = state;

    return {
        tasks: tasks.processedTasks,
        displayMode: tasks.displayMode,
        authToken: auth.user.authToken,
        sorting: tasks.sorting,
        filters: tasks.filters
    };
}

export default withRouter(connect(mapStateToProps, { fetchTasks, changeTasksDisplayMode, changeTasksSorting, setFilterText })(TaskList));