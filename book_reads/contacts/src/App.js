import React, { Component } from 'react';

const people1 = [{ name: 'Karen1' }, { name: 'Jack1' }, { name: 'Marco1' }];
const people2 = [{ name: 'Karen2' }, { name: 'Jack2' }, { name: 'Marco2' }];
const people3 = [{ name: 'Karen3' }, { name: 'Jack3' }, { name: 'Marco3' }];

class ContactList extends Component {
  render() {
    const people = this.props.contacts;
    return (
      <div className='contactList'>
        <ol>
          {people.map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ol>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className='App'>
        <ContactList contacts={people1} />
        <ContactList contacts={people2} />
        <ContactList contacts={people3} />
      </div>
    );
  }
}

export default App;
