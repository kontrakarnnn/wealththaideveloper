@extends('system-mgmt.match-view-partner.base')

@section('action-content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Add View Authentication Partner</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ route('match-view-partner.store') }}">
                        {{ csrf_field() }}

                        <div class="form-group">
                            <label class="col-md-4 control-label">View</label>
                            <div class="col-md-6">
                              <select class="form-control" name="view_id"  id="nameid">
                                <option></option>
                                @foreach($views as $view)
                                <option value="{{$view->id}}">{{$view->name}}</option>
                                @endforeach
                              </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Structure</label>
                            <div class="col-md-6">
                              <select class="form-control block" name="structure_id"  id="nameid2">
                                <option></option>
                                @foreach($partnerstructure as $pid_group)
                                <option value="{{$pid_group->id}}">{{$pid_group->name}}</option>
                                @endforeach
                              </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block_id</label>
                            <div class="col-md-6">
                              <select class="form-control block" name="block_id"  id="nameid2">
                                <option></option>
                                @foreach($partnerblock as $pid_group)
                                <option value="{{$pid_group->id}}">{{$pid_group->name}}</option>
                                @endforeach
                              </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block_td</label>
                            <div class="col-md-6">
                              <select class="form-control block" name="block_td"  id="nameid2">
                                <option></option>
                                @foreach($partnerblock as $pid_group)
                                <option value="{{$pid_group->id}}">{{$pid_group->name}}</option>
                                @endforeach
                              </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block_btu</label>
                            <div class="col-md-6">
                              <select class="form-control block" name="block_btu"  id="nameid2">
                                <option></option>
                                @foreach($partnerblock as $pid_group)
                                <option value="{{$pid_group->id}}">{{$pid_group->name}}</option>
                                @endforeach
                              </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">pid_group</label>
                            <div class="col-md-6">
                              <select class="form-control block" name="pid_group_id"  id="nameid2">
                                <option></option>
                                @foreach($pid_groups as $pid_group)
                                <option value="{{$pid_group->id}}">{{$pid_group->name}}</option>
                                @endforeach
                              </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Partner Group</label>
                            <div class="col-md-6">
                              <select class="form-control" name="partner_group_id"  id="partid">
                                <option></option>
                                @foreach($partnergroup as $pid_group)
                                <option value="{{$pid_group->id}}">{{$pid_group->name}}</option>
                                @endforeach
                              </select>
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-md-4 control-label">Partner</label>
                            <div class="col-md-6">
                              <select class="form-control" name="partner_id"  id="memid">
                                <option></option>
                                @foreach($members as $member)
                                <option value="{{$member->id}}">{{$member->name}} {{$member->lname}}</option>
                                @endforeach
                              </select>
                            </div>
                        </div>






                        <div class="form-group">

                                          <label class="col-md-4 control-label"></label>
                                          <div class="col-md-6">
                                    <input type="checkbox"  name="all_partner" value="Yes"> All Partner<br>
                                        </div>
                                        </div>


                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Create
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>


<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>

<script type="text/javascript">

      $("#nameid").select2({
            placeholder: "Select a Name",
            allowClear: true
        });
</script>
<script type="text/javascript">

      $("#nameid2").select2({
            placeholder: "Select a Name",
            allowClear: true
        });
</script>
<script type="text/javascript">

      $("#nameid3").select2({
            placeholder: "Select a Name",
            allowClear: true
        });
</script>
<script type="text/javascript">

      $("#nameid4").select2({
            placeholder: "Select a Name",
            allowClear: true
        });
</script>
<script type="text/javascript">

      $("#nameid5").select2({
            placeholder: "Select a Name",
            allowClear: true
        });
</script>

<script type="text/javascript">

      $("#memid").select2({
            placeholder: "Select a Name",
            allowClear: true
        });
</script>

<script type="text/javascript">

      $("#partid").select2({
            placeholder: "Select a Name",
            allowClear: true
        });
</script>

<script type="text/javascript">

      $(".block").select2({
            placeholder: "Select a Name",
            allowClear: true
        });
</script>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        $(document).on('change','.department',function(){
        //  console.log("hmm its change");

            var department_id=$(this).val();
            //console.log(department_id);
            var div=$(this).parent();
            var op=" ";
            $.ajax({
                type:'get',
                url:'{!!URL::to('findDivisionName')!!}',
                data:{'id':department_id},

                success:function(data){
                  console.log('success');

                  console.log(data);

                 console.log(data.length);
                  op+='<option value="0" selected disabled>chose Block</option>';
                  for(var i=0; i<data.length;i++){
                    op+='<option value="'+data[i].id+'">'+data[i].name+'</option>';

                  }
                  div.find('.name').html(" ");
                  div.find('.name').append(op);

                },
                error:function(){

                }
            });
        });
    });
</script>
@endsection
