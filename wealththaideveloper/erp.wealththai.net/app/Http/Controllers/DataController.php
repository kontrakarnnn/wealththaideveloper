<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Structure;
use Illuminate\Support\Facades\Auth;
use App\Block;
use App\View;
use App\Viewper;
use Session;
use App\User_auth;
use App\Partner_block;
use App\Partner_auth;
use App\match_id;
use App\match_member_id;
use App\match_pid_id;
use App\match_partner_group;
class DataController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

	     public function getArrayAlldBlock($currentstruc,$currentid,$notebook){

    //$CurrentDivisions = Block::where('id', '=',$currentid )->get();
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
public function getAlldBlock($currentid,$menudepth,$notebook){


		if(count([$currentid]) == 0){
			$CurrentDivisions = Block::where('id', '=',[0] )->get();

		}
		else{
			$CurrentDivisions = Block::where('id', '=',$currentid )->get();
		}

		$count = $menudepth;
		$result ='<ul>';
		$tree='<ul id="browser" class="filetree"><li class="tree-view"></li>';

	 /* @foreach(App\Structure::whereIn('id',$currentstruc)->get(); as $depList)
		<li><a href="{{url('portfolio')}}/{{$depList->name}}">
			{{$depList->name}}</a></li>
		@endforeach*/

		foreach ($CurrentDivisions as $Division) {
			$tree .='<li class="tree-view closed"<a  class="tree-name">'.$Division->name.'</a>';

			$status = $Division->status;
			if($count == 0){
					 $result .='<li class="tree-view closed"><a  href="'.$Division->name.   ' "class="tree-name">'.$Division->name.'</a>'.' Category current Block ID is  :' .$currentid.'count:'.$count;

			}else{
						$result .='<li class="tree-view closed"><a href="'.$Division->name.   ' ">'.$Division->name.   ' <b>Status:</b> '.$status.'</a>';
			}

		}
		 $count++;
		 if(count([$currentid]) == 0){
	 $ChildDivisions = Block::where('under_block', '=',[0] )->get();
 }
 	else
	{
		$ChildDivisions = Block::where('under_block', '=',$currentid )->get();

	}
	 foreach ($ChildDivisions as $Division) {
				$status = $Division->status;
				$nextblockID = $Division->id;
				if($status== 1){
						$result .= $this->getAlldBlock($nextblockID,$count,$notebook);
						$result   .="</li>";
				}else{
							$result .=$this->getAlldBlock($nextblockID,$count,$notebook);
				}
			//  $tree .='<li class="tree-view closed"<a class="tree-name">'.$Division->name.'Status: '.$status.'</a>';

	 }
	 $result .="</ul>";
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
public function mymember(){
	//sidebar

	$tree = session()->get('tree');
	//sidebar

	$current = Auth::user()->id;


	$currentid = DB::table('user_auths')

					->where([ //[ 'structure_id', '=', 10 ],
										[ 'user_id', '=', $current]

								 ])
								 ->pluck('block_id');


								 $currentstruc = DB::table('user_auths')

												 ->where([
																	 [ 'user_id', '=', $current]

																])
																->pluck('structure_id');
										 $currentstruc = $currentstruc->toArray();
$menudepth = 0;
$notebook = array();

$trees='<ul id="browser" class="filetree"><li class="tree-view"></li>';
$trees .=$this->getAlldBlock($currentid,$menudepth,$notebook);
$notebook = $this->getArrayAlldBlock($currentstruc,$currentid,$notebook);

$trees .='<ul>';
$block =




$i=0;


$current = Auth::user()->id;


 $currentid = DB::table('user_auths')

				 ->where(//[ 'structure_id', '=',9 ],
									 'user_id', '=',$current

								)
								->pluck('block_id');
						$currentid = $currentid->toArray();






$current = Auth::user()->id;


$currentstruc = DB::table('user_auths')

				->where([ //[ 'structure_id', '=',9 ],
									[ 'user_id', '=', $current]

							 ])
							 ->pluck('structure_id');
		$currentstruc = $currentstruc->toArray();
		//  echo "<pre>";
		//  print_r($currentstruc);
		$persons = DB::table('persons');
$notebook = array();
$notebook = $this->getArrayAlldBlock($currentstruc,$currentid,$notebook);
$notebook = array_merge_recursive($currentid,$notebook);

$current = Auth::user()->id;
$curmem = DB::table('portfolio')

			 ->whereIn('block_id',$notebook)

							->pluck('member_id');

							 $curmem = $curmem->toArray();
							 $persons = DB::table('persons')
							 ->whereIn('persons.id',$curmem)
						 ->leftJoin('member_type', 'persons.type', '=', 'member_type.id')
						->select('persons.*', 'member_type.name as memtype_name', 'member_type.id as memtype_id')
						->orderBy('created_at', 'desc')

							 ->paginate(30);
							// return $mymember;
							 return $curmem;
}

public function getblockid()
{
	$current = Auth::user()->id;
	$block = User_auth::where('user_id',$current)->pluck('block_id')->toArray();
	return $block;
}
public function getpartnerblockid()
{
//	$current = Auth::user()->id;
	$block = Partner_auth::where('user_id',$current)->pluck('block_id')->toArray();
	return $block;
}
public function findpublicidinpartnerblock($partnerblock)
{
	$partnerblock = Partner_block::where('id',$partnerblock)->value('id');
	$partnerid = Partner_auth::where('block_id',$partnerblock)->value('partner_id');
	$publicid = match_id::where('partner_id',$partnerid)->value('id');
	return $publicid;
}

public function findpublicidinuserblock($userblock)
{
	$userblock = Block::where('id',$userblock)->value('id');
	$userid = User_auth::where('block_id',$userblock)->value('user_id');
	$publicid = match_id::where('user_id',$userid)->value('id');
	return $publicid;
}
public function findpublicidinuserid($userid)
{
	$publicid = match_id::where('user_id',$userid)->value('id');
	return $publicid;
}
public function findpublicidinuseridnoinputuserid()
{
	$userid = Auth::user()->id;
	$publicid = match_id::where('user_id',$userid)->value('id');
	return $publicid;
}
public function findpublicidinguildid($guildid)
{
	$memberid = match_member_id::where('member_group_id',$guildid)->pluck('member_id')->toArray();
	$publicid = match_id::whereIn('member_id',$memberid)->pluck('id')->toArray();
	return $publicid;
}
public function findpublicidinpartnergroup($partnergroupid)
{
	$memberid = match_partner_group::where('partner_group_id',$partnergroupid)->pluck('partner_id')->toArray();
	$publicid = match_id::whereIn('partner_id',$memberid)->pluck('id')->toArray();
	return $publicid;
}
public function findpublicidinpidgroup($pidgroupid)
{
	$publicid = match_pid_id::where('pid_group_id',$pidgroupid)->pluck('p_id')->toArray();
	return $publicid;
}
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
		 public function findunderblock($blockstartid)
		 {
		 //  $notebook = array();
			 $notebook =[];
			array_push($notebook,$blockstartid);
			$block = Block::where('under_block',$blockstartid)->get();
			 foreach ($block as $view) {

						if(count($view->childs)) {
							array_push($notebook,$view->id);
							$notebook = $this->childblock($view,$notebook);
					 }
			 }
			return array_unique($notebook);
		 }
		 public function childblock($view,$notebook)
		 {

			 foreach ($view->childs as $arr) {

					 if(count($arr->childs)){
									 array_push($notebook,$arr->id);
									 $notebook = $this->childblock($arr,$notebook);
							 }
							 array_push($notebook,$arr->id);


			 }
			 return $notebook;
		 }
}
