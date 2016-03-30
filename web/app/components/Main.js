var React    = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('react-bootstrap/lib/Navbar.js');

var Main = React.createClass({
  render: function(){
    return (
      <div className="MainApp">
        <div class="container">
          <MainTable url="http://localhost:8081/getLatestVerifs" pollInterval={2000} />
        </div>
      </div>
    )
  }
});

var MainTable = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: {objects: []}};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    console.log("MainTable component Did Mount");
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="maintable">
        <table class="table">
          <PendingVerificationDocuments data={this.state.data.objects} />
        </table>
      </div>
    );
  }
});

var PendingVerificationDocuments = React.createClass({
  render: function() {
    console.log("Data: " + JSON.stringify(this.props.data));
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <h2 className="commentAuthor">
          {"TEST 7"}
        </h2>
      );
    });
    return (
      <div className="verificationList">
        {commentNodes}
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('app'));
