import React from "react";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

export function MyTextField(params) {
    // const classes = useStyles();
    const CssTextField = withStyles({
        root: {
          '& label.Mui-focused': {
            color: 'green',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'green',
            },
          },
        },
      })(TextField);
    return (
        <CssTextField
        {...params}
            label="enter location"
            margin="normal"
            variant="outlined"
            // InputProps={{
            //     classes: {
            //         root: classes.root,
            //         focused: classes.cssFocused,
            //         notchedOutline: classes.notchedOutline
            //     }
            // }}

        />
    )

}