import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import { api_base } from "../config";
import axios from "axios";
import TableDataGrid from './table-datagrid'
import moment from 'moment-timezone'
import MomentUtils from '@date-io/moment'

moment.tz.setDefault('Europe/London')

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "500px", margin: "50px auto", textAlign: 'left'
    },
    datePicker: {
        minWidth: "290px"
    }
}))

const AdminPanel = ({ snapshotSettings, pointSystem, isAdmin }) => {
    const classes = useStyles();
    const [snapshotDate, updateSnapshotDate] = useState(null);

    const handleDateChange = (dateChange) => {
        axios.post(api_base + "/api/updateSnapshotDate", {
            newDate: dateChange.toJSON()
        }).then(() => {
            console.log(
                `Snapshot date updated to ${dateChange.toJSON()}! Reload to confirm.`
            );
        });
        updateSnapshotDate(dateChange)
    }

    if (!snapshotDate && !!snapshotSettings[0]) {
        updateSnapshotDate(snapshotSettings[0]['snapshot_date'])
    }

    return isAdmin ? <div className={classes.root}>
        <h1>Admin Panel</h1>
        {snapshotDate ? <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDateTimePicker
                format="LLL"
                margin="normal"
                id="set-snapshot-date"
                label="Set snapshot date (London)" // This is timezone adjusted...
                value={snapshotDate}
                onChange={handleDateChange}
                className={classes.datePicker}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider> : null}
        <br></br><br></br>
        <TableDataGrid
            tableData={pointSystem}
            tableTitle="Point System"
            isAdmin={isAdmin}
        />
    </div> : null
}

export default AdminPanel