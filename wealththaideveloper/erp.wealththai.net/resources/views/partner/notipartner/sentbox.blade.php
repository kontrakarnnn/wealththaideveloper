@extends('partner.notipartner.base')
@section('action-content')
    <!-- Main content -->
    <section class="content">
      <div class="box">
  <div class="box-header">
    <div class="row">
        <div class="col-sm-8">
          <h3 class="box-title">List of Message</h3>
        </div>
        <div class="col-sm-4">
          <a class="btn btn-primary" href="{{ route('messagecenter-partner.create') }}">Add New</a>
        </div>
    </div>
  </div>
  <!-- /.box-header -->
  <div class="box-body">
      <div class="row">
        <div class="col-sm-6"></div>
        <div class="col-sm-6"></div>
      </div>
      <form method="POST" action="{{ route('messagecenter-partner.searchsentbox') }}">
         {{ csrf_field() }}
         @component('layouts.search', ['title' => 'Search'])
          @component('layouts.two-cols-date-search-row', ['items' => ['From', 'To'],
          'oldVals' => [isset($searchingVals) ? $searchingVals['from'] : '', isset($searchingVals) ? $searchingVals['to'] : '']])
          @endcomponent
         @endcomponent
      </form>
    <div id="example2_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
      <div class="row">
        <div class="col-sm-12">
          <div style="overflow-x:auto;">
              <table id="example2" class="table  table-hover dataTable" role="grid" aria-describedby="example2_info">
                <thead>
                  <tr role="row">
                    <th   tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="port: activate to sort column ascending">Name</th>
                                      <th   tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="port: activate to sort column ascending">Message</th>
                      <th   tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="port: activate to sort column ascending">Date</th>
					  <th   tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="port: activate to sort column ascending"></th>
                  </tr>
                </thead>
                <tbody>

                @foreach ($notis as $noti)



                <tr class="table-tr" data-url="{{ URL::to('/wealththaipartner/messagecenter-partner/show',$noti->id)}}">


                    <td style ="font-weight:bold;" >  {{ $noti->created_name}}</td>
                          <td >  {{ $noti->message_type_name }}</td>
                          <td >  {{ $noti->created_at }}</td>
					        <td>
                <form class="row" method="POST" action="{{ route('noti.destroy', ['id' => $noti->id]) }}" onsubmit = "return confirm('Are you sure?')">
                    <input type="hidden" name="_method" value="DELETE">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">

                    <button type="submit" class="btn btn-danger btn-margin">
                      Delete
                    </button>
                </form>
              </td>





                    <div class="row">
      <div class="col-md-4 col-lg-2">

            {{--}}  <td>
                      <form class="row" method="POST" action="{{ route('noti.destroy', ['id' => $noti->id]) }}" onsubmit = "return confirm('Are you sure?')">
                          <input type="hidden" name="_method" value="DELETE">
                          <input type="hidden" name="_token" value="{{ csrf_token() }}">

                          <a class="btn btn-warning " href="{{ URL::to('system-management/show',$noti->id)}}">
                              View
                            </a>
                          <a href="{{ route('noti.edit', ['id' => $noti->id]) }}" class="btn btn-warning ">
                          Update
                          </a>
                          <a class="btn btn-warning" href="{{ URL::to('system-management/reply',$noti->id)}}">
                              Reply
                            </a>

                            <a class="btn btn-warning  " href="{{ URL::to('system-management/forward',$noti->id)}}">
                                Forward
                              </a>

                      </form>
                    </td>--}}
                  </div>
                </div>


                </tr>

                @endforeach
                </tbody>

              </table>
    			</div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5">
          <div class="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1 to {{count($notis)}} of {{count($notis)}} entries</div>
        </div>
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
    <!-- /.content -->

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
