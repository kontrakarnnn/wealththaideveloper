@extends('system-mgmt.subdistrict.base')

@section('action-content')
<div class="container">

    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Add new subdistrict</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ route('district.store') }}">
                        {{ csrf_field() }}


        <div class="form-group">
                  <label class="col-md-4 control-label">District</label>
                    <div class="col-md-6">
                      <select class=" form-control department" name="district_id">

                        <option value="0" >-Select-</option>
                          @foreach ($structures as $structure)
                          <option value="{{$structure->id}}">{{$structure->name_in_thai}}</option>
                          @endforeach

                          </select>

                            </div>
                          </div>
                        <div class="form-group{{ $errors->has('code') ? ' has-error' : '' }}">
                            <label for="code" class="col-md-4 control-label">Code</label>

                            <div class="col-md-6">
                                <input id="code" type="text" class="form-control" name="code" value="{{ old('code') }}" required autofocus>

                                @if ($errors->has('code'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('code') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('name_in_thai') ? ' has-error' : '' }}">
                            <label for="name_in_thai" class="col-md-4 control-label">Subdistrict Name In Thai</label>

                            <div class="col-md-6">
                                <input id="name_in_thai" type="text" class="form-control" name="name_in_thai" value="{{ old('name_in_thai') }}" required autofocus>

                                @if ($errors->has('name_in_thai'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name_in_thai') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group{{ $errors->has('name_in_english') ? ' has-error' : '' }}">
                            <label for="name_in_english" class="col-md-4 control-label">Subdistrict Name In English</label>

                            <div class="col-md-6">
                                <input id="name_in_english" type="text" class="form-control" name="name_in_english" value="{{ old('name_in_english') }}" required autofocus>

                                @if ($errors->has('name_in_english'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name_in_english') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group{{ $errors->has('latitude') ? ' has-error' : '' }}">
                            <label for="latitude" class="col-md-4 control-label">Latitude</label>

                            <div class="col-md-6">
                                <input id="latitude" type="text" class="form-control" name="latitude" value="{{ old('latitude') }}" required autofocus>

                                @if ($errors->has('latitude'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('latitude') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group{{ $errors->has('longitude') ? ' has-error' : '' }}">
                            <label for="longitude" class="col-md-4 control-label">Longitude</label>

                            <div class="col-md-6">
                                <input id="longitude" type="text" class="form-control" name="longitude" value="{{ old('longitude') }}" required autofocus>

                                @if ($errors->has('longitude'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('longitude') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group{{ $errors->has('zip_code') ? ' has-error' : '' }}">
                            <label for="zip_code" class="col-md-4 control-label">Zip Code</label>

                            <div class="col-md-6">
                                <input id="zip_code" type="text" class="form-control" name="zip_code" value="{{ old('zip_code') }}" required autofocus>

                                @if ($errors->has('zip_code'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('zip_code') }}</strong>
                                    </span>
                                @endif
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
