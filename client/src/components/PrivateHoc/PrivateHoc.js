import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUser } from './../../app/slices/userSlice';
import Spinner from '../Spinner/Spinner';
import CONSTANTS from '../../constants';

const { SUBSCRIBE_CHAT } = CONSTANTS.GET_USER_MODE;

const PrivateHoc = (Component, props) => {
  class Hoc extends React.Component {
    componentDidMount () {
      if (!this.props.data) {
        this.props.getUser();
      }
    }

    render () {
      return (
        <>
          {this.props.isFetching ? (
            <Spinner />
          ) : (
            <Component
              history={this.props.history}
              match={this.props.match}
              {...props}
            />
          )}
        </>
      );
    }
  }

  const mapStateToProps = state => state.userStore;

  const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(getUser({ getUserMode: SUBSCRIBE_CHAT })),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default PrivateHoc;
