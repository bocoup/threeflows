import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getScenarios } from '@client/actions/scenario';

import ScenarioEntries from './ScenarioEntries';
import 'semantic-ui-css/semantic.min.css';
import './ScenariosList.css';

class ScenariosList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scenarios: []
        };
    }

    async componentDidMount() {
        const scenarios = await this.props.getScenarios();
        this.setState({ scenarios });
    }

    render() {
        const category = this.props.location.pathname.slice(1);
        let scenarios =
            (this.props.scenarios &&
                this.props.scenarios.filter(({ categories }) => {
                    return !category || categories.includes(category);
                })) ||
            [];

        // TODO: Expose deleted scenarios these to Admin only
        // This pushes "deleted" scenarios to the end of the list of Scenarios,
        // as a temporary means of addressing the display of "deleted"
        // scenarios.
        scenarios.forEach((scenario, index, scenarios) => {
            if (scenario.deleted_at) {
                scenarios.splice(index, 1);
                scenarios.push(scenario);
            }
        });

        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column stretched>
                            <h2>
                                Practice spaces for teacher preparation programs
                            </h2>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column stretched>
                            {scenarios.length ? (
                                <Card.Group>
                                    <ScenarioEntries
                                        scenarios={scenarios}
                                        isLoggedIn={this.props.isLoggedIn}
                                    />
                                </Card.Group>
                            ) : (
                                <Loader inverted content="Loading" />
                            )}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

ScenariosList.propTypes = {
    scenarios: PropTypes.array,
    getScenarios: PropTypes.func,
    isLoggedIn: PropTypes.bool.isRequired,
    location: PropTypes.object
};

function mapStateToProps(state) {
    const {
        login: { isLoggedIn, username },
        scenarios
    } = state;
    return { isLoggedIn, username, scenarios };
}

const mapDispatchToProps = {
    getScenarios
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScenariosList);
