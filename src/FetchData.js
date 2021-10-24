import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { metricData: [], loading: true,addModalShow:false, editModalShow:false };
  }

  componentDidMount() {
    this.updateMetricData();
  }

  static rendermetricDataTable(metricData) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
          </tr>
        </thead>
        <tbody>
          {metricData.map(data =>
            <tr key={data.id}>
              <td>{data.userId}</td>
              <td>{data.lastActivityDate}</td>
              <td>{data.registrationDate}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.rendermetricDataTable(this.state.metricData);

    return (
      <div>
        <h1 id="tabelLabel" >Weather data</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  updateMetricData() {
    const response = fetch('http://localhost:44304/api/metricdatas')
    .then(response => response.json())
    .then(data => this.setState({ metricData: data, loading: false }));
    console.log(response);
  }
}
