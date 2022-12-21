import React from 'react';
import styles from '../styles/DebtManager.module.scss';
import Debt from '../components/Debt.js'
import Head from 'next/head'

export default class MyComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debtObjArr: [
        {
          name: "Student Loans",
          principal: 20000,
          interestRate: 2,
          compoundingType: "annually",
          minimumPayment: 50
        }
      ],
      monthlyPayment:0,
      timeToPayOff: 0
    };
    this.addDebt = this.addDebt.bind(this);
    this.createDebt = this.createDebt.bind(this);
    this.editDebt = this.editDebt.bind(this);
    this.changePay = this.changePay.bind(this);
    //this.changeTime = this.changeTime.bind(this);
    this.CalculateTime = this.CalculateTime.bind(this);
  }

  createDebt() {
    return {
      name: "",
      principal: 0,
      interestRate: 0,
      compoundingType: "annually",
      minimumPayment: 0
    };
  }

  editDebt(id = 0, newDebt) {
    let tempArr = [...this.state.debtObjArr];
    //if there is a new debt update it, otherwise deleteDebt
    newDebt ? tempArr.splice(id, 1, newDebt) : tempArr.splice(id, 1);
    console.log(tempArr[0].name);
    this.setState((state) => ({
      debtObjArr: tempArr,
      monthlyPayment: state.monthlyPayment,
      timeToPayOff: state.timeToPayOff
    }));
  }

  addDebt() {
    this.setState((state) => ({
      debtObjArr: [...state.debtObjArr, this.createDebt()]
    }));
  }

 CalculateTime(debtArr, monthlyPayment) {
      let workArr = [...debtArr];
      workArr.forEach((debt) => {
        if (debt.compoundingType === "annually") {
          debt.interestRate = debt.interestRate / 12;
        }
      });

      //sort in order of interest rate
      workArr.sort((a, b) => (a.interestRate > b.interestRate ? -1 : 1));

      let monthsPassed = 0;

      while (
        workArr.reduce(
          (accumulator, current) => accumulator + current.principal,
          0
        ) > 0 &&
        monthsPassed < 1200
      ) {
        //incriment Time
        monthsPassed++;
        //console.log(monthsPassed)
        let myMonthlyPayment = monthlyPayment;
        workArr.forEach((debt) => {
          if (debt.principal < debt.minimumPayment) {
            //pay off all if possible
            myMonthlyPayment -= debt.principal;
            //console.log("payed",debt.principal,debt.name,"payed off");
            debt.principal = 0;
          } else {
            //pay minimum on each account
            debt.principal -= debt.minimumPayment;
            //pay minimum on each account
            myMonthlyPayment -= debt.minimumPayment;
            //console.log("payed",debt.minimumPayment,debt.name,debt.principal);
          }
        });

        //pay the rest to the highest interest account
        workArr.forEach((debt) => {
          if (debt.principal > 0) {
            if (debt.principal > myMonthlyPayment) {
              //spend all money on this debt
              debt.principal -= myMonthlyPayment;
              //console.log("payed",myMonthlyPayment,debt.name,debt.principal);
              myMonthlyPayment = 0;
            } else {
              //pay off the debt and continue
              myMonthlyPayment -= debt.principal;
              //console.log("payed",debt.principal,debt.name,"payed off");
              debt.principal = 0;
            }
          }
        });

        workArr.forEach((debt) => {
          debt.principal = debt.principal * (1 + debt.interestRate / 100);
          //console.log("EOM",debt.name,debt.principal);
        });
      }
      return monthsPassed;
    }

changePay(e) {
    //console.log("changing Pay");
    //avoid interference with state
    let myNewArr = [];
    this.state.debtObjArr.forEach((debt) => {
      myNewArr.push(Object.assign({}, debt));
    });
    let monthsToPayOff = this.CalculateTime(myNewArr, e.target.value);
    this.setState((state) => ({
      monthlyPayment: e.target.value,
      timeToPayOff: monthsToPayOff
    }));
  } //end change pay$$$

  /*changeTime(e) {
    console.log("changingTime")
     //avoid interference with state
    let myNewArr = [];
    this.state.debtObjArr.forEach((debt) => {
      myNewArr.push(Object.assign({}, debt));
    });
    let currentPayment = myNewArr.reduce( (cumulative,debt) => cumulative + debt.principal,0);
    let currentTime = 1
    while (currentTime != e.target.value){
      currentPayment--;
      //this will take some time...
      console.log("trying: ", currentPayment,"to get",e.target.value);
      currentTime = this.CalculateTime(myNewArr, currentPayment);
    }
    console.log("final:",currentTime,currentPayment);

    this.setState((state) => ({
      timeToPayOff: e.target.value
    }));
  } *///end changeTime
  //may revisit this later

  render() {
    return (
      <>
      <div id={styles.wrapper}>
      <Head>
        <link rel="icon" href="/Icon3.png" />
      </Head>
        <h1>Debt Manager</h1>
        <label htmlFor="monthlyPayment">
          Amount you can pay per month:
          <input
            type="number"
            id={styles.monthlyPayment}
            value={this.state.monthlyPayment}
            onChange={this.changePay}
            min={this.state.debtObjArr.reduce((x,y) => x + y.minimumPayment , 0)}
          />
        </label>
        <div>
          Months until all debts payed: {this.state.timeToPayOff}
        </div>
        <div id={styles.debtArray}>
          {this.state.debtObjArr.map((item, index) => {
            return (
              <Debt
                debtEditor={this.editDebt}
                debtItem={item}
                debtNumber={index}
                key={index}
              />
            );
          })}
          <div className={styles.debt} id={styles.debtAdder}>
            <button onClick={this.addDebt}>+</button>
          </div>
        </div>
        <footer>by Andrew Toussaint</footer>
      </div>
    </>
    );
  }
}
