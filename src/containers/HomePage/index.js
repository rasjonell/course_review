import React, { useContext, useEffect, useState } from 'react';
import map from 'lodash/map';
import find from 'lodash/find';
import Loading from 'components/Loading';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import { AuthContext } from 'contexts/auth_context';
import FeedbackCard from 'components/Feedback/Card';
import { UserContext } from 'contexts/user_context';
import { CourseContext } from 'contexts/course_context';
import { FeedbackContext } from 'contexts/feedback_context';

import styles from './styles';

export default withStyles(styles)(({ classes }) => {
  const {
    user: { uid }
  } = useContext(AuthContext);
  const { users } = useContext(UserContext);
  const [sorted, setSorted] = useState(null);
  const { courses } = useContext(CourseContext);
  const { feedbacks } = useContext(FeedbackContext);

  useEffect(
    () => {
      const sortedFeedbacks = feedbacks && feedbacks.sort(({ rating: a }, { rating: b }) => b - a);
      setSorted(sortedFeedbacks);
    },
    [feedbacks]
  );

  if (!(feedbacks && courses && users)) return <Loading size={50} />;

  return (
    <Grid container justify="space-between">
      {map(sorted, feedback => (
        <Grid item key={feedback.key} xs={12} sm={6} className={classes.gridItem}>
          <FeedbackCard
            {...{
              uid,
              feedback,
              more: true,
              rating: feedback.rating,
              user: users[feedback.user_id],
              feedbackContent: feedback.feedback,
              course: find(courses, { id: Number(feedback.course_id) })
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
});
