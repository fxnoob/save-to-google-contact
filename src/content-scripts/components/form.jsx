import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">
            First Name
          </InputLabel>
          <Input
            onChange={this.props.onChange("firstName")}
            value={this.props.firstName}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        <TextField
          onChange={this.props.onChange("lastName")}
          className={classes.margin}
          id="input-with-icon-textfield"
          value={this.props.lastName}
          label="Last Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
        />
        <div className="">
          <Grid container spacing={12} alignItems="flex-end">
            <Grid item>
              <TextField
                onChange={this.props.onChange("phone")}
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Phone"
                value={this.props.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={12} alignItems="flex-end">
            <Grid item>
              <TextField
                onChange={this.props.onChange("email")}
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Email"
                value={this.props.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={12} alignItems="flex-end">
            <Grid item>
              <TextField
                onChange={this.props.onChange("desc")}
                className={classes.margin}
                id="input-with-icon-textfield"
                value={this.props.desc}
                label="Description"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Form);
