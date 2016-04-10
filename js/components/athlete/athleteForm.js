import React from 'react';
import Relay from 'react-relay';

class AthleteForm extends React.Component {

  renderAthleteCompetitionRow() {
    let athleteCompetitions = this.props.store.athleteConnection.edges[0].node.competitions.edges;
    return athleteCompetitions.map(comp => {
      return (
        <tr key={comp.node.__dataID__}>
          <td>{comp.node.date}</td>
          <td>{comp.node.name}</td>
          <td>{comp.node.type}</td>
          <td>{comp.node.city}</td>
          <td>{comp.node.country}</td>
        </tr>
      )
    });
  }

  render() {
    let athlete = this.props.store.athleteConnection.edges[0].node;
		return (
      <div>
			   <div className="panel panel-primary">
				     <div className="panel-heading">Athlete</div>
             <div className="panel">
                First Name : {athlete.firstName}
            </div>
          <div className="panel">
                Last Name : {athlete.lastName}
          </div>
        </div>

        <div className="panel panel-primary">
          <div className="panel-heading">Competitions :</div>
				    <table className='table'>
					    <thead>
						    <tr>
                  <th>Date</th>
							    <th>Name</th>
							    <th>Type</th>
                  <th>City</th>
                  <th>Country</th>
						    </tr>
					    </thead>
					    <tbody>
						    {this.renderAthleteCompetitionRow()}
					    </tbody>
				    </table>
				  <div className="panel-footer">
					  <div className="footerText">
						  <p>Total competitions  : {athlete.competitions.edges.length}</p>
					  </div>
				  </div>
			  </div>
      </div>
		);
  }
}


//todo firstName and athletId must be populated with data from the screen
export default Relay.createContainer(AthleteForm, {
  initialVariables: {
    limit: 5
  },
  fragments: {
    store: () => Relay.QL`
    fragment on Store {
      athleteConnection(first: 1, firstName: "Juan") {
      edges {
        node {
          id
          firstName
          lastName
          competitions(first: 5, athleteId: "1") {
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
      }
    }
      }
  `,
  },
});
