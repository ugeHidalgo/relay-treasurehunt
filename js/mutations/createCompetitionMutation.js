
import Relay from "react-relay";

class CreateCompetitionMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { createCompetition }
    `;
  }

  getVariables() {
    return {
      name : this.props.name,
      type : this.props.type,
      city : this.props.city,
      country : this.props.country
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateCompetitionPayload {
        competitionEdge,
        store { competitionConnection }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'store',
      parentID: this.props.store.id,
      connectionName: 'competitionConnection',
      edgeName: 'competitionEdge',
      rangeBehaviors: {
        '': 'add',
      },
    }]
  }

}

export default CreateCompetitionMutation;
