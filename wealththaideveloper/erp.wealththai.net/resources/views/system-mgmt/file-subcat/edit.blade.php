@extends('system-mgmt.file-subcat.base')


@section('action-content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Update File Category</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ route('file-subcat.update', ['id' => $event->id]) }}">
                        <input type="hidden" name="_method" value="PATCH">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">


                        <div class="form-group{{ $errors->has('structure_id') ? ' has-error' : '' }}">
                      <label class="col-md-4 control-label">File Category Group</label>
                        <div class="col-md-6">
                          <select class=" form-control department" name="cat_group_id">

                              <option value="" >-Select-</option>
                              @foreach ($filecatgroup as $ser)
                                  <option value="{{$ser->id}}"{{$ser->id == $event->cat_group_id ? 'selected' : ''}}>{{$ser->name}}</option>
                              @endforeach

                          </select>
                 </div>
                        </div>

                        <div class="form-group{{ $errors->has('structure_id') ? ' has-error' : '' }}">
                      <label class="col-md-4 control-label">File Category</label>
                        <div class="col-md-6">
                          <select class=" form-control department" name="cat_id">

                              <option value="" >-Select-</option>
                              @foreach ($filecatgroup as $ser)
                                  <option value="{{$ser->id}}"{{$ser->id == $event->cat_id ? 'selected' : ''}}>{{$ser->name}}</option>
                              @endforeach

                          </select>
                 </div>
                        </div>




                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">name</label>

                            <div class="col-md-6">
                                <input class="form-control" id="message-text" name="name" value = "{{$event->name}}">
                            </div>
                        </div>


                        <div class="form-group{{ $errors->has('description') ? ' has-error' : '' }}">
                            <label for="description" class="col-md-4 control-label">description</label>

                            <div class="col-md-6">
                                <input class="form-control" id="message-text" name="description" value = "{{$event->description}}">
                            </div>
                        </div>




                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Update
                                </button>

                          </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>


@endsection
