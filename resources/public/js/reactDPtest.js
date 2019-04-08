class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
 
  render() {
    return (
	React.createElement(DatePicker, {selected: this.state.startDate, onChange: this.handleChange}, null)
    
    )
  }
}

dateEg = React.createElement(Example, {}, null);
ReactDOM.render(
  dateEg,
  document.getElementById('main')
);