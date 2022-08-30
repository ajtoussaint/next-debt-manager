import React from 'react';
import styles from '../styles/DebtManager.module.scss';

export default class Debt extends React.Component {
  constructor(props) {
    super(props);
    //state inherited through debt Item props
    this.state = {
      editing: true
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePrincipal = this.handleChangePrincipal.bind(this);
    this.handleChangeIR = this.handleChangeIR.bind(this);
    this.handleChangeCT = this.handleChangeCT.bind(this);
    this.handleChangeMinPay = this.handleChangeMinPay.bind(this);
    this.editMode = this.editMode.bind(this);
    this.deleteDebt = this.deleteDebt.bind(this);
  }

  //will need a change function for each input similar to this one
  handleChangeName(e) {
    let updatedDebt = Object.assign({}, this.props.debtItem, {
      name: e.target.value
    });
    this.props.debtEditor(this.props.debtNumber, updatedDebt);
  }

  handleChangePrincipal(e) {
    //copies the current object and updates the principal
    let updatedDebt = Object.assign({}, this.props.debtItem, {
      principal: e.target.value
    });
    //updates the state of the main component
    this.props.debtEditor(this.props.debtNumber, updatedDebt);
  }

  handleChangeIR(e) {
    let updatedDebt = Object.assign({}, this.props.debtItem, {
      interestRate: e.target.value
    });
    this.props.debtEditor(this.props.debtNumber, updatedDebt);
  }

  handleChangeMinPay(e) {
    let updatedDebt = Object.assign({}, this.props.debtItem, {
      minimumPayment: e.target.value
    });
    console.log(2);
    this.props.debtEditor(this.props.debtNumber, updatedDebt);
  }

  handleChangeCT(e) {
    console.log(e.target.value);
    let updatedDebt = Object.assign({}, this.props.debtItem, {
      compoundingType: e.target.value
    });
    this.props.debtEditor(this.props.debtNumber, updatedDebt);
  }

  editMode() {
    this.setState((state) => ({
      editing: !state.editing
    }));
  }

  deleteDebt() {
    this.setState((state) => ({
      editing: !state.editing
    }));
    this.props.debtEditor(this.props.debtNumber, null);
  }

  render() {
    if (this.state.editing) {
      return (
        <div className={styles.debt} id={"debt" + this.props.debtNumber}>
          <div>
            Name:
            <input
              id={styles.nameInput}
              type="text"
              onChange={this.handleChangeName}
              value={this.props.debtItem.name}
            />
          </div>
          <div>
            Principal:
            <input
              id={styles.principalInput}
              type="number"
              onChange={this.handleChangePrincipal}
              value={this.props.debtItem.principal}
            />
          </div>
          <div>
            Interest Compunding Type:
            <fieldset id="interestType" onChange={this.handleChangeCT}>
              <label for="annually">
                <input
                  type="radio"
                  id="annually"
                  value="annually"
                  name="IR"
                  checked={this.props.debtItem.compoundingType === "annually"}
                />
                Annually
              </label>
              <label for="monthly">
                <input
                  type="radio"
                  id="monthly"
                  value="monthly"
                  name="IR"
                  checked={this.props.debtItem.compoundingType === "monthly"}
                />
                Monthly
              </label>
            </fieldset>
          </div>
          <div>
            {this.props.debtItem.compoundingType === "monthly"
              ? "Monthly "
              : "Annual "}
            Interest Rate:
            <input
              type="number"
              onChange={this.handleChangeIR}
              value={this.props.debtItem.interestRate}
            />%
          </div>
          <div>
            Minimum Payment:
            <input
              type="number"
              onChange={this.handleChangeMinPay}
              value={this.props.debtItem.minimumPayment}
            />
          </div>
          <div className="btnWrap">
          <button id="editButton" onClick={this.editMode}>
            Save
          </button>
          <button id="deleteButton" onClick={this.deleteDebt}>
            Delete Debt
          </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.debt} id={"debt" + this.props.debtNumber}>
          <div>
            {this.props.debtNumber + 1 + "." + this.props.debtItem.name}
          </div>
          <div>Principal: ${this.props.debtItem.principal}</div>
          <div>
            compounded {this.props.debtItem.compoundingType} at{" "}
            {this.props.debtItem.interestRate}%
          </div>
          <div>minimum payment: ${this.props.debtItem.minimumPayment}</div>
          <div className="btnWrap">
          <button id="editButton" onClick={this.editMode}>
            Edit
          </button>
          </div>
        </div>
      );
    }
  }
}
