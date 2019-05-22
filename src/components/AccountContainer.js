import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'
import {transactions} from '../transactionsData'

class AccountContainer extends Component {

  constructor() {
    super()
    this.state = {transactions: [],
                  searchText: ''
    }
  }

  componentDidMount() {
    fetch('https://boiling-brook-94902.herokuapp.com/transactions')
      .then(response => response.json())
      .then(
        data => {
          this.setState({transactions: data})
        }
      )
  }

  handleChange = event => {
    this.setState({searchText: event.target.value}, this.filterTransactions)
  }

  filterTransactions() {
    this.setState({transactions:

      this.state.transactions.map(transaction => {
        console.log(transaction.description);
        if (this.state.searchText === '') {
          transaction.isHidden = false
        }
        if(!transaction.description.includes(this.state.searchText) && this.state.searchText !== '') {
          transaction.isHidden = true
          console.log('hidden');
        }
        return transaction
      })

    })

  }

  render() {

    return (
      <div>
        <Search searchText={this.state.searchText} handleChange={this.handleChange}/>
        <TransactionsList transactions={this.state.transactions} />
      </div>
    )
  }
}

export default AccountContainer
