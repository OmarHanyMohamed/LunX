import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { like, dislike } from '../actions/LikeActions';

class HeartButton extends Component {

    constructor(props) {
        super(props);
        this.state = { likenotPressed: false, count: 0 };
        this.pressLike = this.pressLike.bind(this);
    }

    componentDidMount() {
        this.setState({
            likenotPressed: this.props.liked,
            //count: this.props.counts
        });
    }

    pressLike() {
        this.setState({
            likenotPressed: !this.state.likenotPressed,
        });
        if (this.state.likenotPressed !== true) {
            this.setState({
                count: this.state.count + 1
            })

            this.props.like(this.state.count)
        }
        else {
            if (this.state.count > 0) {
                this.props.dislike(this.state.count)
            }
        }
    }

    render() {
        const { likenotPressed } = this.state;
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.pressLike}>
                    <Icon
                        name={likenotPressed ? 'heart' : 'heart-o'}
                        size={21}
                        color={likenotPressed ? 'red' : '#73788B'}
                    />
                </TouchableOpacity>
                
            </View>
        )
    }
}

// under Touch
//<Text style={{ marginLeft: 2, color: '#73788B' }}> {this.props.counts} </Text>

const mapStateToProps = state => {
    return {
        liked: state.like.liked,
        counts: state.like.count
    }
}

export default connect(mapStateToProps, { like, dislike })(HeartButton);