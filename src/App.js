import logo from './logo.svg';
import './App.css';
import React, { startTransition, useState } from 'react';
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

  const [scourceData, setScourceData] = useState({});
  const [compareData, setCompareData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [compressDataSource, setCompressDataSource] = useState([]);
  const [compressDataSourceResult, setCompressDataSourceResult] = useState([]);
  const [compressionStarted, setCompressionStarted] = useState(false);
  const handleCSVFileUpload = e => {
    setIsDone(false);

    let sourceObj = {};
    for (let i = 1; i < e.length; i++) {
      // MVCCModData.push([`10001000${e[i][0]}`]);
      // objectData[`'10001000${e[i][0]}`] = 1;
      // download.push([`'10001000${e[i][0]}`]);

      sourceObj[e[i][1]] = e[i][0];

    }
    setScourceData(sourceObj)
    // setMvcData(MVCCModData);
    // setVcObjectData(objectData);
    // setVcDataDownload(download);
    // console.log(MVCCModData);
  }

  const handleCSVCustomer = e => {

    e.shift()
    setCompareData(e);
  }
  const splitData = () => {
    let updateInfo = [...compareData];



    for (let i = 0; i < updateInfo.length; i++) {
      updateInfo[i][1] = scourceData[updateInfo[i][1]] ? scourceData[updateInfo[i][1]] : "not found";
    }
    console.log(updateInfo)
    setUpdatedData(updateInfo)
    setIsDone(true);

  }

  const handleForCompress = e => {
    setIsDone(false);

    // let sourceObj = {};
    // for (let i = 1; i < e.length; i++) {
    //   // MVCCModData.push([`10001000${e[i][0]}`]);
    //   // objectData[`'10001000${e[i][0]}`] = 1;
    //   // download.push([`'10001000${e[i][0]}`]);

    //   sourceObj[e[i][1]] = e[i][0];

    // }
    e.shift()
    setCompressDataSource(e);
    
   
  }
  const handleCompression =() => {
    setCompressionStarted(true);
  // console.log("compareData",compressDataSource)
  let newData = {};
  let rowData = [];
  for (let i = 0; i < compressDataSource.length; i++) {
 
    if(!newData.hasOwnProperty(compressDataSource[i][5])){
      newData[compressDataSource[i][5]] =  compressDataSource[i][6];
      rowData.push({...compressDataSource[i]});
    }else{
      newData[compressDataSource[i][5]] = newData[compressDataSource[i][5]]+ ","+compressDataSource[i][6];
    }
  }
        
  let newArray =[["ALA","ProductName","ProductSKU","BasePrice","CAS","Product_CAS_ID","Channelname","Type"]];
 
  for(const obj of rowData){
   newArray.push([obj[0],obj[1],obj[2],obj[3],obj[4],obj[5],newData[obj[5]],obj[7]]);
  }
  console.log("new",newArray)
   setCompressDataSourceResult(newArray);
   setCompressionStarted(false);
  }

  return (
    <div>

      <label>Source file</label>
      <CSVReader

        style={{ border: "2px solid #ececec", padding: 5, }}
        cssClass="react-csv-input"
        onFileLoaded={e => { handleCSVFileUpload(e) }}
      />
      {/* <CSVLink

        headers={[{ label: "MVCC", key: "MVCC" }]}
        filename={`MVCC.csv`}
        data={vcDataDownload} style={{ display: "block" }}>
        <button>
          Download MVC
</button>
      </CSVLink> */}

      <br></br>
      <label>Compare file</label>
      <CSVReader

        style={{ border: "2px solid #ececec", padding: 5, }}
        cssClass="react-csv-input"
        onFileLoaded={e => { handleCSVCustomer(e) }}
      />

      <br></br>
      <button onClick={() => { splitData() }} style={{ background: "green" }}>
        Change
</button>
      <label style={{ marginLeft: 20 }}> {isDone ? "Update!" : ""}</label>
      <br></br>
      <br></br>
      <CSVLink

        // headers={[{ label: "MVCC", key: "MVCC" }]}
        filename={`update list ${new Date().toLocaleString()}.csv`}
        data={updatedData} style={{ display: "block" }}>
        <button>
          Download in customer data
</button>
      </CSVLink>
<label style={{ marginLeft: 20 }}> --------------</label>
<br></br>
<label style={{ marginLeft: 20 }}>Combine</label>
<br></br>
<label>Source file</label>
      <CSVReader

        style={{ border: "2px solid #ececec", padding: 5, }}
        cssClass="react-csv-input"
        onFileLoaded={e => { handleForCompress(e) }}
      />

<br></br>
      <button onClick={() => { handleCompression() }} 
      style={{ background: compressionStarted ? "red" :"green" }}
      >
        Compress
</button>
<br></br>
<br></br>
<CSVLink

        // headers={[{ label: "MVCC", key: "MVCC" }]}
        filename={`Compress file ${new Date().toLocaleString()}.csv`}
        data={compressDataSourceResult} style={{ display: "block" }}>
        <button >
          Download file
</button>
      </CSVLink>

      



      {/* <br></br>
      <CSVLink

        // headers={[{ label: "MVCC", key: "MVCC" }]}
        filename={`CustomerOut.csv`}
        data={outCustomer} style={{ display: "block" }}>
        <button>
          Download Out customer data
</button>
      </CSVLink> */}

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
