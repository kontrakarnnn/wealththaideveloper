<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Response;
use App\Portfolio;
use App\Department;
use App\Division;
use App\User;
use App\Person;
use App\Port_type;
use App\View;

use App\Block;
use App\Http\Controllers\SidebarController;

class PortTypeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('view');
    }
	     public function getArrayAlldBlock($currentstruc,$currentid,$notebook){

    $CurrentDivisions = Block::where('id', '=',$currentid )->get();
    $result =$notebook;
    $ChildDivisions = Block::whereIn('under_block',$currentid )->pluck('id');
    foreach ( $ChildDivisions as $Division => $get) {
      $nextblockID[$Division] = $get;
      $arraylength = sizeof($result);
      //$currentid=$currentid;
      $result[$arraylength]  = $nextblockID[$Division];
      $result = $this->getArrayAlldBlock($currentstruc,$nextblockID,$result);
      }

      return $result;
}

public function blockbtu($currentstruc2,$currentid2,$notebook2){

$CurrentDivisions = Block::where('under_block', '=', NULL )->pluck('id');
$result2 =$notebook2;
$ChildDivisions = Block::whereIn('id',$currentid2)->pluck('under_block');
//$ChildDivisions = Block::whereIn('under_block',$currentid2)->pluck('id'); topdown
//  $ChildDivisions = Block::whereIn('id',$currentid)->pluck('under_block');
//  $ChildDivisions = Block::whereIn('id',$CurrentDivisions )->pluck('id');
foreach ( $ChildDivisions as $Division => $get) {
  $nextblockID2[$Division] = $get;
  $arraylength = sizeof($result2);
  //$currentid=$currentid;
  $result2[$arraylength]  = $nextblockID2[$Division];
  $result2 = $this->blockbtu($currentstruc2,$nextblockID2,$result2);
  }

  return $result2;
}








    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

      //sidebar

    $tree = session()->get('tree');
    //sidebar
      $porttypes = Port_type::leftjoin('port_cat','port_types.port_cat','=','port_cat.id')
	  				->leftjoin('structure','port_cat.structure_id','=','structure.id')
		  ->select('port_types.*','port_cat.name as port_cat_name','structure.name as structure_name')->paginate(30);
	
      return view('system-mgmt/porttype/index', ['porttypes' => $porttypes,'tree'=>$tree]);
    }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function create()
     {

       //sidebar

   $tree = session()->get('tree');
   //sidebar

           $portcat = DB::table('port_cat')->get();
         return view('system-mgmt/porttype/create',['portcat'=>$portcat,'tree'=>$tree]);
     }

     /**
      * Store a newly created resource in storage.
      *
      * @param  \Illuminate\Http\Request  $request
      * @return \Illuminate\Http\Response
      */
     public function store(Request $request)
     {
         $this->validateInput($request);
          Port_type::create([
             'type' => $request['type'],
             'link' => $request['link'],
             'port_cat' => $request['port_cat'],
             'port_limit_value' => $request['port_limit_value'],
             'port_detail_label1' => $request['port_detail_label1'],
             'port_detail_label2' => $request['port_detail_label2'],
             'port_detail_label3' => $request['port_detail_label3'],
             'port_detail_label4' => $request['port_detail_label4'],
             'port_detail_label5' => $request['port_detail_label5'],
             'port_detail_label6' => $request['port_detail_label6'],
             'port_detail_label7' => $request['port_detail_label7'],
             'ref_link_name1' => $request['ref_link_name1'],
             'ref_link_name2' => $request['ref_link_name2'],
             'ref_link_name3' => $request['ref_link_name3'],
             'port_label_ref1' => $request['port_label_ref1'],
             'port_label_ref2' => $request['port_label_ref2'],
             'port_label_ref3' => $request['port_label_ref3'],

         ]);

         return redirect ('/admin/porttype');
     }

     /**
      * Display the specified resource.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function show($id)
     {
       //sidebar

       $tree = session()->get('tree');
       //sidebar
         $porttypes = DB::table('port_types')->where('port_types.id',$id)
         ->leftJoin('port_cat', 'port_types.port_cat', '=', 'port_cat.id')
         ->select('port_types.*','port_cat.name as portcat_name','port_cat.id as portcat_id')
         ->get();
        // return $porttypes;
         return view('system-mgmt/porttype/show',['porttypes'=>$porttypes,'tree' => $tree]);
     }

     /**
      * Show the form for editing the specified resource.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function edit($id)
     {
       //sidebar

         $tree = session()->get('tree');
         //sidebar


         $porttype = Port_type::find($id);
         // Redirect to country list if updating country wasn't existed
         if ($porttype == null) {
           $porttype = Port_type::find($id);
           $data = array(
               'porttype' => $porttype
             );
             return redirect ('/admin/porttype');
         }

          $portcat = DB::table('port_cat')->get();
         return view('system-mgmt/porttype/edit', ['portcat' => $portcat,'porttype' => $porttype,'tree'=>$tree]);
     }

     /**
      * Update the specified resource in storage.
      *
      * @param  \Illuminate\Http\Request  $request
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function update(Request $request, $id)
     {
         $porttype = Port_type::findOrFail($id);
         $input = [
           'type' => $request['type'],
           'link' => $request['link'],
           'port_cat' => $request['port_cat'],
           'port_limit_value' => $request['port_limit_value'],
           'port_detail_label1' => $request['port_detail_label1'],
           'port_detail_label2' => $request['port_detail_label2'],
           'port_detail_label3' => $request['port_detail_label3'],
           'port_detail_label4' => $request['port_detail_label4'],
           'port_detail_label5' => $request['port_detail_label5'],
           'port_detail_label6' => $request['port_detail_label6'],
           'port_detail_label7' => $request['port_detail_label7'],
           'ref_link_name1' => $request['ref_link_name1'],
           'ref_link_name2' => $request['ref_link_name2'],
           'ref_link_name3' => $request['ref_link_name3'],
           'port_label_ref1' => $request['port_label_ref1'],
           'port_label_ref2' => $request['port_label_ref2'],
           'port_label_ref3' => $request['port_label_ref3'],

         ];
         $this->validate($request, [
         'type' => 'required|max:60'
         ]);
         Port_type::where('id', $id)
             ->update($input);

         return redirect ('/admin/porttype');
     }

     /**
      * Remove the specified resource from storage.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function destroy($id)
     {
         Port_type::where('id', $id)->delete();
          return redirect ('/admin/porttype');
     }

     /**
      * Search country from database base on some specific constraints
      *
      * @param  \Illuminate\Http\Request  $request
      *  @return \Illuminate\Http\Response
      */


     public function search(Request $request) {

       //sidebar

     $tree = session()->get('tree');
     //sidebar


         $constraints = [
             'type' => $request['type']

             ];

        $porttypes = $this->doSearchingQuery($constraints);
        return view('system-mgmt/porttype/index', ['porttypes' => $porttypes, 'searchingVals' => $constraints,'tree'=>$tree]);
     }

     private function doSearchingQuery($constraints) {
         $query = Port_type::query();
         $fields = array_keys($constraints);
         $index = 0;
         foreach ($constraints as $constraint) {
             if ($constraint != null) {
                 $query = $query->where( $fields[$index], 'like', '%'.$constraint.'%');
             }

             $index++;
         }
         return $query->paginate(1000);
     }
     private function validateInput($request) {
         $this->validate($request, [
         'type' => 'required|max:60|unique:port_types',

     ]);
     }
 }
