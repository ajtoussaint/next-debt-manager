import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import Head from 'next/head';
import React from 'react';
import styles from '../styles/Test.module.scss'
import Debt from '../components/Debt.js'

export default function FirstTest() {
  const [buttonPresses, setBP] = React.useState(0);

  function handleClick(){
    console.log("button clicked");
    setBP(buttonPresses +1);
  }

  function TestComp(props){
    return(
      <div className={styles.testCompClass}>
        <h2> I am a test!</h2>
         Magic Numer: {props.magicNumer}
      </div>
    )
  }

  function Editor(){
    console.log("editing")
  }

  const myArr = [1,2]

  return (
    <>
      <Head>
        <title>Test Page</title>
      </Head>
      <h1>Hello, next</h1>
      <div className={styles.testClass}> Llorem ipsum dolor est</div>
      <button onClick={handleClick}>Times Clicked: {buttonPresses}</button>
      {myArr.map((item,index) => {
          return(
           <TestComp magicNumer={item} />
          );
        }
       )
     }
     <div>something new...</div>
     <Debt
      debtEditor={Editor}
      debtItem={{
          name: "Student Loan",
          principal: 20000,
          interestRate: 2,
          compoundingType: "annually",
          minimumPayment: 50
        }}
      debtNumber={1} />
    </>
  )
}
