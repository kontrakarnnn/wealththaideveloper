<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\View;
use App\Block;
use App\User_auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\SidebarController;
use App\Cases;
use App\Offer;
use App\Casemiddledata;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
      //  $this->middleware('view');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */


    public function index()
    {
    /*  return  $offer =  Offer::rightjoin('case_middle_data','case_middle_data.offer_id','offer.id')
                          ->rightjoin('portfolio','case_middle_data.port_id','portfolio.id')
                          ->join('block','portfolio.block_id','block.id')
                          ->select([DB::raw("SUM(offer_payment_value1) as total_premium"),'offer.*','case_middle_data.*','portfolio.type','block.name'])
                          ->groupBy('case_middle_data.port_id')
        ->get();*/
      /*  $input = [
            'port_id' => '843',

        ];
        Casemiddledata::where('port_id', 833)
            ->update($input);*/
            return  $offer =  Cases::rightjoin('block','cases.service_user_block_id','block.id')
            ->rightjoin('structure','block.structure_id','structure.id')
            ->rightjoin('block as block_under','block.under_block','block_under.id')
            ->select([DB::raw("COUNT(service_user_block_id) as total_case"),'block.name','block_under.name as block_under_name'])
              ->groupBy('block.id')->orderBy('total_case','DESC')
              ->get();

            return  $offer =  Offer::rightjoin('proposal','offer.proposal_id','proposal.id')
              ->rightjoin('cases','proposal.case_id','cases.id')
              ->rightjoin('case_middle_data','case_middle_data.case_id','cases.id')
              ->rightjoin('block','cases.service_user_block_id','block.id')
              ->rightjoin('block as block_under','block.under_block','block_under.id')
              ->select([DB::raw("SUM(offer_payment_value19) as total_premium"),'block.id','block.name','block_under.name as under_block_name'])
              ->groupBy('block.id')->orderBy('total_premium','DESC')
              ->get();
            //////////////
            return  $offer =  Offer::rightjoin('proposal','offer.proposal_id','proposal.id')
              ->rightjoin('cases','proposal.case_id','cases.id')
              ->rightjoin('case_middle_data','case_middle_data.case_id','cases.id')
              ->rightjoin('persons','cases.member_case_owner','persons.id')
              ->rightjoin('portfolio','portfolio.id','case_middle_data.port_id')
              ->rightjoin('block','portfolio.block_id','block.id')
              ->select([DB::raw("SUM(offer_payment_value1) as total_premium"),'persons.name','persons.lname','portfolio.type as port_name','portfolio.id as port_id','block.name as blockportname'])
              ->groupBy('portfolio.id')->orderBy('total_premium','DESC')
              ->get();
              //////////////////
  /*  return  $offer =  Cases::rightjoin('persons','cases.member_case_owner','persons.id')
    //  ->select([DB::raw("COUNT(member_case_owner) as total_case"),'persons.name','persons.lname','portfolio.type as port_name','portfolio.id as port_id','block.name as blockportname','cases.id as case_id'])
    ->select([DB::raw("COUNT(member_case_owner) as total_case"),'persons.name','persons.lname'])
      ->groupBy('persons.id')->orderBy('total_case','DESC')
      ->get();*/
////////////
/*return  $offer =  Cases::rightjoin('portfolio','portfolio.member_id','cases.member_case_owner')
  ->rightjoin('persons','persons.id','portfolio.member_id')
  ->rightjoin('block','portfolio.block_id','block.id')
  ->rightjoin('proposal','proposal.case_id','cases.id')
  ->rightjoin('case_middle_data','proposal.case_id','cases.id')
  ->rightjoin('offer','offer.proposal_id','proposal.id')
//  ->select([DB::raw("COUNT(member_case_owner) as total_case"),'persons.name','persons.lname','portfolio.type as port_name','portfolio.id as port_id','block.name as blockportname','cases.id as case_id'])
->select([DB::raw("SUM(offer.offer_payment_value1) as total_case"),'offer.name as offer_name','block.name as block_port_name','portfolio.id as port_id','portfolio.type as port_name','persons.name','persons.lname'])
  ->groupBy('portfolio.id')->orderBy('total_case','DESC')
  ->get();*/
  return  $offer =  Cases::rightjoin('block','cases.service_user_block_id','block.id')
  ->rightjoin('structure','block.structure_id','structure.id')
  ->rightjoin('block as block_under','block.under_block','block_under.id')
  ->select([DB::raw("COUNT(service_user_block_id) as total_case"),'block.name','block_under.name as block_under_name'])
    ->groupBy('block.id')->orderBy('total_case','DESC')
    ->get();

  return  $offer =  Cases::rightjoin('block','cases.service_user_block_id','block.id')
  ->rightjoin('structure','block.structure_id','structure.id')
  ->rightjoin('block as block_under','block.under_block','block_under.id')
  ->select([DB::raw("COUNT(service_user_block_id) as total_case"),'block.name','block_under.name as block_under_name'])
    ->groupBy('block.id')->orderBy('total_case','DESC')
    ->get();

return  $offer =  Cases::rightjoin('persons','cases.member_case_owner','persons.id')
//  ->select([DB::raw("COUNT(member_case_owner) as total_case"),'persons.name','persons.lname','portfolio.type as port_name','portfolio.id as port_id','block.name as blockportname','cases.id as case_id'])
->select([DB::raw("COUNT(member_case_owner) as total_case"),'persons.name','persons.lname'])
  ->groupBy('persons.id')->orderBy('total_case','DESC')
  ->get();
      /*$hive_count = DB::table('case_middle_data')
              //    ->where('active','true')
                  ->join('offer', 'case_middle_data.offer_id', '=', 'offer.id')
                  ->groupBy('offer_id')
                  ->selectRaw('sum(offer.offer_payment_value1) as sum, case_middle_data.* ')
                  ->orderBy('sum','DESC')->get();
                  return $hive_count;*/
      return Casemiddledata::join('offer', 'case_middle_data.offer_id', '=', 'offer.id')
        ->select([DB::raw("SUM(offer.offer_payment_value1) as total_premium"),'case_middle_data.*'])
        ->get();
      $casemid = Casemiddledata::with(['offer','cases','cases.person'])->get()->groupBy("port_id");

      return $casemid;
      foreach($casemid as $key => $ca)
      {
         foreach($ca as $c)
         {
           return $c;
         }
      }
      $offer = DB::table('offer')->whereIn('proposal_id',['47','28'])
      ->orderByRaw(DB::raw("SUM(offer_payment_value1)"))->get();

      return $offer;
        $case  = DB::table('cases')
        ->Join('proposal','proposal.case_id','cases.id')
        ->Join('offer','offer.proposal_id','proposal.id')
        ->select('cases.*','proposal.id','offer.id')
        ->get()->groupBy('member_case_owner');
      //  return $case;
          $casemiddledata = DB::table('case_middle_data')->select('case_middle_data.*','offer.offer_payment_value4 as netpremium ','cases.member_case_owner as member_id',DB::raw('(SELECT SUM(offer_payment_value4) FROM offer WHERE id = offer_id) as balance'))

        ->leftJoin('offer','case_middle_data.offer_id','offer.id')
        ->leftJoin('cases','case_middle_data.case_id','cases.id')

        ->get()->groupBy('member_id');
        /*$customers = User::select("*",
                   \DB::raw('(SELECT SUM(amount) FROM customer_balances WHERE customer_balances.customer_id = customers.id) as balance'))
            ->orderBy('balance', 'DESC')
            ->get()
            ->toArray();*/

        return $casemiddledata;

        return view('dashboard');
    }


}
