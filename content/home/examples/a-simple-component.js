class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hallo {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('hello-example')
);