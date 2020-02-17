import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Dialog from 'react-dialog'
import Picky from 'react-picky';
import 'react-picky/dist/picky.css'; // Include CSS
import Modal from 'react-awesome-modal';
import RTChart from 'react-rt-chart';
import Select from 'react-select';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from "jspdf";

export default class OfferAct extends Component {

  constructor(){
    super();
    ////console.log(super());
    this.state = {
      day:[],
      month:[],
      year:[],
      showall:'box collapsed-box',
      flagfixins38:0,
      fixins38:'',
      defaultvarvalue38:'',
      flagfixins39:0,
      fixins39:'',
      defaultvarvalue39:'',
      flagfixins40:0,
      fixins40:'',
      defaultvarvalue40:'',
      day40:'',
      month40:'',
      year40:'',

    };
    this.openfixins38= this.openfixins38.bind(this);
    this.closefixins38= this.closefixins38.bind(this);
    this.handleChangefixins38= this.handleChangefixins38.bind(this);
    this.handleSubmitfixins38= this.handleSubmitfixins38.bind(this);
    this.openfixins39= this.openfixins39.bind(this);
    this.closefixins39= this.closefixins39.bind(this);
    this.handleChangefixins39= this.handleChangefixins39.bind(this);
    this.handleSubmitfixins39= this.handleSubmitfixins39.bind(this);
    this.openfixins40= this.openfixins40.bind(this);
    this.closefixins40= this.closefixins40.bind(this);
    this.handleChangefixins40= this.handleChangefixins40.bind(this);
    this.handleSubmitfixins40= this.handleSubmitfixins40.bind(this);
  }
  componentDidMount() {

    const url = window.location.href;
    if(url.includes('?mode=open') == true)
    {
        this.setState({showall:'box'});
    }
    else
    {
      this.setState({showall:'box collapsed-box'});
    }
    axios.get('/wealththaiinsurance/load/day').then(response=>{
      this.setState({day:response.data});
    })
    axios.get('/wealththaiinsurance/load/month').then(response=>{
      this.setState({month:response.data});
    })
    axios.get('/wealththaiinsurance/load/year').then(response=>{
      this.setState({year:response.data});
    })
    this.setState({
      defaultvarvalue38:this.props.varvalue38,
      defaultvarvalue39:this.props.varvalue39,
      defaultvarvalue40:this.props.varvalue40,
    })
  }
  handleSubmitfixins38(e){
    e.preventDefault();
    axios.post('/wealththaiinsurance/update/somecase?fixins38',{
      id:this.props.id,
      fixins38:this.state.fixins38,
    }).then(res=>{

      //console.log(res.data);
      this.setState({
        defaultvarvalue38:this.state.fixins38,
        flagfixins38:0,
      })
    });
  }
  handleChangefixins38(e){
    //console.log(e.target.value);
    this.setState({
      fixins38:e.target.value,
    })
  }
  openfixins38()
  {
    this.setState({
      flagfixins38:1
    })
  }
  closefixins38()
  {
    this.setState({
      flagfixins38:0
    })
  }
  fixins38()
  {
    if(this.state.flagfixins38 == 1)
    {
      return  <div> <form onSubmit={this.handleSubmitfixins38}><input onChange={this.handleChangefixins38} value={this.state.fixins38} class="form-control"/>&nbsp;&nbsp;&nbsp;<button type="submit"  class="btn btn-box-tool" ><span style={{color:'green'}}>บันทึก</span></button><button type="button" onClick={this.closefixins38}class="btn btn-box-tool" ><span style={{color:'red'}}>ยกเลิก</span></button></form></div>
    }
    else
    {
      return <div ><span style={{float:'left'}}>{this.state.defaultvarvalue38}</span> <span  style={{float:'right',color:'orange'}}  onClick={this.openfixins38}>แก้ไข</span></div>
    }
  }
  handleSubmitfixins39(e){
    e.preventDefault();
    axios.post('/wealththaiinsurance/update/somecase?fixins39',{
      id:this.props.id,
      fixins39:this.state.fixins39,
    }).then(res=>{
      //console.log(res.data);
      this.setState({
        defaultvarvalue39:this.state.fixins39,
        flagfixins39:0,
      })
    });
  }
  handleChangefixins39(e){
    //console.log(e.target.value);
    this.setState({
      fixins39:e.target.value,
    })
  }
  openfixins39()
  {
    this.setState({
      flagfixins39:1
    })
  }
  closefixins39()
  {
    this.setState({
      flagfixins39:0
    })
  }
  fixins39()
  {
    if(this.state.flagfixins39 == 1)
    {
      return  <div> <form onSubmit={this.handleSubmitfixins39}><input onChange={this.handleChangefixins39} value={this.state.fixins42} class="form-control"/>&nbsp;&nbsp;&nbsp;<button type="submit"  class="btn btn-box-tool" ><span style={{color:'green'}}>บันทึก</span></button><button type="button" onClick={this.closefixins39}class="btn btn-box-tool" ><span style={{color:'red'}}>ยกเลิก</span></button></form></div>
    }
    else
    {
      return <div ><span style={{float:'left'}}>{this.state.defaultvarvalue39}</span> <span  style={{float:'right',color:'orange'}}  onClick={this.openfixins39}>แก้ไข</span></div>
    }
  }

  handleSubmitfixins40(e){
    e.preventDefault();
    axios.post('/wealththaiinsurance/update/somecase?fixins40',{
      id:this.props.id,
      fixins40:this.state.day40+'/'+this.state.month40+'/'+this.state.year40,
    }).then(res=>{

      //console.log(res.data);
      this.setState({
        defaultvarvalue40:this.state.day40+'/'+this.state.month40+'/'+this.state.year40,
        flagfixins40:0,
      })
    });
  }
  handleChangefixins40(e){
    //console.log(e.target.value);
    this.setState({
      fixins40:e.target.value,
    })
  }
  openfixins40()
  {
    this.setState({
      flagfixins40:1
    })
  }
  closefixins40()
  {
    this.setState({
      flagfixins40:0
    })
  }
  fixins40()
  {
    if(this.state.flagfixins40 == 1)
    {
      return  <div> <form onSubmit={this.handleSubmitfixins40}>
      <select onChange={(e) => this.setState({ day40: e.target.value })} name="dayex">
      <option value ="">  วัน  </option>
      <option value ="01">  01  </option>
      <option value ="02">  02  </option>
      <option value ="03">  03  </option>
      <option value ="04">  04  </option>
      <option value ="05">  05  </option>
      <option value ="06">  06  </option>
      <option value ="07">  07  </option>
      <option value ="08">  08  </option>
      <option value ="09">  09  </option>          {
        this.state.day.map(
          data =>
          <option value={data}>{data}</option>
        )
        }
        </select>

        <select  onChange={(e) => this.setState({ month40: e.target.value })}>
        <option value ="">  เดือน  </option>
        <option value ="01">  01  </option>
        <option value ="02">  02  </option>
        <option value ="03">  03  </option>
        <option value ="04">  04  </option>
        <option value ="05">  05  </option>
        <option value ="06">  06  </option>
        <option value ="07">  07  </option>
        <option value ="08">  08  </option>
        <option value ="09">  09  </option>
        {
          this.state.month.map(
            data =>
            <option value={data}>{data}</option>
          )
          }
        </select>
      <select onChange={(e) => this.setState({ year40: e.target.value })}  >
      <option value ="">  ปี พ.ศ  </option>
      {
        this.state.year.map(
          data =>
          <option value={data}>{data}</option>
        )
        }
      </select>&nbsp;&nbsp;&nbsp;<button type="submit"  class="btn btn-box-tool" ><span style={{color:'green'}}>บันทึก</span></button><button type="button" onClick={this.closefixins40}class="btn btn-box-tool" ><span style={{color:'red'}}>ยกเลิก</span></button></form></div>
    }
    else
    {
      return <div ><span style={{float:'left'}}>{this.state.defaultvarvalue40}</span> <span  style={{float:'right',color:'orange'}}  onClick={this.openfixins40}>แก้ไข</span></div>
    }
  }
  copyact()
  {
    if(this.props.filepublicname == null || this.props.filepublicname == '' ||this.props.filepublicname == 'undefined')
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={"https://erp.wealththai.net/SecurityBroke/case/uploadfile/"+this.props.id+"/xxx/CG4CG/Case_Attachment?cat?CA45CA/blink/wealththaiinsurance/file/upload/successblink"} target="_blank" className="btn btn-default">อัพโหลด</a></th>
    }
    else
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp; <a href={'/SecurityBroke/showfile/' + this.props.fileid} target="_blank">{this.props.filepublicname}</a></th>
    }
  }
    render() {
      return (
        <div className="column22" id="act">
        <div className={this.state.showall} style={{backgroundColor:'#F5F5F5'}}>
        <div className="box-header  ">
          <b className="box-title" data-widget="collapse">พรบ.</b>
          <br/>
          <br/>
           <table id="example2" className="table table-bordered table-hover dataTable" role="grid" aria-describedby="example2_info">
           <thead>
           <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
          <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}  >บริษัทประกันที่เลิอก</th>
            <th style={{backgroundColor:'white'}}>{this.props.companyname}</th>
          </tr>
           <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
          <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>Partner (Channel เดิม)</th>
            <th style={{backgroundColor:'white'}}>{this.props.partnername}</th>
          </tr>
          </thead>
           </table>
          <div className="box-tools pull-right">

            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i></button>
          </div>
        </div>
        <div className="box-body" style={{}}>
        <table id="example2" className="table table-bordered table-hover dataTable" role="grid" aria-describedby="example2_info">
        <thead>
        <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
       <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>ไฟล์สำเนา พรบ.</th>
       {this.copyact()}
       </tr>
         <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
        <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>วันที่ได้รับ พรบ.</th>
          <th style={{backgroundColor:'white'}}>&nbsp;</th>
        </tr>
         <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
        <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>วันที่ พรบ. หมดอายุ  (ใหม่)</th>
          <th style={{backgroundColor:'white'}}>&nbsp;</th>
        </tr>
         <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
        <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>วันที่จัดส่ง พรบ.</th>
          <th style={{backgroundColor:'white'}}>&nbsp;</th>
        </tr>
         <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
        <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>{this.props.varname38}</th>
          <th style={{backgroundColor:'white'}}>{this.fixins38()}</th>
        </tr>
         <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
        <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>{this.props.varname39}</th>
          <th style={{backgroundColor:'white'}}>{this.fixins39()}</th>
        </tr>
         <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
        <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>{this.props.varname40}</th>
          <th style={{backgroundColor:'white'}}>{this.fixins40()}</th>
        </tr>
        </thead>
        </table>
        </div>
        </div>
        <br/>
        <br/>
        </div>
        );
    }
}

if (document.getElementById('offeract')) {
  const component = document.getElementById('offeract');
  const props = Object.assign({}, component.dataset);
    ReactDOM.render(<OfferAct {...props}/>, component);
}
