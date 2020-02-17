@extends('system-mgmt.insurance.base')
@section('action-content')
    <!-- Main content -->

    <section class="content">

      <div class="box">
  <div class="box-header">
    <div class="row">
      <div class="col-sm-6">
        <a href="/wealththaiinsurance" class="btn btn-primary btn-margin">สร้างงานใหม่</a>
      </div>
    </div>
  </div>
  <!-- /.box-header -->
  <div class="box-body">
      <div class="row">


        <div class="col-sm-6"></div>
      </div>
    <div id="example2_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
      <div class="row">
        <div class="col-sm-12">

			<div style="overflow-x:auto;">
          <table style="font-size:16px" id="example2" class="table table-bordered table-hover dataTable" role="grid" aria-describedby="example2_info">
            <thead>

              <tr role="row">
                <th >สถานะงาน/ขั้นตอนงาน</th>
                <th style="width:80px">งานใหม่</th>
                <th style="width:80px">งานต่ออายุ</th>
                <th style="width:80px">ทั้งหมด</th>
                <th >เตือน</th>
              </tr>
            </thead>
            <tbody>

              @foreach($stage as $st)
              <tr class="table-tr" data-url="/wealththaiinsurance/all/cases?filterstage{{$st->id}}">
              <td>
                <a href="/wealththaiinsurance/all/cases?filterstage{{$st->id}}">{{$st->name}}</a>
              </td>
              @php
              $newcase = App\Cases::where('stage',$st->id)->whereNull('ref_previous_case')->get();
              $countnewcase = count($newcase);
              $oldcase = App\Cases::where('stage',$st->id)->whereNotNull('ref_previous_case')->get();
              $countoldcase = count($oldcase);
              $allcase = App\Cases::where('stage',$st->id)->get();
              $countallcase = count($allcase);
              @endphp
              <td>
                {{$countnewcase}}
              </td>
              <td>
                {{$countoldcase}}
              </td>
              <td>
                {{$countallcase}}
              </td>
              <td>

              </td>
            </tr>
            @endforeach
            <tr style="background-color:#01F346;">
              @php
              $newcaseall = App\Cases::whereNull('ref_previous_case')->get();
              $countnewcaseall = count($newcaseall);
              $oldcaseall = App\Cases::whereNotNull('ref_previous_case')->get();
              $countoldcaseall = count($oldcaseall);
              $allcaseall = App\Cases::all();
              $countallcaseall = count($allcaseall);
              @endphp
              <td>
                <a href="/wealththaiinsurance/all/cases">รวมงานทั้งหมด</a>
              </td>
              <td>
                {{$countnewcaseall}}
              </td>
              <td>
                {{$countoldcaseall}}
              </td>
              <td>
                {{$countallcaseall}}
              </td>
              <td>

              </td>
            </tr>
            </tbody>
            <tfoot>
              <tr>
                <th >สถานะงาน/ขั้นตอนงาน</th>
                <th >งานใหม่</th>
                <th >งานต่ออายุ</th>
                <th >ทั้งหมด</th>
                <th >เตือน</th>
              </tr>
            </tfoot>
          </table>
			</div>
        </div>
      </div>
      <div class="row">

        <div class="col-sm-7">
          <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /.box-body -->
</div>
    </section>

@endsection
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script>


$(function() {
  $('table.table').on("click", "tr.table-tr", function() {
    window.location = $(this).data("url");
    //alert($(this).data("url"));
  });
});
</script>
