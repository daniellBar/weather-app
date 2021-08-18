import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadLocation, loadSuggestedLocations } from '../store/actions/locationAction.js'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

class _SearchBox extends Component {
    state = {
        input: ''
    }
  
    handleChange = (ev, val) => {
        this.setState({ input: val }, () => {
            if (this.state.input === '') return
            this.props.loadSuggestedLocations(this.state.input)
        })
    }

    handleSelect = (ev, val) => {
        if (!val) return
        const locationInfo = {
            locationKey: val.key,
            locationName: val.localizedName
        }
        this.props.loadLocation(locationInfo)
        this.props.history.push(`/`)
    }

    render() {
        const { isHomepage, suggestedLocations} = this.props;
        if (!isHomepage) return <div></div>
        return (
            <div className="search-box">
                <Autocomplete
                    fullWidth
                    freeSolo
                    options={suggestedLocations}
                    getOptionLabel={option => option.fullDisplayName}
                    renderOption={option => (
                        <div>
                            <div className="suggested-title bold">{option.localizedName}</div>
                            <div className="suggested-title">{`${option.administrativeArea}, ${option.country}`}</div>
                        </div>
                    )}
                    onInputChange={this.handleChange}
                    onChange={this.handleSelect}
                    renderInput={(params) => (
                        <TextField {...params} margin="normal" variant="outlined" placeholder="enter location" />
                    )}
                />
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        suggestedLocations: state.suggestedLocations
    }
}

const mapDispatchToProps = {
    loadSuggestedLocations,
    loadLocation
}

export const SearchBox = connect(mapStateToProps, mapDispatchToProps)(withRouter(_SearchBox))