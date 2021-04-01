import React, { Component } from "react";
import { FormControlLabel, Radio, TextField } from "@material-ui/core";

export default class OtherRadio extends Component {
    render() {
        return (
            <FormControlLabel
                value={this.props.value}
                onChange={this.props.onChange}
                checked={this.props.checked}
                control={<Radio color="primary" />}
                label={
                    <TextField
                        id="standard-bare"
                        placeholder={this.props.placeholder}
                        margin="normal"
                        onChange={this.props.onTextChange}
                    />
                }
            />
        );
    }
}