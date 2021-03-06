export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: '25vh'
  },
  mailIcon: {
    fontSize: 100,
    margin: theme.spacing.unit
  },
  field: {
    marginTop: theme.spacing.unit * 2
  }
});
