/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Button from 'react-md/lib/Buttons/Button';
import { types as navTypes } from '../actions/nav';

export default class Databases extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="md-grid md-grid--40-24">
        <Card className="md-cell md-cell--2 md-block-centered" raise>
          <CardTitle title="Apps" />
          <CardActions>
            <Button component={Link} to={navTypes.DB_APPS_INSERT} icon primary>add</Button>
            <Button component={Link} to={navTypes.DB_APPS_EDIT} icon primary>mode_edit</Button>
          </CardActions>
        </Card>
        <Card className="md-cell md-cell--2 md-block-centered" raise>
          <CardTitle title="Components" />
          <CardActions>
            <Button component={Link} to={navTypes.DB_COMPONENTS_INSERT} icon primary>add</Button>
            <Button component={Link} to={navTypes.DB_COMPONENTS_EDIT} icon primary>mode_edit</Button>
          </CardActions>
        </Card>
        <Card className="md-cell md-cell--2 md-block-centered" raise>
          <CardTitle title="Nodes" />
          <CardActions>
            <Button component={Link} to={navTypes.DB_NODES_INSERT} icon primary>add</Button>
            <Button component={Link} to={navTypes.DB_NODES_EDIT} icon primary>mode_edit</Button>
          </CardActions>
        </Card>
        <Card className="md-cell md-cell--2 md-block-centered" raise>
          <CardTitle title="Sites" />
          <CardActions>
            <Button component={Link} to={navTypes.DB_SITES_INSERT} icon primary>add</Button>
            <Button component={Link} to={navTypes.DB_SITES_EDIT} icon primary>mode_edit</Button>
          </CardActions>
        </Card>
        <Card className="md-cell md-cell--2 md-block-centered" raise>
          <CardTitle title="Users" />
          <CardActions>
            <Button component={Link} to={navTypes.DB_USERS_INSERT} icon primary>add</Button>
            <Button component={Link} to={navTypes.DB_USERS_EDIT} icon primary>mode_edit</Button>
          </CardActions>
        </Card>
      </section>
    );


  }
}
