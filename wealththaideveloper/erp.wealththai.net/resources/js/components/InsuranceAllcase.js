import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Dialog from 'react-dialog'
import Picky from 'react-picky';
import 'react-picky/dist/picky.css'; // Include CSS
import Modal from 'react-awesome-modal';

export default class InsuranceAllcase extends Component {

  constructor(){
    super();
    this.state = {
      cases:[],
    };

    this.rowclick = this.rowclick.bind(this);
  }

  componentDidMount(){

    //console.log(window.location.href);
    const url = window.location.href;
    if(url.includes('?filterstage') == true)
    {
      const split2 = url.split('?filterstage');
      //console.log(split2[1])
      //console.log("hi")
      axios.get('/wealththaiinsurance/cases/load?filterstage'+split2[1]).then(response=>{
        this.setState({cases:response.data});
          //console.log('cases'+response.data);
      }).catch(errors=>{
        //console.log(errors);
      })
    }
    else
    {
      axios.get('/wealththaiinsurance/cases/load').then(response=>{
        this.setState({cases:response.data});
          //console.log('cases');
      }).catch(errors=>{
        //console.log(errors);
      })
    }


  }

  rowclick(rowInfo){
    ////console.log(rowInfo.row.id);
    window.open('/wealththaiinsurance/cases/'+rowInfo.row.id+'/detail/show','_self');
  }

    render() {

      return (
            <div>

            <div>   <a style={{fontSize:'16px'}}href="/wealththaiinsurance/all/case/stage" >กลับไปหน้าหลัก</a><br/>
        <ReactTable
            filterable
            previousText= 'ก่อนหน้า'
            nextText= 'ถัดไป'
            loadingText= 'กำลังโหลด'
            NoDataComponent={() => "Loading.."}
            data={this.state.cases}
            getTrProps={(state, rowInfo) => ({
                      onClick: () =>this.rowclick(rowInfo)
                    })}
            className="-striped -highlight"
            columns={[{
                          Header: <p style={{fontSize:'18px'}}>ข้อมูลงาน</p>,

                          foldable: true,
                          columns: [{
                              Header: "รหัส",
                              accessor: "id"
                            },{
                              Header: "ประเภทงาน",
                              accessor: "case_type.name"
                            },{
                              Header: "ชื่องาน",
                              accessor: "name"
                            },{
                              Header: "สถานะ",
                              accessor: "stage.name"
                            },
                            {
                              Header: 'วันที่รับงาน',
                              accessor: 'case_created_date',
                            }]
                          },{
                          Header: <p style={{fontSize:'18px'}}>บุคคลเกี่ยวข้องกับงาน</p>,
                          foldable: true,
                          columns: [
                            {
                              Header: 'ผู้แจ้งงาน',
                              accessor: 'block.name',
                            },{
                              Header: "ผู้ประสานงาน",
                              accessor: "coordiantor.firstname"
                           },{
                             Header: "ผู้ให้คำปรึกษา",
                             accessor: "partner_block.name"
                          }]
                        },{
                        Header: <p style={{fontSize:'18px'}}>ข้อมูลลูกค้า</p>,
                        foldable: true,
                        columns: [{
                            Header: "ชื่อ",
                            accessor: "person.name"
                          },{
                            Header: "นามสกุล",
                            accessor: "person.lname"
                         }
                        ]
                      },{
                      Header: <p style={{fontSize:'18px'}}>ข้อมูลทรัพย์สินของลูกค้า</p>,
                      foldable: true,
                      columns: [{
                          Header: "ชื่อ",
                          accessor: "asset.name"
                        },{
                          Header: "ทะเบียน",
                          accessor: "asset.ref_name"
                       }
                      ]
                    }]
                      }

            /></div></div>
        );
    }
}

if (document.getElementById('insuranceallcase')) {
    ReactDOM.render(<InsuranceAllcase />, document.getElementById('insuranceallcase'));
}
