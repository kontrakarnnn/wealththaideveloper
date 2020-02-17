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

export default class CaseHeader extends Component {

  constructor(){
    super();
    ////console.log(super());
    this.state = {
      visible : false,
      flagnoteprevcase:0,
      flagnotenextcase:0,
      flagnotefrommember:0,
      flagnotefrompartner:0,
      flagnotefromuser:0,
      defaultnoteprevcase:'',
      defaultnotenextcase:'',
      defaultnotefrommember:'',
      defaultnotefromuser:'',
      defaultnotefrompartner:'',
      noteprevcase:'',
      notenextcase:'',
      notefrommember:'',
      notefromuser:'',
      notefrompartner:'',
      confirmoffer:[],

    };
    this.opennoteprevcase = this.opennoteprevcase.bind(this);
    this.closenoteprevcase = this.closenoteprevcase.bind(this);
    this.handleSubmitnoteprevcase = this.handleSubmitnoteprevcase.bind(this);
    this.handleChangenoteprevcase = this.handleChangenoteprevcase.bind(this);
    this.opennotenextcase = this.opennotenextcase.bind(this);
    this.closenotenextcase = this.closenotenextcase.bind(this);
    this.opennotefrommember = this.opennotefrommember.bind(this);
    this.closenotefrommember = this.closenotefrommember.bind(this);
    this.opennotefrompartner = this.opennotefrompartner.bind(this);
    this.closenotefrompartner = this.closenotefrompartner.bind(this);
    this.opennotefromuser = this.opennotefromuser.bind(this);
    this.closenotefromuser = this.closenotefromuser.bind(this);
    this.handleSubmitnotenextcase = this.handleSubmitnotenextcase.bind(this);
    this.handleChangenotenextcase = this.handleChangenotenextcase.bind(this);
    this.handleSubmitnotefrommember = this.handleSubmitnotefrommember.bind(this);
    this.handleSubmitnotefrompartner = this.handleSubmitnotefrompartner.bind(this);
    this.handleChangenotefrommember = this.handleChangenotefrommember.bind(this);
    this.handleChangenotefrompartner = this.handleChangenotefrompartner.bind(this);
    this.handleChangenotefromuser = this.handleChangenotefromuser.bind(this);
    this.handleSubmitnotefromuser = this.handleSubmitnotefromuser.bind(this);


  }
  componentDidMount() {
    axios.get('/wealththaiinsurance/confirmoffer/load?filteroffer'+this.props.id).then(response=>{
      this.setState({confirmoffer:response.data});
        //console.log(this.state.confirmoffer);
    }).catch(errors=>{
      //console.log(errors);
    })
    this.setState({
        defaultnoteprevcase : this.props.prevnote,
        defaultnotenextcase : this.props.renewnote,
        defaultnotefrommember : this.props.membernote,
        defaultnotefromuser : this.props.usernote,
        defaultnotefrompartner : this.props.partnernote,

    });
  }

  openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }
    handleSubmitnoteprevcase(e){
      e.preventDefault();
      axios.post('/wealththaiinsurance/update/somecase?noteprevcase',{
        id:this.props.id,
        noteprevcase:this.state.noteprevcase,
      }).then(res=>{
        this.setState({
            defaultnoteprevcase : this.state.noteprevcase,
            flagnoteprevcase:0,
        });
      });
    }
    handleSubmitnotefrommember(e){
      e.preventDefault();
      axios.post('/wealththaiinsurance/update/somecase?notefrommember',{
        id:this.props.id,
        notefrommember:this.state.notefrommember,
      }).then(res=>{
        this.setState({
            defaultnotefrommember : this.state.notefrommember,
            flagnotefrommember:0,
        });
      });
      //console.log("Prevnote"+this.props.prevnote);
    }
    handleSubmitnotenextcase(e){
      e.preventDefault();
      axios.post('/wealththaiinsurance/update/somecase?notenextcase',{
        id:this.props.id,
        notenextcase:this.state.notenextcase,
      }).then(res=>{
        //console.log("Answer"+res.data);
        this.setState({
            defaultnotenextcase : this.state.notenextcase,
            flagnotenextcase:0,
        });
      });
    }
    handleSubmitnotefrompartner(e){
      e.preventDefault();
      axios.post('/wealththaiinsurance/update/somecase?notefrompartner',{
        id:this.props.id,
        notefrompartner:this.state.notefrompartner,
      }).then(res=>{
        //console.log("Answer"+res.data);
        this.setState({
            defaultnotefrompartner : this.state.notefrompartner,
            flagnotefrompartner:0,
        });
      });
    }
    handleSubmitnotefromuser(e){
      e.preventDefault();
      axios.post('/wealththaiinsurance/update/somecase?notefromuser',{
        id:this.props.id,
        notefromuser:this.state.notefromuser,
      }).then(res=>{
        //console.log("Answer"+res.data);
        this.setState({
            defaultnotefromuser : this.state.notefromuser,
            flagnotefromuser:0,
        });
      });
    }
    handleChangenoteprevcase(e){
      //console.log(e.target.value);
      this.setState({
        noteprevcase:e.target.value,
      })
    }
    handleChangenotenextcase(e){
      //console.log(e.target.value);
      this.setState({
        notenextcase:e.target.value,
      })
    }
    handleChangenotefrommember(e){
      //console.log(e.target.value);
      this.setState({
        notefrommember:e.target.value,
      })
    }
    handleChangenotefrompartner(e){
      //console.log(e.target.value);
      this.setState({
        notefrompartner:e.target.value,
      })
    }
    handleChangenotefromuser(e){
      //console.log(e.target.value);
      this.setState({
        notefromuser:e.target.value,
      })
    }


  notebutton()
  {
    if(this.props.prevnote != null ||this.props.prevnote != null ||this.props.renewnote != null ||this.props.membernote != null ||this.props.partnernote != null ||this.props.usernote != null )
    {
      return <a style={{float:'right',fontSize:'25px',color:'#00325d',padding:'10px'}}onClick={() => this.openModal()}  ><i className="fa fa-edit"><i style={{fontSize:'12px',color:'red',verticalAlign:'top'}} className="fa fa-asterisk"></i></i></a>
    }
    else
    {
      return <a style={{float:'right',fontSize:'25px',color:'#00325d',padding:'10px'}}onClick={() => this.openModal()}  ><i className="fa fa-edit"></i></a>

    }
  }
  noteprevcase()
  {
    if(this.state.flagnoteprevcase == 1)
    {
      return  <div> <form onSubmit={this.handleSubmitnoteprevcase}><textarea defaultValue={this.state.defaultnoteprevcase} onChange={this.handleChangenoteprevcase} className="form-control"></textarea><p><button type="submit"  className="btn btn-box-tool" ><span style={{color:'green'}}>บันทึก</span></button><button type="button" onClick={this.closenoteprevcase}className="btn btn-box-tool" ><span style={{color:'red'}}>ยกเลิก</span></button></p></form></div>
    }
    else
    {
      return <div ><textarea className="form-control" defaultValue={this.state.defaultnoteprevcase} readOnly></textarea> <p><button onClick={this.opennoteprevcase} type="button"  className="btn btn-box-tool" ><span style={{color:'orange'}}>แก้ไข</span></button></p></div>
    }
  }
  opennoteprevcase()
  {
    this.setState({
      flagnoteprevcase:1
    })
  }
  closenoteprevcase()
  {
    this.setState({
      flagnoteprevcase:0
    })
  }
  opennotenextcase()
  {
    this.setState({
      flagnotenextcase:1
    })
  }
  closenotenextcase()
  {
    this.setState({
      flagnotenextcase:0
    })
  }
  notenextcase()
  {
    if(this.state.flagnotenextcase == 1)
    {
      return  <div> <form onSubmit={this.handleSubmitnotenextcase}><textarea defaultValue={this.state.defaultnotenextcase} onChange={this.handleChangenotenextcase} className="form-control"></textarea><p><button type="submit"  className="btn btn-box-tool" ><span style={{color:'green'}}>บันทึก</span></button><button type="button" onClick={this.closenotenextcase}className="btn btn-box-tool" ><span style={{color:'red'}}>ยกเลิก</span></button></p></form></div>
    }
    else
    {
      return <div ><textarea className="form-control" defaultValue={this.state.defaultnotenextcase} readOnly></textarea> <p><button onClick={this.opennotenextcase} type="button"  className="btn btn-box-tool" ><span style={{color:'orange'}}>แก้ไข</span></button></p></div>
    }
  }
  opennotefrommember()
  {
    this.setState({
      flagnotefrommember:1
    })
  }
  closenotefrommember()
  {
    this.setState({
      flagnotefrommember:0
    })
  }
  notefrommember()
  {
    if(this.state.flagnotefrommember == 1)
    {
      return  <div> <form onSubmit={this.handleSubmitnotefrommember}><textarea defaultValue={this.state.defaultnotefrommember} onChange={this.handleChangenotefrommember} className="form-control"></textarea><p><button type="submit"  className="btn btn-box-tool" ><span style={{color:'green'}}>บันทึก</span></button><button type="button" onClick={this.closenotefrommember}className="btn btn-box-tool" ><span style={{color:'red'}}>ยกเลิก</span></button></p></form></div>
    }
    else
    {
      return <div ><textarea className="form-control" defaultValue={this.state.defaultnotefrommember} readOnly></textarea> <p><button onClick={this.opennotefrommember} type="button"  className="btn btn-box-tool" ><span style={{color:'orange'}}>แก้ไข</span></button></p></div>
    }
  }
  opennotefrompartner()
  {
    this.setState({
      flagnotefrompartner:1
    })
  }
  closenotefrompartner()
  {
    this.setState({
      flagnotefrompartner:0
    })
  }
  notefrompartner()
  {
    if(this.state.flagnotefrompartner == 1)
    {
      return  <div> <form onSubmit={this.handleSubmitnotefrompartner}><textarea defaultValue={this.state.defaultnotefrompartner} onChange={this.handleChangenotefrompartner} className="form-control"></textarea><p><button type="submit"  className="btn btn-box-tool" ><span style={{color:'green'}}>บันทึก</span></button><button type="button" onClick={this.closenotefrompartner}className="btn btn-box-tool" ><span style={{color:'red'}}>ยกเลิก</span></button></p></form></div>
    }
    else
    {
      return <div ><textarea className="form-control" defaultValue={this.state.defaultnotefrompartner} readOnly></textarea> <p><button onClick={this.opennotefrompartner} type="button"  className="btn btn-box-tool" ><span style={{color:'orange'}}>แก้ไข</span></button></p></div>
    }
  }
  opennotefromuser()
  {
    this.setState({
      flagnotefromuser:1
    })
  }
  closenotefromuser()
  {
    this.setState({
      flagnotefromuser:0
    })
  }
  notefromuser()
  {
    if(this.state.flagnotefromuser == 1)
    {
      return  <div> <form onSubmit={this.handleSubmitnotefromuser}><textarea defaultValue={this.state.defaultnotefromuser} onChange={this.handleChangenotefromuser} className="form-control"></textarea><p><button type="submit"  className="btn btn-box-tool" ><span style={{color:'green'}}>บันทึก</span></button><button type="button" onClick={this.closenotefromuser}className="btn btn-box-tool" ><span style={{color:'red'}}>ยกเลิก</span></button></p></form></div>
    }
    else
    {
      return <div ><textarea className="form-control" defaultValue={this.state.defaultnotefromuser} readOnly></textarea> <p><button onClick={this.opennotefromuser} type="button"  className="btn btn-box-tool" ><span style={{color:'orange'}}>แก้ไข</span></button></p></div>
    }
  }
  cancelbutton()
  {
    if(this.props.var130 == 1)
    {
      return <button style={{float:'right',padding:'10px'}} type="button"  className="btn btn-box-tool" ><span style={{color:'red',fontSize:'16px'}}>งานนี้ถูกยกเลิกแล้ว({this.props.canceldate})</span></button>
    }
    else
    {
      return <button style={{float:'right',padding:'10px'}} type="button" onClick={() => { if (window.confirm('คุณแน่ใจว่าจะยกเลิกงานนี้ ?')) this.cancelcase() } } className="btn btn-box-tool" ><span style={{color:'red',fontSize:'16px'}}>ยกเลิกงาน</span></button>
    }
  }
  cancelcase()
{

  axios.get('/wealththaiinsurance/cases/cancel?fromcase'+this.props.id).then(response=>{
    window.location.reload();
  }).catch(errors=>{
    //console.log(errors);
  })
}
renewbutton()
{
  if(this.props.renewcaseid == null || this.props.renewcaseid == '')
  {
    if(this.props.canceldate != '')
    {
      return     <button style={{float:'right',padding:'10px'}} type="button"  className="btn btn-box-tool" ><span style={{color:'green',fontSize:'16px'}}>ไม่สามารถต่ออายุงานได้</span></button>
    }
    else
    {
      return     <button style={{float:'right',padding:'10px'}} type="button"  className="btn btn-box-tool" onClick={() => { if (window.confirm('คุณต้องการต่ออายุงานนี้ ?')) this.renewcase() } }><span style={{color:'#00325d',fontSize:'16px'}}>ต่ออายุงาน</span></button>
    }
  }
  else
  {
    return     <button style={{float:'right',padding:'10px'}} type="button"  className="btn btn-box-tool" ><span style={{color:'green',fontSize:'16px'}}>งานนี้ถูกต่ออายุแล้ว</span></button>
  }
}
renewcase()
{
axios.get('/wealththaiinsurance/renew/case?fromcase'+this.props.id).then(response=>{
  window.location.reload();
}).catch(errors=>{
})
}
invoicebutton()
{
  if(this.state.confirmoffer.length > 0)
  {
    return <a style={{float:'right',padding:'10px'}}  target="_blank" href={"/wealththaiinsurance/cases/invoice/"+this.props.id} className="btn btn-default" ><span >สร้างใบแจ้งหนี้</span></a>
  }
  else
  {
    return
  }
}
    render() {
      return (
        <div>
        <a style={{float:'left',fontSize:'16px',color:'',padding:'10px'}} className="btn btn-primary" href="/wealththaiinsurance/all/cases" >กลับไปหน้าแรก</a>
        <a style={{float:'right',fontSize:'25px',color:'orange',padding:'10px'}} href={'/wealththaiinsurance/cases/edit/'+this.props.id} ><i className="fa fa-gear"></i></a>
        {this.notebutton()}
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        {this.cancelbutton()}
        {this.renewbutton()}
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        {this.invoicebutton()}

        <Modal visible={this.state.visible} width="600" height="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
            <div className="card ">
            <div className="card-header  ">
            <a style={{float:'right',color:'red',fontSize:'18px'}}  onClick={() => this.closeModal()}><i className="fa fa-close"></i></a>
                <h3>การจดบันทึก</h3>
                </div>
                <div className="card-body">
                <div className="column2fordis">
                <p><b>การจดบันทึกจากงานที่แล้ว</b></p>
                {this.noteprevcase()}
                </div>
                <div className="column2fordis">
                <p><b>การจดบันทึกไปยังงานใหม่</b></p>
                {this.notenextcase()}
                </div>
                <p>&nbsp;</p>

                <div className="column2fordis">
                <p><b>การจดบันทึกจากลูกค้า</b></p>
                {this.notefrommember()}
                </div>
                <div className="column2fordis">
                <p><b>การจดบันทึกจากผู้ให้คำปรึกษา</b></p>
                {this.notefrompartner()}
                </div>
                <p>&nbsp;</p>

                <div className="column2fordis">
                <p><b>การจดบันทึกจากผู้แจ้งงาน</b></p>
                {this.notefromuser()}
                </div>

                </div>

            </div>
        </Modal>
    <p>&nbsp;</p>
    <p>&nbsp;</p>

       <h4 style={{textAlign:'center'}}>{this.props.casename}</h4></div>


        );
    }
}

if (document.getElementById('caseheader')) {
  const component = document.getElementById('caseheader');
  const props = Object.assign({}, component.dataset);
    ReactDOM.render(<CaseHeader {...props}/>, component);
}
