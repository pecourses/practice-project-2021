import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../app/slices/userSlice';
import CONSTANTS from '../../constants';
import Spinner from '../Spinner/Spinner';

const { REDIRECT_TO_HOME } = CONSTANTS.GET_USER_MODE;

const OnlyNotAuthorizedUserHoc = Component => {
  class HocForLoginSignUp extends React.Component {
    componentDidMount () {
      this.props.checkAuth(this.props.history.replace);
    }

    render () {
      if (this.props.isFetching) {
        return <Spinner />;
      }
      if (!this.props.data) {
        return <Component history={this.props.history} />;
      }
      return null;
    }
  }

  const mapStateToProps = state => state.userStore;

  const mapDispatchToProps = dispatch => ({
    checkAuth: replace =>
      dispatch(getUser({ getUserMode: REDIRECT_TO_HOME, replace })),
  });

  return connect(mapStateToProps, mapDispatchToProps)(HocForLoginSignUp);
};

export default OnlyNotAuthorizedUserHoc;
