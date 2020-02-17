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

export default class CasePayment extends Component {

  constructor(){
    super();
    ////console.log(super());
    this.state = {
      fixpaymentdetailflag:0,
      casepaymentcolumn:0,
      showall:'box collapsed-box',
      varvalue28:'',
      varvalue29:'',
      varvalue26:'',
      varvalue27:'',
      varvalue30:'',
      varvalue31:'',
      varvalue32:'',
      varvalue33:'',
      varvalue34:'',
    };
    this.openfixpaymentdetail= this.openfixpaymentdetail.bind(this);
    this.closefixpaymentdetail= this.closefixpaymentdetail.bind(this);
    this.columnchangecasepayment= this.columnchangecasepayment.bind(this);
    this.columnchangecasepaymentdefault= this.columnchangecasepaymentdefault.bind(this);
    this.submitcasepayment= this.submitcasepayment.bind(this);

  }
  componentDidMount() {

    const url = window.location.href;
    if(url.includes('?mode=open') == true)
    {
        this.setState({casepaymentcolumn:1});
    }
    else
    {
      this.setState({casepaymentcolumn:0});
    }
  }
  submitcasepayment(e){
    e.preventDefault();
    axios.post('/wealththaiinsurance/update/casepayment',{
      id:this.props.id,
      varvalue26:this.state.varvalue26,
      varvalue27:this.state.varvalue27,
      varvalue28:this.state.varvalue28,
      varvalue29:this.state.varvalue29,
      varvalue30:this.state.varvalue30,
      varvalue31:this.state.varvalue31,
      varvalue32:this.state.varvalue32,
      varvalue33:this.state.varvalue33,
      varvalue34:this.state.varvalue34,
      varvalue35:this.state.varvalue35,
      varvalue36:this.state.varvalue36,
      varvalue37:this.state.varvalue37,

    }).then(res=>{

      //console.log(res.data);
      this.setState({
        fixpaymentdetailflag:0,
      })
      window.location.reload();
    });
  }
  insurancepaymentcopy()
  {
    if(this.props.insurancecopypaymentfilepublicname == null || this.props.insurancecopypaymentfilepublicname == '' ||this.props.insurancecopypaymentfilepublicname == 'undefined')
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={"https://erp.wealththai.net/SecurityBroke/case/uploadfile/"+this.props.id+"/xxx/CG4CG/Case_Attachment?cat?CA50CA/blink/wealththaiinsurance/cases/"+this.props.id+"/detail/showblink"} target="_blank" class="btn btn-default">อัพโหลด</a></th>
    }
    else
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={'/SecurityBroke/showfile/' +this.props.insurancecopypaymentfileid} target="_blank">{this.props.insurancecopypaymentfilepublicname}</a></th>
    }
  }
  insurancepaymentcopytocompany()
  {
    if(this.props.insurancepaymenttocompanycopyfilepublicname == null || this.props.insurancepaymenttocompanycopyfilepublicname == '' ||this.props.insurancepaymenttocompanycopyfilepublicname == 'undefined')
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={"https://erp.wealththai.net/SecurityBroke/case/uploadfile/"+this.props.id+"/xxx/CG4CG/Case_Attachment?cat?CA54CA/blink/wealththaiinsurance/cases/"+this.props.id+"/detail/showblink"} target="_blank" class="btn btn-default">อัพโหลด</a></th>
    }
    else
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={'/SecurityBroke/showfile/' +this.props.insurancepaymenttocompanycopyfileid} target="_blank">{this.props.insurancepaymenttocompanycopyfilepublicname}</a></th>
    }
  }
  actpaymentcopy()
  {
    if(this.props.actcopypaymentfilepublicname == null || this.props.actcopypaymentfilepublicname == '' ||this.props.actcopypaymentfilepublicname == 'undefined')
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={"https://erp.wealththai.net/SecurityBroke/case/uploadfile/"+this.props.id+"/xxx/CG4CG/Case_Attachment?cat?CA51CA/blink/wealththaiinsurance/cases/"+this.props.id+"/detail/showblink"} target="_blank" class="btn btn-default">อัพโหลด</a></th>
    }
    else
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={'/SecurityBroke/showfile/' +this.props.actcopypaymentfileid} target="_blank">{this.props.actcopypaymentfilepublicname}</a></th>
    }
  }
  actpaymentcopytocompany()
  {
    if(this.props.actpaymenttocompanycopyfilepublicname == null || this.props.actpaymenttocompanycopyfilepublicname == '' ||this.props.actpaymenttocompanycopyfilepublicname == 'undefined')
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={"https://erp.wealththai.net/SecurityBroke/case/uploadfile/"+this.props.id+"/xxx/CG4CG/Case_Attachment?cat?CA55CA/blink/wealththaiinsurance/cases/"+this.props.id+"/detail/showblink"} target="_blank" class="btn btn-default">อัพโหลด</a></th>
    }
    else
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={'/SecurityBroke/showfile/' +this.props.actpaymenttocompanycopyfileid} target="_blank">{this.props.actpaymenttocompanycopyfilepublicname}</a></th>
    }
  }
  taxpaymentcopy()
  {
    if(this.props.taxcopypaymentfilepublicname == null || this.props.taxcopypaymentfilepublicname == '' ||this.props.taxcopypaymentfilepublicname == 'undefined')
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={"https://erp.wealththai.net/SecurityBroke/case/uploadfile/"+this.props.id+"/xxx/CG4CG/Case_Attachment?cat?CA52CA/blink/wealththaiinsurance/cases/"+this.props.id+"/detail/showblink"} target="_blank" class="btn btn-default">อัพโหลด</a></th>
    }
    else
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={'/SecurityBroke/showfile/' +this.props.taxcopypaymentfileid} target="_blank">{this.props.taxcopypaymentfilepublicname}</a></th>
    }
  }
  taxpaymentcopytocompany()
  {
    if(this.props.taxpaymenttocompanycopyfilepublicname == null || this.props.taxpaymenttocompanycopyfilepublicname == '' ||this.props.taxpaymenttocompanycopyfilepublicname == 'undefined')
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={"https://erp.wealththai.net/SecurityBroke/case/uploadfile/"+this.props.id+"/xxx/CG4CG/Case_Attachment?cat?CA56CA/blink/wealththaiinsurance/cases/"+this.props.id+"/detail/showblink"} target="_blank" class="btn btn-default">อัพโหลด</a></th>
    }
    else
    {
      return  <th style={{backgroundColor:'white'}}>&nbsp;<a href={'/SecurityBroke/showfile/' +this.props.taxpaymenttocompanycopyfileid} target="_blank">{this.props.taxpaymenttocompanycopyfilepublicname}</a></th>
    }
  }
  columnchangecasepaymentdefault()
  {
    this.setState({
      casepaymentcolumn:0

    })
  }
  columnchangecasepayment()
  {
    this.setState({
      casepaymentcolumn:1

    })
  }
  openfixpaymentdetail()
  {
    this.setState({
        fixpaymentdetailflag : 1,
    });
  }

  closefixpaymentdetail()
  {
    this.setState({
          fixpaymentdetailflag : 0,
      });
  }
  detailorfix()
  {
    if(this.state.fixpaymentdetailflag == 0)
    {

    return <div className="column" id="paymentdetail" >
    <div className="box " style={{backgroundColor:'#CDCDCD'}}>
    <div className="box-header  ">
      <b className="box-title" >รายละเอียดการชำระเงิน</b>
      <br/>
      <br/>
      <div className="box-tools pull-right">
      <button type="button" onClick={this.openfixpaymentdetail} className="btn btn-box-tool" ><i style={{color:'orange'}} className="fa fa-gear"></i></button>
        <button type="button" onClick={this.columnchangecasepaymentdefault} className="btn btn-box-tool" ><i className="fa fa-minus"></i></button>
      </div>
    </div>
    <div className="box-body" >
    <div className="column4">
    <table id="example2" className="table table-bordered table-hover dataTable" role="grid" aria-describedby="example2_info">
    <thead>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th colSpan="2" style={{backgroundColor:'white',width:'200px',height:'',textAlign:'center',fontSize:'20px'}}>ข้อมูลกรมธรรม์</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>{this.props.varname28}</th>
     <th style={{backgroundColor:'white'}}>{this.props.varvalue28}</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>{this.props.varname29}</th>
     <th style={{backgroundColor:'white'}}>{this.props.varvalue29}</th>
   </tr>
     <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}  >{this.props.varname26}</th>
      <th style={{backgroundColor:'white'}}>{this.props.varvalue26}</th>

    </tr>

    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>บริษััทประกันที่เลือก(ใหม่)กรมธรรม์</th>
     <th style={{backgroundColor:'white'}}>{this.props.insurancecompanyname}</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>เบี้ยรวมหน้าตั๋ว</th>
     <th style={{backgroundColor:'white'}}>{this.props.insurancepremium}</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ยอดหัก ณ ที่จ่าย * (ถ้ามีค่า)</th>
     <th style={{backgroundColor:'white'}}>{this.props.insurancetaxdeduction}</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ส่วนลดพิเศษทั้งหมด </th>
     <th style={{backgroundColor:'white'}}>{this.props.alldiscountinsurance}</th>
   </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>{this.props.varname32}</th>
    <th style={{backgroundColor:'white'}}>{this.props.varvalue32}</th>
  </tr>
  <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
 <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>{this.props.varname35}</th>
   <th style={{backgroundColor:'white'}}>{this.props.varvalue35}</th>
 </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ลูกค้าต้องจ่ายก่อนหัก ณ ที่จ่าย   (Customer)</th>
    <th style={{backgroundColor:'white'}}>{this.props.calculatebeforetaxdeductinsurance}</th>
  </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ลูกค้าต้องจ่ายหลังหัก ณ ที่จ่าย   (Customer)</th>
    <th style={{backgroundColor:'white'}}>{this.props.calculateaftertaxdeductinsurance}</th>
  </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ให้คำปรึกษา/แนะนำ ต้องจ่ายให้แก่บริษัท  (Partner) </th>
    <th style={{backgroundColor:'white'}}>{this.props.totalpaidpartnerinsurance}</th>
  </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ผู้ให้บริการ ต้องจ่ายให้แก่บริษัท  (User) *</th>
    <th style={{backgroundColor:'white'}}>{this.props.totalpaiduserinsurance}</th>
  </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่บริษัทต้องโอนไปบริษัทประกัน (Company) *</th>
    <th style={{backgroundColor:'white'}}>{this.props.totalpaidcompanyinsurance}</th>
  </tr>
  <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
 <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>เอกสารชำระเงิน กรมธรรม์</th>
 {this.insurancepaymentcopy()}
 </tr>
 <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
<th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>เอกสารชำระเงินไปยังบริษัทประกัน</th>
{this.insurancepaymentcopytocompany()}
</tr>
    </thead>

    </table>
    </div>
    <div className="column4">
    <table id="example2" className="table table-bordered table-hover dataTable" role="grid" aria-describedby="example2_info">
    <thead>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th colSpan="2" style={{backgroundColor:'white',width:'200px',height:'',textAlign:'center',fontSize:'20px'}}>ข้อมูลพรบ.</th>
   </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}></th>
    <th style={{backgroundColor:'white'}}></th>
  </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>{this.props.varname27}</th>
   <th style={{backgroundColor:'white'}}>{this.props.varvalue27}</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>{this.props.varname30}</th>
     <th style={{backgroundColor:'white'}}>{this.props.varvalue30}</th>
   </tr>


    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>บริษััทประกันที่เลือก(ใหม่)พรบ</th>
     <th style={{backgroundColor:'white'}}>{this.props.actcompanyname}</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>เบี้ยรวมหน้าตั๋ว</th>
     <th style={{backgroundColor:'white'}}>{this.props.actpremium}</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ยอดหัก ณ ที่จ่าย * (ถ้ามีค่า)</th>
     <th style={{backgroundColor:'white'}}>{this.props.acttaxdeduction}</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ส่วนลดพิเศษทั้งหมด </th>
     <th style={{backgroundColor:'white'}}>{this.props.alldiscountact}</th>
   </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>{this.props.varname33}</th>
    <th style={{backgroundColor:'white'}}>{this.props.varvalue33}</th>
  </tr>
  <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
 <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>{this.props.varname36}</th>
   <th style={{backgroundColor:'white'}}>{this.props.varvalue36}</th>
 </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ลูกค้าต้องจ่ายก่อนหัก ณ ที่จ่าย   (Customer)</th>
    <th style={{backgroundColor:'white'}}>{this.props.calculatebeforetaxdeductact}</th>
  </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ลูกค้าต้องจ่ายหลังหัก ณ ที่จ่าย   (Customer)</th>
    <th style={{backgroundColor:'white'}}>{this.props.calculateaftertaxdeductact}</th>
  </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ให้คำปรึกษา/แนะนำ ต้องจ่ายให้แก่บริษัท  (Partner) </th>
    <th style={{backgroundColor:'white'}}>{this.props.totalpaidpartneract}</th>
  </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ผู้ให้บริการ ต้องจ่ายให้แก่บริษัท  (User) *</th>
    <th style={{backgroundColor:'white'}}>{this.props.totalpaiduseract}</th>
  </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่บริษัทต้องโอนไปบริษัทประกัน (Company) *</th>
    <th style={{backgroundColor:'white'}}>{this.props.totalpaidcompanyact}</th>
  </tr>
  <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
 <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>เอกสารชำระเงิน พรบ.</th>
  {this.actpaymentcopy()}
 </tr>
 <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
<th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>เอกสารชำระเงินไปยังบริษัทประกัน</th>
  {this.actpaymentcopytocompany()}
</tr>
    </thead>

    </table>
    </div>
    <div className="column4">
    <table id="example2" className="table table-bordered table-hover dataTable" role="grid" aria-describedby="example2_info">
    <thead>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th colSpan="2" style={{backgroundColor:'white',width:'200px',height:'',textAlign:'center',fontSize:'20px'}}>ข้อมูลภาษี</th>
   </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>&nbsp;</th>
   <th style={{backgroundColor:'white'}}>&nbsp;</th>
   </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>&nbsp;</th>
   <th style={{backgroundColor:'white'}}>&nbsp;</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>{this.props.varname31}</th>
     <th style={{backgroundColor:'white'}}>{this.props.varvalue31}</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>บริษััทประกันที่เลือก(ใหม่)ภาษี</th>
     <th style={{backgroundColor:'white'}}>{this.props.taxcompanyname}</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>เบี้ยรวมหน้าตั๋ว</th>
     <th style={{backgroundColor:'white'}}>{this.props.taxpremium}</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ยอดหัก ณ ที่จ่าย * (ถ้ามีค่า)</th>
     <th style={{backgroundColor:'white'}}>{this.props.taxtaxdeduction}</th>
   </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
   <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ส่วนลดพิเศษทั้งหมด </th>
     <th style={{backgroundColor:'white'}}>{this.props.alldiscounttax}</th>
   </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>{this.props.varname34}</th>
    <th style={{backgroundColor:'white'}}>{this.props.varvalue34}</th>
  </tr>


  <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
 <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>{this.props.varname37}</th>
   <th style={{backgroundColor:'white'}}>{this.props.varvalue37}</th>
 </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ลูกค้าต้องจ่ายก่อนหัก ณ ที่จ่าย   (Customer)</th>
    <th style={{backgroundColor:'white'}}>{this.props.calculatebeforetaxdeducttax}</th>
  </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ลูกค้าต้องจ่ายหลังหัก ณ ที่จ่าย   (Customer)</th>
    <th style={{backgroundColor:'white'}}>{this.props.calculateaftertaxdeducttax}</th>
  </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ให้คำปรึกษา/แนะนำ ต้องจ่ายให้แก่บริษัท  (Partner) </th>
    <th style={{backgroundColor:'white'}}>{this.props.totalpaidpartnertax}</th>
  </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ผู้ให้บริการ ต้องจ่ายให้แก่บริษัท  (User) *</th>
    <th style={{backgroundColor:'white'}}>{this.props.totalpaidusertax}</th>
  </tr>
   <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
  <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่บริษัทต้องโอนไปบริษัทประกัน (Company) *</th>
    <th style={{backgroundColor:'white'}}>{this.props.totalpaidcompanytax}</th>
  </tr>
  <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
 <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>เอกสารชำระเงิน ภาษี</th>
 {this.taxpaymentcopy()}
 </tr>
 <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
<th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>เอกสารชำระเงินไปยังบริษัทประกัน</th>
{this.taxpaymentcopytocompany()}
</tr>
    </thead>

    </table>
    </div>
    <div className="column4">
    <table id="example2" className="table table-bordered table-hover dataTable" role="grid" aria-describedby="example2_info">
    <thead>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
    <th colSpan="2" style={{backgroundColor:'#72EB00',width:'200px',height:'',textAlign:'center',fontSize:'20px'}}>รวม</th>
    </tr>
    <tr style={{border:'0.5px solid #F4F4F6',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>&nbsp;</th>
    <th style={{backgroundColor:'white'}}>&nbsp;</th>
    </tr>
    <tr style={{border:'0.5px solid #F4F4F6',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>&nbsp;</th>
    <th style={{backgroundColor:'white'}}>&nbsp;</th>
    </tr>
    <tr style={{border:'0.5px solid #F4F4F6',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>&nbsp;</th>
    <th style={{backgroundColor:'white'}}>&nbsp;</th>
    </tr>
    <tr style={{border:'0.5px solid #F4F4F6',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>&nbsp;</th>
    <th style={{backgroundColor:'white'}}>&nbsp;</th>
    </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#72EB00',width:'50%',height:'100px',textAlign:'center'}}>เบี้ยรวมหน้าตั๋ว(รวม)</th>
     <th style={{backgroundColor:'#72EB00'}}>{this.props.allpremium}</th>
    </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#72EB00',width:'50%',height:'100px',textAlign:'center'}}>ยอดหัก ณ ที่จ่าย * (รวม)</th>
     <th style={{backgroundColor:'#72EB00'}}>{this.props.alltaxdeduct}</th>
    </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#72EB00',width:'50%',height:'100px',textAlign:'center'}}>ส่วนลดพิเศษทั้งหมด (รวม) </th>
     <th style={{backgroundColor:'#72EB00'}}>{this.props.alldiscount}</th>
    </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>&nbsp;</th>
    <th style={{backgroundColor:'white'}}>&nbsp;</th>
    </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'100px',textAlign:'center'}}>&nbsp;</th>
    <th style={{backgroundColor:'white'}}>&nbsp;</th>
    </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#72EB00',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ลูกค้าต้องจ่ายก่อนหัก ณ ที่จ่าย (Customer)</th>
    <th style={{backgroundColor:'#72EB00'}}>{this.props.allcalculatebeforetaxdeduct}</th>
    </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#72EB00',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ลูกค้าต้องจ่ายหลังหัก ณ ที่จ่าย (Customer)</th>
    <th style={{backgroundColor:'#72EB00'}}>{this.props.allcalculateaftertaxdeduct}</th>
    </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#72EB00',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ให้คำปรึกษา/แนะนำ ต้องจ่ายให้แก่บริษัท  (Partner) </th>
    <th style={{backgroundColor:'#72EB00'}}>{this.props.alltotalpaidpartner}</th>
    </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#72EB00',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่ผู้ให้บริการ ต้องจ่ายให้แก่บริษัท  (User) *</th>
    <th style={{backgroundColor:'#72EB00'}}>{this.props.alltotalpaiduser}</th>
    </tr>
    <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#72EB00',width:'50%',height:'100px',textAlign:'center'}}>ค่าใช้จ่ายสุทธิที่บริษัทต้องโอนไปบริษัทประกัน (Company) *</th>
    <th style={{backgroundColor:'#72EB00'}}>{this.props.alltotalpaidcompany}</th>
    </tr>

    </thead>

    </table>
    </div>
    </div>
    </div>
    </div>
    }
    else
    {
      return <form onSubmit={this.submitcasepayment}>
      <div class="column" id="paymentdetail">
      <div class="box " style={{backgroundColor:'#FFE0BE'}}>
      <div class="box-header  ">
        <b class="box-title" >รายละเอียดการชำระเงิน</b>
        <br/>
        <br/>
        <div class="box-tools pull-right">
        <button type="submit" class="btn btn-box-tool" ><span style={{color:'green'}} >บันทึก</span></button>
        <button type="button" onClick={this.closefixpaymentdetail}class="btn btn-box-tool" ><span style={{color:'red'}} >ยกเลิก</span></button>
          <button type="button" onClick={this.columnchangecasepaymentdefault} class="btn btn-box-tool" ><i class="fa fa-minus"></i></button>
        </div>
      </div>
      <div class="box-body" >
      <div class="columnshow2">
      <table id="example2" class="table table-bordered table-hover dataTable" role="grid" aria-describedby="example2_info">
      <thead>
      <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
     <th style={{backgroundColor:'#F4F4F6',width:'200px',height:'60px'}}>{this.props.varname28}</th>
       <th style={{backgroundColor:'white'}}><input style={{width:'150px'}}class="form-control" onChange={(e) => this.setState({ varvalue28: e.target.value })} value={this.state.varvalue28}/></th>
     </tr>
      <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
     <th style={{backgroundColor:'#F4F4F6',width:'200px',height:'60px'}}>{this.props.varname29}</th>
       <th style={{backgroundColor:'white'}}><input style={{width:'150px'}}class="form-control" onChange={(e) => this.setState({ varvalue29: e.target.value })} value={this.state.varvalue29}/></th>
     </tr>
       <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
      <th style={{backgroundColor:'#F4F4F6',width:'200px',height:'60px'}}  >{this.props.varname26}</th>
        <th style={{backgroundColor:'white'}}><input style={{width:'150px'}}class="form-control" onChange={(e) => this.setState({ varvalue26: e.target.value })} value={this.state.varvalue26}/></th>
      </tr>
       <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
      <th style={{backgroundColor:'#F4F4F6',width:'200px',height:'60px'}}>{this.props.varname27}</th>
        <th style={{backgroundColor:'white'}}><input style={{width:'150px'}}class="form-control" onChange={(e) => this.setState({ varvalue27: e.target.value })} value={this.state.varvalue27}/></th>
      </tr>

       <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
      <th style={{backgroundColor:'#F4F4F6',width:'200px',height:'60px'}}>{this.props.varname30}</th>
        <th style={{backgroundColor:'white'}}><input style={{width:'150px'}}class="form-control" onChange={(e) => this.setState({ varvalue30: e.target.value })} value={this.state.varvalue30}/></th>
      </tr>
      <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
     <th style={{backgroundColor:'#F4F4F6',width:'200px',height:'60px'}}>{this.props.varname31}</th>
       <th style={{backgroundColor:'white'}}><input style={{width:'150px'}}class="form-control" onChange={(e) => this.setState({ varvalue31: e.target.value })} value={this.state.varvalue31}/></th>
     </tr>
      </thead>

      </table>
      </div>
      <div class="columnshow2">
      <table id="example2" class="table table-bordered table-hover dataTable" role="grid" aria-describedby="example2_info">
      <thead>

       <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
      <th style={{backgroundColor:'#F4F4F6',width:'200px',height:'60px'}}>{this.props.varname32}</th>
        <th style={{backgroundColor:'white'}}><input style={{width:'150px'}}class="form-control" onChange={(e) => this.setState({ varvalue32: e.target.value })} value={this.state.varvalue32}/></th>
      </tr>
       <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
      <th style={{backgroundColor:'#F4F4F6',width:'200px',height:'60px'}}>{this.props.varname33}</th>
        <th style={{backgroundColor:'white'}}><input style={{width:'150px'}}class="form-control" onChange={(e) => this.setState({ varvalue33: e.target.value })} value={this.state.varvalue33}/></th>
      </tr>
       <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
      <th style={{backgroundColor:'#F4F4F6',width:'200px',height:'60px'}}>{this.props.varname34}</th>
        <th style={{backgroundColor:'white'}}><input style={{width:'150px'}}class="form-control" onChange={(e) => this.setState({ varvalue34: e.target.value })} value={this.state.varvalue34}/></th>
      </tr>
       <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
      <th style={{backgroundColor:'#F4F4F6',width:'200px',height:'60px'}}>{this.props.varname35}</th>
        <th style={{backgroundColor:'white'}}>
        <select onChange={(e) => this.setState({ varvalue35: e.target.value })} style={{width:'150px'}} class="form-control">
        <option value ="" selected={this.state.varvalue35 == null ? 'selected' : ''}>  กรุณาเลือก </option>
        <option value ="0" selected={this.state.varvalue35 == '0' ? 'selected' : ''}>  ตัด Net  </option>
        <option value ="1" selected={this.state.varvalue35 == '1' ? 'selected' : ''}>  รับคอมมิชชั่นทีหลัง  </option>
        </select>
        </th>
      </tr>
       <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
      <th style={{backgroundColor:'#F4F4F6',width:'200px',height:'60px'}}>{this.props.varname36}</th>
        <th style={{backgroundColor:'white'}}>
        <select onChange={(e) => this.setState({ varvalue36: e.target.value })} style={{width:'150px'}} class="form-control">
        <option value ="" selected={this.state.varvalue36 == null ? 'selected' : ''}>  กรุณาเลือก </option>
        <option value ="0" selected={this.state.varvalue36 == '0' ? 'selected' : ''}>  ตัด Net  </option>
        <option value ="1" selected={this.state.varvalue36 == '1' ? 'selected' : ''}>  รับคอมมิชชั่นทีหลัง  </option>
        </select>
        </th>
      </tr>
      <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
     <th style={{backgroundColor:'#F4F4F6',width:'200px',height:'60px'}}>{this.props.varname37}</th>
       <th style={{backgroundColor:'white'}}>
       <select onChange={(e) => this.setState({ varvalue37: e.target.value })} style={{width:'150px'}} class="form-control">
       <option value ="" selected={this.state.varvalue37 == null ? 'selected' : ''}>  กรุณาเลือก </option>
       <option value ="0" selected={this.state.varvalue37 == '0' ? 'selected' : ''}>  ตัด Net  </option>
       <option value ="1" selected={this.state.varvalue37 == '1' ? 'selected' : ''}>  รับคอมมิชชั่นทีหลัง  </option>
       </select>
       </th>

     </tr>
      </thead>

      </table>
      </div>
      </div>
      </div>
      </div>
      </form>
    }
  }
  showdetail()
  {
    if(this.state.casepaymentcolumn === 0)
    {
    return <div className="column2" id="paymentdetail">
    <div className={this.state.showall} style={{backgroundColor:'#F5F5F5'}}>
    <div className="box-header  ">
      <b className="box-title" >รายละเอียดการชำระเงิน</b>
      <br/>
      <br/>
       <table id="example2" className="table table-bordered table-hover dataTable" role="grid" aria-describedby="example2_info">
       <thead>
       <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
      <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>{this.props.varname28}</th>
        <th style={{backgroundColor:'white'}}>{this.props.varvalue28}</th>
      </tr>
       <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
      <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>{this.props.varname51}</th>
        <th style={{backgroundColor:'white'}}>{this.props.varvalue51}</th>
      </tr>
      <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
     <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>{this.props.varname52}</th>
       <th style={{backgroundColor:'white'}}>{this.props.varvalue52}</th>
     </tr>
     <tr style={{border:'0.5px solid #E3E3E3',backgroundColor:'#F4F4F6'}}>
    <th style={{backgroundColor:'#F4F4F6',width:'50%',height:'70px',textAlign:'center'}}>{this.props.varname53}</th>
      <th style={{backgroundColor:'white'}}>{this.props.varvalue53}</th>
    </tr>
      </thead>
       </table>
      <div className="box-tools pull-right">
        <button type="button" onClick={this.columnchangecasepayment} className="btn btn-box-tool" ><i className="fa fa-plus"></i></button>
      </div>
    </div>

    </div>
    </div>
  }
    else
    {
      return <div>{this.detailorfix()}</div>
    }
  }
    render() {
      return (
        <div>{this.showdetail()}</div>
        );
    }
}

if (document.getElementById('casepayment')) {
  const component = document.getElementById('casepayment');
  const props = Object.assign({}, component.dataset);
    ReactDOM.render(<CasePayment {...props}/>, component);
}
