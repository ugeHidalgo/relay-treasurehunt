import React from 'react';
import Relay from 'react-relay';

import CreateCompetitionMutation from '../../mutations/createCompetitionMutation';

class Competition extends React.Component {

  renderCompetitionRow() {
    let Competitions = this.props.store.competitionConnection.edges;
    return Competitions.map(comp => {
      return (
        <tr key={comp.__dataID__}>
          <td>{comp.node.name}</td>
          <td>{comp.node.type}</td>
          <td>{comp.node.city}</td>
          <td>{comp.node.country}</td>
        </tr>
      )
    });
  }

  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({limit : newLimit});
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    //Call mutation
    debugger;
    Relay.Store.commitUpdate(
      new CreateCompetitionMutation({
        name : this.refs.newName.value,
        type : this.refs.newType.value,
        city : this.refs.newCity.value,
        country : this.refs.newCountry.value,
        store: this.props.store
      })
    );

    //Clear data
    this.refs.newName.value="";
    this.refs.newType.value="";
    this.refs.newCity.value="";
    this.refs.newCountry.value="";
  }

  render() {
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">Competitions
        <form onSubmit={this.handleSubmit}>
        <button type="submit">Create new</button>
          <input type="text" placeholder="Name" ref="newName"/>
          <input type="text" placeholder="Type" ref="newType"/>
          <input type="text" placeholder="City" ref="newCity"/>
          <input type="text" placeholder="Country" ref="newCountry"/>
        </form>
        </div>
				<table className='table'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
              <th>City</th>
              <th>Country</th>
						</tr>
					</thead>
					<tbody>
						{this.renderCompetitionRow()}
					</tbody>
				</table>
				<div className="panel-footer">
					<div className="footerText">
						<p>Total competitions  : {this.props.store.competitionConnection.edges.length}</p>
            Showing :
            <select onChange={this.setLimit} defaultValue="25">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
					</div>
				</div>
			</div>
		);
  }
}

export default Relay.createContainer(Competition, {
  initialVariables: {
    limit: 25
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        competitionConnection (first:$limit){
          edges {
            node {
              name,
              type,
              date,
              city,
              country
            }
          }
        }
      }
    `,
  },
});
