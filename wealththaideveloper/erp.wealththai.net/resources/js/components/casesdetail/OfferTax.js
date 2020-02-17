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

export default class OfferTax extends Component {

  constructor(){
    super();
    ////console.log(super());
    this.state = {
      day:[],
      month:[],
      year:[],
      showall:'box collapsed-box',
      flagfixins44:0,
      fixins44:'',
      defaultvarvalue44:'',
      flagfixins45:0,
      fixins45:'',
      defaultvarvalue45:'',
      flagfixins46:0,
      fixins46:'',
      defaultvarvalue46:'',
      day46:'',
      month46:'',
      year46:'',
    };

    this.openfixins44= this.openfixins44.bind(this);
    this.closefixins44= this.closefixins44.bind(this);
    this.handleChangefixins44= this.handleChangefixins44.bind(this);
    this.handleSubmitfixins44= this.handleSubmitfixins44.bind(this);
    this.openfixins45= this.openfixins45.bind(this);
    this.closefixins45= this.closefixins45.bind(this);
    this.handleChangefixins45= this.handleChangefixins45.bind(this);
    this.handleSubmitfixins45= this.handleSubmitfixins45.bind(this);
    this.openfixins46= this.openfixins46.bind(this);
    this.closefixins46= this.closefixins46.bind(this);
    this.handleChangefixins46= this.handleChangefixins46.bind(this);
    this.handleSubmitfixins46= this.handleSubmitfixins46.bind(this);
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
      defaultvarvalue44:this.props.varvalue44,
      defaultvarvalue45:this.props.varvalue45,
      defaultvarvalue46:this.props.varvalue46,
    })
  }
  handleSubmitfixins44(e){
    e.preventDefault();
    axios.post('/wealththaiinsurance/update/somecase?fixins44',{
      id:this.props.id,
      fixins44:this.state.fixins44,
    }).then(res=>{

      //console.log(res.data);
      this.setState({
        defaultvarvalue44:this.state.fixins44,
        flagfixins44:0,
      })
    });
  }
  handleChangefixins44(e){
    //console.log(e.target.value);
    this.setState({
      fixins44:e.target.value,
    })
  }
  openfixins44()
  {
    this.setState({
      flagfixins44:1
    })
  }
  closefixins44()
  {
    this.setState({
      flagfixins44:0
    })
  }
  fixins44()
  {
    if(this.state.flagfixins44 == 1)
    {
      return  <div> <form onSubmit={this.handleSubmitfixins44}><input onChange={this.handleChangefixins44} value={this.state.fixins44} class="form-control"/>&nbsp;&nbsp;&nbsp;<button type="submit"  class="btn btn-box-tool" ><span style={{color:'green'}}>บันทึก</span></button><button type="button" onClick={this.closefixins44}class="btn btn-box-tool" ><span style={{color:'red'}}>ยกเลิก</span></button></form></div>
    }
    else
    {
      return <div ><span style={{float:'left'}}>{this.state.defaultvarvalue44}</span> <span  style={{float:'right',color:'orange'}}  onClick={this.openfixins44}>แก้ไข</span></div>
    }
  }
  handleSubmitfixins45(e){
    e.preventDefault();
    axios.post('/wealththaiinsurance/update/somecase?fixins45',{
      id:this.props.id,
      fixins45:this.state.fixins45,
    }).then(res=>{
      //console.log(res.data);
      this.setState({
        defaultvarvalue45:this.state.fixins45,
        flagfixins45:0,
      })
    });
  }
  handleChangefixins45(e){
    //console.log(e.target.value);
    this.setState({
      fixins45:e.target.value,
    })
  }
  openfixins45()
  {
    this.setState({
      flagfixins45:1
    })
  }
  closefixins45()
  {
    this.setState({
      flagfixins45:0
    })
  }
  fixins45()
  {
    if(this.state.flagfixins45 == 1)
    {
      return  <div> <form onSubmit={this.handleSubmitfixins45}><input onChange={this.handleChangefixins45} value={this.state.fixins45} class="form-control"/>&nbsp;&nbsp;&nbsp;<button type="submit"  class="btn btn-box-tool" ><span style={{color:'green'}}>บันทึก</span></button><button type="button" onClick={this.closefixins45}class="btn btn-box-tool" ><span style={{color:'red'}}>ยกเลิก</span></button></form></div>
    }
    else
    {
      return <div ><span style={{float:'left'}}>{this.state.defaultvarvalue45}</span> <span  style={{float:'right',color:'orange'}}  onClick={this.openfixins45}>แก้ไข</span></div>
    }
  }

  handleSubmitfixins46(e){
    e.preventDefault();
    axios.post('/wealththaiinsurance/update/somecase?fixins46',{
      id:this.props.id,
      fixins46:this.state.day46+'/'+this.state.month46+'/'+this.state.year46,
    }).then(res=>{

      //console.log(res.data);
      this.setState({
        defaultvarvalue46:this.state.day46+'/'+this.state.month46+'/'+this.state.year46,
        flagfixins46:0,
      })
    });
  }
  handleChangefixins46(e){
    //console.log(e.target.value);
    this.setState({
      fixins46:e.target.value,
    })
  }
  openfixins46()
  {
    this.setState({
      flagfixins46:1
    })
  }
  closefixins46()
  {
    this.setState({
      flagfixins46:0
    })
  }
  fixins46(data)
  {
    if(this.state.flagfixins46 == 1)
    {
      return  <div> <form onSubmit={this.handleSubmitfixins46}>
      <select onChange={(e) => this.setState({ day46: e.target.value })} name="dayex">
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

        <select  onChange={(e) => this.setState({ month46: e.target.value })}>
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
      <select onChange={(e) => this.setState({ year46: e.target.value })}  >
      <option value ="">  ปี พ.ศ  </option>
      {
        this.state.year.map(
          data =>
          <option value={data}>{data}</option>
        )
        }
      </select>&nbsp;&nbsp;&nbsp;<button type="submit"  class="btn btn-box-tool" ><span style={{color:'green'}}>บันทึก</span></button><button type="button" onClick={this.closefixins46}class="btn btn-box-tool" ><span style={{color:'red'}}>ยกเลิก</span></button></form></div>
    }
    else
    {
      return <div ><span style={{float:'left'}}>{this.state.defaultvarvalue46}</span> <span  style={{float:'right',color:'orange'}}  onClick={this.openfixins46}>แก้ไข</span></div>
    }
  }
  copyact()
  {
    if(this.props.filepublicname == null || this.props.filepublicname == '' ||this.props.filepublicname == 'undefined')
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={"https://erp.wealththai.net/SecurityBroke/case/uploadfile/"+this.props.id+"/xxx/CG4CG/Case_Attachment?cat?CA47CA/blink/wealththaiinsurance/file/upload/successblink"} target="_blank" className="btn btn-default">อัพโหลด</a></th>
    }
    else
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp; <a href={'/SecurityBroke/showfile/' + this.props.fileid} target="_blank">{this.props.filepublicname}</a></th>
    }
  }
    render() {
      return (
        <div className="column22" id="tax">
        <div className={this.state.showall} style={{backgroundColor:'#F5F5F5'}}>
        <div className="box-header  ">
          <b className="box-title" data-widget="collapse">ภาษี</b>
          <br/>
          <br/>


           <table id="example2" className="table table-bordered table-hover dataTable" role="grid" aria-describedby="example2_info">
           <thead>
           <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
          <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>วันที่จัดส่ง  ภาษี</th>
            <th style={{backgroundColor:'white'}}>&nbsp;{this.props.companyname}</th>
          </tr>

         <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
        <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>Partner (Channel เดิม)	</th>
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
        <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>ไฟล์สำเนาภาษี</th>
        {this.copyact()}
        </tr>
         <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
        <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>วันที่ได้รับ ภาษี</th>
          <th style={{backgroundColor:'white'}}>&nbsp;</th>
        </tr>
         <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
        <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>วันที่ ภาษี หมดอาย (ใหม่)</th>
          <th style={{backgroundColor:'white'}}>&nbsp;</th>
        </tr>

         <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
        <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>{this.props.varname44}</th>
          <th style={{backgroundColor:'white'}}>{this.fixins44()}</th>
        </tr>
         <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
        <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>{this.props.varname45}</th>
          <th style={{backgroundColor:'white'}}>{this.fixins45()}</th>
        </tr>
        <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
       <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>{this.props.varname46}</th>
         <th style={{backgroundColor:'white'}}>{this.fixins46()}</th>
       </tr>
       <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
      <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}></th>
        <th style={{backgroundColor:'#F4F4F6'}}>&nbsp;</th>
      </tr>
        </thead>
        </table>
        </div>
        </div>
        </div>
        );
    }
}

if (document.getElementById('offertax')) {
  const component = document.getElementById('offertax');
  const props = Object.assign({}, component.dataset);
    ReactDOM.render(<OfferTax {...props}/>, component);
}
