import React from 'react';
import { Stuff, StuffSchema } from '/imports/api/stuff/stuff';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.render = this.render.bind(this);
    this.formRef = null;
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, quantity, condition } = data;
    const username = Meteor.user().username;
    Stuff.insert({ name, quantity, condition, username }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Add succeeded' })));
    this.formRef.reset();
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Stuff</Header>
            <AutoForm ref={(ref) => this.formRef = ref} schema={StuffSchema} onSubmit={this.submit}>
              <Segment>
                <TextField name='name'/>
                <TextField name='quantity'/>
                <SelectField name='condition'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <TextField name='username' type='hidden' label={false} value='fakeuser@foo.com'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddStuff;
