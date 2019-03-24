import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from 'components/NavBar';
import Courses from 'containers/Courses';
import CoursePage from 'containers/Course';
import ProfilePage from 'containers/Profile';
import NotFoundPage from 'containers/NotFound';
import FirstSignIn from 'containers/FirstSignIn';
import { AuthContext } from 'contexts/auth_context';
import LeaveFeedback from 'containers/LeaveFeedback';

import { isValid } from 'helpers/user_helper';

export default props => {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <NavBar {...props} />
      {!isValid(user) ? (
        <FirstSignIn />
      ) : (
        <>
          <Switch>
            <Redirect exact from="/" to="/profile" />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/courses/:id" component={CoursePage} />
            <Route exact path="/review" component={LeaveFeedback} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </>
      )}
    </div>
  );
};
