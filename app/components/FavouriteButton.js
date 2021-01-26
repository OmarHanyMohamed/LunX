import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { add_to_fav } from '../actions/FavActions';
import { remove_from_fav } from '../actions/FavActions';

class FavouriteButton extends Component {

    constructor(props) {
        super(props);
        this.state = { addedToFavourites: false };
        this.addToFav = this.addToFav.bind(this);
    }

    componentDidMount() {
        this.setState({
            addedToFavourites: this.props.addedToFav
        })
    }

    addToFav() {
        this.setState({
            addedToFavourites: !this.state.addedToFavourites
        });
        if (this.state.addedToFavourites !== true) {
            this.props.add_to_fav(this.props.postData)
        }
        else {
            this.props.remove_from_fav(this.props.postData)
        }
    }

    render() {
        const { addedToFavourites } = this.state;
        return (
            <TouchableOpacity onPress={this.addToFav}>

                <AntDesign
                    name={addedToFavourites ? 'star' : 'staro'}
                    size={23}
                    color={addedToFavourites ? '#FFDF00' : '#73788B'}
                />
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = state => {
    return {
       addedToFav: state.fav.addedToFav
    }
}

export default connect(mapStateToProps, { add_to_fav, remove_from_fav })(FavouriteButton);