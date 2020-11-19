
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

    handleChange = (event, val) => {
        this.setState({ input: val }, () => {
            if (this.state.input === '') return
            this.props.loadSuggestedLocations(this.state.input)
        })
    }

    handleSelect = (event, val) => {
        console.log(this.props);
        if (!val) return
        const locationInfo={
           locationKey :val.key,
           locationName:val.localizedName
        }  
        this.props.loadLocation(locationInfo)
        this.props.history.push(`/`)
    }

    render() {
        const { suggestedLocs } = this.props;
        return (
            <div className="search-box">
                <Autocomplete
                    fullWidth
                    freeSolo
                    options={suggestedLocs}
                    getOptionLabel={option => option.fullDisplayName}
                    renderOption={option => (
                        <div>
                            <div className="bold">{option.localizedName}</div>
                            <div>{`${option.administrativeArea}, ${option.country}`}</div>
                        </div>
                    )}
                    onInputChange={this.handleChange}
                    onChange={this.handleSelect}
                    renderInput={(params) => (
                        <TextField {...params} label="enter location" margin="normal" variant="outlined" />
                        // <MyTextField params={params} />
                    )}
                />
            </div>


            // <div className="search-box">
            //     <input
            //         className="search-input"
            //         autoComplete="off"
            //         name="location"
            //         type="text"
            //         value={this.state.location}
            //         onChange={this.handleChange}
            //         placeholder={`enter location`}
            //         onKeyDown={e => (e.key === 'Enter') && this.onClickSearchButton()}
            //     />
            //     <div className="search-btn" onClick={this.onClickSearchButton}>
            //         {/* <i className="fas fa-search"></i> */}
            //         <SearchIcon />
            //     </div>
            // </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        suggestedLocs: state.locationReducer.suggestedLocs
    }
}

const mapDispatchToProps = {
    loadSuggestedLocations,
    loadLocation
}

export const SearchBox = connect(mapStateToProps, mapDispatchToProps)(withRouter(_SearchBox))