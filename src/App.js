import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import CSVReader from "react-csv-reader";
import { CSVLink, CSVDownload } from "react-csv";
var mvcM = [];
const App = () => {
  const [mvcData, setMvcData] = useState([]);
  const [vcDataDownload, setVcDataDownload] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [inCustomer, setInCustomer] = useState([]);
  const [outCustomer, setOutCustomer] = useState([]);
  const [vcObjectData, setVcObjectData] = useState({});
  const handleCSVFileUpload = e => {
    // console.log(e);
    let MVCCModData = []
    let objectData = {};
    let download = [];
    console.log(e.length);
    for (let i = 0; i < e.length; i++) {
      MVCCModData.push([`10001000${e[i][0]}`]);
      objectData[`10001000${e[i][0]}`] = 1;
      download.push([`'10001000${e[i][0]}`]);
    }
    setMvcData(MVCCModData);
    setVcObjectData(objectData);
    setVcDataDownload(download);
    console.log(MVCCModData);
  }

  const handleCSVCustomer = e => {
    let customerDataset = [];
    customerDataset = e;
    customerDataset.shift();
    setCustomerData(customerDataset);
    console.log(customerDataset);
  }
  const splitData = () => {
    let inData = [];
    let outData = [];
    // for (let i = 0; i < 20; i++) {
    //   console.log(customerData[i])
    // }

    // for (let vc of mvcData) {
    //   if (val[1] == vc[0]) {
    //     inData.push(val);
    //   } else {
    //     outData.push(val);
    //   }
    // }
    for (let val of customerData) {
      if (vcObjectData[val[1]]) {
        inData.push(val);
      } else {
        outData.push(val);
      }

    }
    setInCustomer(inData);
    setOutCustomer(outData);
  }
  return (
    <div>
      <CSVReader

        style={{ border: "2px solid #ececec", padding: 5, }}
        cssClass="react-csv-input"
        onFileLoaded={e => { handleCSVFileUpload(e) }}
      />
      <CSVLink

        headers={[{ label: "MVCC", key: "MVCC" }]}
        filename={`MVCC.csv`}
        data={vcDataDownload} style={{ display: "block" }}>
        <button>
          Download MVC
</button>
      </CSVLink>

      <br></br>
      <label>Choose Customer</label>
      <CSVReader

        style={{ border: "2px solid #ececec", padding: 5, }}
        cssClass="react-csv-input"
        onFileLoaded={e => { handleCSVCustomer(e) }}
      />

      <br></br>
      <button onClick={() => { splitData() }}>
        Split
</button>

      <br></br>
      <br></br>
      <CSVLink

        // headers={[{ label: "MVCC", key: "MVCC" }]}
        filename={`CustomerIn.csv`}
        data={inCustomer} style={{ display: "block" }}>
        <button>
          Download in customer data
</button>
      </CSVLink>

      <br></br>
      <CSVLink

        // headers={[{ label: "MVCC", key: "MVCC" }]}
        filename={`CustomerOut.csv`}
        data={outCustomer} style={{ display: "block" }}>
        <button>
          Download Out customer data
</button>
      </CSVLink>

    </div>

  );
}
export default App;
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dataList: [],
//       headerArray: [],
//       splitedData: {},
//       MVCCMod: []
//     }
//   }
//   handleCSVFileUpload = e => {
//     let header = [];
//     // delete e[0]
//     let MVCCModData = []
//     console.log(e.length);
//     for (let i = 0; i < e.length; i++) {
//       MVCCModData[i] = e[i][0];
//     }
//     // for (let i in e) {

//     //   MVCCModData[i] = e[i][0];
//     // }
//     mvcM = MVCCModData;
//     // this.setState({ MVCCMod: MVCCModData });



//     // var arrayOfData = [];
//     // console.log("csv", e);
//     // let len = e.length;
//     // let lenOfRow = e[0].length
//     // console.log("len",len,lenOfRow);
//     // for(let m=1;m<len;m++){
//     //   let data ={};
//     //   for(let k=0;k<lenOfRow;k++){
//     //     data[e[0][k]] = e[m][k];
//     //   }
//     //   arrayOfData.push(data);
//     // }
//     // console.log("object",arrayOfData);
//     // this.setState({dataList:arrayOfData,headerArray:e[0]});
//   }

//   exportMVCWithCode = () => {

//   }
//   splitByLcoCode() {
//     var { dataList } = this.state;
//     let lcoList = {};
//     let lcoArray = [];
//     //  let len = dataList.length;
//     //  for(let j =1;j<len;j++){
//     //   let keyOf = dataList[j][1];
//     //   if (keyOf in lcoList){
//     //     lcoList[keyOf].push(dataList[j]);
//     //   }else{
//     //     lcoList[keyOf] = [];
//     //     lcoList[keyOf].push(dataList[j]);

//     //   }
//     //  }
//     for (let h of this.state.dataList) {
//       let keyOf = h[1];
//       if (keyOf in lcoList) {
//         lcoList[keyOf].push(h);
//       } else {
//         lcoList[keyOf] = [];
//         lcoList[keyOf].push(h);

//       }
//     }
//     console.log("lcolist", lcoList);
//     this.setState({ splitedData: lcoList });
//   }

//   render() {
//     return (
//       <div style={{ width: "100%", height: "100%" }}>
//         <CSVReader

//           style={{ border: "2px solid #ececec", padding: 5, }}
//           cssClass="react-csv-input"
//           onFileLoaded={e => { this.handleCSVFileUpload(e) }}
//         />

//         <CSVLink

//           headers={[{ label: "MVCC", key: "MVCC" }]}
//           filename={`MVCC.csv`}
//           data={mvcM} style={{ display: "block" }}>
//           <button>
//             Download MVC
// </button>
//         </CSVLink>
//         {/* <button
//           onClick={() => { this.splitByLcoCode() }}
//         >
//           split by lco
// </button> */}
//         <div
//           style={{ width: "100%", height: "80%", overflow: "auto" }}
//         >
//           {Object.keys(this.state.splitedData).map((visit, index) => <div style={{ marginTop: 10, width: "40%", borderBottomColor: "gray", borderBottomWidth: 2 }}>

//             {/* <CSVLink

//               headers={this.state.headerArray}
//               filename={`lco(${visit}).csv`}
//               data={this.state.splitedData[visit]} style={{ display: "block" }}>
//               <button>
//                 {index}.)  Lco {visit}
//               </button>
//             </CSVLink> */}
//           </div>)}
//         </div>

//       </div>

//     );
//   }
// }
// export default App;
