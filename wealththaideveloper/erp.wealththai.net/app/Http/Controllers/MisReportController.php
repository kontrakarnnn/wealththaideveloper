<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\View;
use App\Block;
use App\Cases;
use App\User_auth;
use App\Stage;
use App\Casemiddledata;
use Excel;
use App\Structure;
use App\Person;
use App\Offer;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\DataController;
class MisReportController extends Controller
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

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getstructure()
    {
      return Structure::all();
    }
    public function teamperformance()
    {
      $cases = Cases::all();
      $i = 0;
        return view('system-mgmt/insurance/misreport/teamperformance',compact('cases','i'));
    }
    public function loadcase()
    {
      return Cases::all();
    }
    public function getblock()
    {
      return Block::all();
    }
    public function filterblock(Request $res)
    {
      if($res->fromdate == '//'||$res->todate == '//'||$res->blockid == '')
      {
        return '';
      }
      $blockid = $res->blockid;
      $checkunderblock = $res->underblock;
      $fromdate = $res->fromdate;
      $todate = $res->todate;
      if($checkunderblock == 1)
      {
        $datacontoller = New DataController();
        $blockstartid = $res->blockid;
        $underblock = $datacontoller->findunderblock($blockstartid);
        $tempStr = implode(',', $underblock);
        $block = Block::with(['Cases','Structure','belongtoblock'])
        ->whereIn('id', $underblock)
        ->orderByRaw(DB::raw("FIELD(id, $tempStr)"))
        ->get();
        return $block;
      }
      else
      {
        $cases = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->where('service_user_block_id',$res->blockid)->get();
        $block = Block::with(['Cases','Structure','belongtoblock'])->where('id',$blockid)->get();
        return $block;
      }

    }
    public function filtercase(Request $res)
    {
      if($res->fromdate == '//'||$res->todate == '//'||$res->blockid == '')
      {
        return '';
      }
      $blockid = $res->blockid;
      $checkunderblock = $res->underblock;
      $fromdate = $res->fromdate;
      $todate = $res->todate;
      if($checkunderblock == 1)
      {
        $datacontoller = New DataController();
        $blockstartid = $res->blockid;
        $underblock = $datacontoller->findunderblock($blockstartid);
        $block = Block::with(['Cases','Structure','belongtoblock'])->whereIn('id',$underblock)->get();
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$underblock)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {


          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }
        $cases = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$array)
        ->pluck('id')->toArray();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->get();
        return $casemiddle;
      }
      else
      {
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->where('service_user_block_id',$res->blockid)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {
          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }

        $block = Block::with(['Cases','Structure','belongtoblock'])->where('id',$blockid)->get();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->get();
        return $casemiddle;
      }

    }
    public function filteruser(Request $res)
    {
      if($res->fromdate == '//'||$res->todate == '//'||$res->blockid == '')
      {
        return '';
      }
      $blockid = $res->blockid;
      $checkunderblock = $res->underblock;
      $fromdate = $res->fromdate;
      $todate = $res->todate;
      if($checkunderblock == 1)
      {
        $datacontoller = New DataController();
        $blockstartid = $res->blockid;
        $underblock = $datacontoller->findunderblock($blockstartid);
        $block = Block::with(['Cases','Structure','belongtoblock'])->whereIn('id',$underblock)->get();
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$underblock)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {


          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }
        $cases = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$array)
        ->pluck('id')->toArray();
        $casemiddle = Offer::rightjoin('proposal','offer.proposal_id','proposal.id')
         ->rightjoin('cases','proposal.case_id','cases.id')
         ->rightjoin('case_middle_data','case_middle_data.case_id','cases.id')
         ->rightjoin('block','cases.service_user_block_id','block.id')
         ->rightjoin('structure','block.structure_id','structure.id')
         ->rightjoin('block as block_under','block.under_block','block_under.id')
         ->whereIn('cases.id',$array)
         ->select([DB::raw("SUM(offer_payment_value19) as total_premium"),'structure.name as structure_name','block.id as block_id','block.name','block_under.name as under_block_name'])
         ->groupBy('block.id')->orderBy('total_premium','DESC')
         ->get();
          return $casemiddle;
      }
      else
      {
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->where('service_user_block_id',$res->blockid)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {
          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }

        $block = Block::with(['Cases','Structure','belongtoblock'])->where('id',$blockid)->get();
        $casemiddle = Offer::rightjoin('proposal','offer.proposal_id','proposal.id')
         ->rightjoin('cases','proposal.case_id','cases.id')
         ->rightjoin('case_middle_data','case_middle_data.case_id','cases.id')
         ->rightjoin('block','cases.service_user_block_id','block.id')
         ->rightjoin('structure','block.structure_id','structure.id')
         ->rightjoin('block as block_under','block.under_block','block_under.id')
         ->whereIn('cases.id',$array)
         ->select([DB::raw("SUM(offer_payment_value19) as total_premium"),'structure.name as structure_name','block.id as block_id','block.name','block_under.name as under_block_name'])
         ->groupBy('block.id')->orderBy('total_premium','DESC')
         ->get();
          return $casemiddle;
      }

    }
    public function filterreturncase(Request $res)
    {
      if($res->fromdate == '//'||$res->todate == '//'||$res->blockid == '')
      {
        return '';
      }
      $blockid = $res->blockid;
      $checkunderblock = $res->underblock;
      $fromdate = $res->fromdate;
      $todate = $res->todate;
      if($checkunderblock == 1)
      {
        $datacontoller = New DataController();
        $blockstartid = $res->blockid;
        $underblock = $datacontoller->findunderblock($blockstartid);
        $block = Block::with(['Cases','Structure','belongtoblock'])->whereIn('id',$underblock)->get();
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$underblock)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {


          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }
        $cases = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$array)
        ->pluck('id')->toArray();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->pluck('case_id')->toArray();
        array_unique($casemiddle);
        $case = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('id',$casemiddle)->get();
        return $case;
      }
      else
      {
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->where('service_user_block_id',$res->blockid)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {
          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }

        $block = Block::with(['Cases','Structure','belongtoblock'])->where('id',$blockid)->get();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->pluck('case_id')->toArray();
        array_unique($casemiddle);
        $case = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('id',$casemiddle)->get();
        return $case;
      }

    }
    public function filtercustomer(Request $res)
    {
      if($res->fromdate == '//'||$res->todate == '//'||$res->blockid == '')
      {
        return '';
      }
      $blockid = $res->blockid;
      $checkunderblock = $res->underblock;
      $fromdate = $res->fromdate;
      $todate = $res->todate;
      if($checkunderblock == 1)
      {
        $datacontoller = New DataController();
        $blockstartid = $res->blockid;
        $underblock = $datacontoller->findunderblock($blockstartid);
        $block = Block::with(['Cases','Structure','belongtoblock'])->whereIn('id',$underblock)->get();
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$underblock)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {


          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }
        $cases = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$array)
        ->pluck('member_case_owner')->toArray();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->pluck('case_id')->toArray();

        $findmember = Cases::whereIn('id',$casemiddle)->pluck('member_case_owner')->toArray();
        $offer =  Offer::rightjoin('proposal','offer.proposal_id','proposal.id')
        ->rightjoin('cases','proposal.case_id','cases.id')
        ->rightjoin('persons','cases.member_case_owner','persons.id')
        ->whereIn('cases.id',$array)
        ->select([DB::raw("SUM(offer_payment_value1) as total_premium"),'offer.*','proposal.*','persons.name','persons.lname'])
        ->groupBy('cases.member_case_owner')->orderBy('total_premium','DESC')
        ->get();
        return $offer;
      }
      else
      {
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->where('service_user_block_id',$res->blockid)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {
          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }

        $block = Block::with(['Cases','Structure','belongtoblock'])->where('id',$blockid)->get();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->pluck('case_id')->toArray();
        $findmember = Cases::whereIn('id',$casemiddle)->pluck('member_case_owner')->toArray();
        $member = Person::whereIn('id',$findmember)->get();
        $offer =  Offer::rightjoin('proposal','offer.proposal_id','proposal.id')
        ->rightjoin('cases','proposal.case_id','cases.id')
        ->rightjoin('persons','cases.member_case_owner','persons.id')
        ->whereIn('cases.id',$array)
        ->select([DB::raw("SUM(offer_payment_value1) as total_premium"),'offer.*','proposal.*','persons.name','persons.lname'])
        ->groupBy('cases.member_case_owner')->orderBy('total_premium','DESC')
        ->get();

        return $offer;
      }

    }

    public function filterport(Request $res)
    {
      if($res->fromdate == '//'||$res->todate == '//'||$res->blockid == '')
      {
        return '';
      }
      $blockid = $res->blockid;
      $checkunderblock = $res->underblock;
      $fromdate = $res->fromdate;
      $todate = $res->todate;
      if($checkunderblock == 1)
      {
        $datacontoller = New DataController();
        $blockstartid = $res->blockid;
        $underblock = $datacontoller->findunderblock($blockstartid);
        $block = Block::with(['Cases','Structure','belongtoblock'])->whereIn('id',$underblock)->get();
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$underblock)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {


          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }
        $cases = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$array)
        ->pluck('member_case_owner')->toArray();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->pluck('case_id')->toArray();

        $findmember = Cases::whereIn('id',$casemiddle)->pluck('member_case_owner')->toArray();

        $offer =  Offer::rightjoin('proposal','offer.proposal_id','proposal.id')
          ->rightjoin('cases','proposal.case_id','cases.id')
          ->rightjoin('case_middle_data','case_middle_data.case_id','cases.id')
          ->rightjoin('persons','cases.member_case_owner','persons.id')
          ->rightjoin('portfolio','portfolio.id','case_middle_data.port_id')
          ->rightjoin('block','portfolio.block_id','block.id')
          ->whereIn('cases.id',$array)
          ->select([DB::raw("SUM(offer_payment_value1) as total_premium"),'persons.name','persons.lname','portfolio.type as port_name','portfolio.id as port_id','block.name as blockportname'])
          ->groupBy('portfolio.id')->orderBy('total_premium','DESC')->get();
        return $offer;
      }
      else
      {
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->where('service_user_block_id',$res->blockid)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {
          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }
        $block = Block::with(['Cases','Structure','belongtoblock'])->where('id',$blockid)->get();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->pluck('case_id')->toArray();
        $findmember = Cases::whereIn('id',$casemiddle)->pluck('member_case_owner')->toArray();
        $member = Person::whereIn('id',$findmember)->get();
        $offer =  Offer::rightjoin('proposal','offer.proposal_id','proposal.id')
          ->rightjoin('cases','proposal.case_id','cases.id')
          ->rightjoin('case_middle_data','case_middle_data.case_id','cases.id')
          ->rightjoin('persons','cases.member_case_owner','persons.id')
          ->rightjoin('portfolio','portfolio.id','case_middle_data.port_id')
          ->rightjoin('block','portfolio.block_id','block.id')
          ->whereIn('cases.id',$array)
          ->select([DB::raw("SUM(offer_payment_value1) as total_premium"),'persons.name','persons.lname','portfolio.type as port_name','portfolio.id as port_id','block.name as blockportname'])
          ->groupBy('portfolio.id')->orderBy('total_premium','DESC')->get();
        return $offer;
      }
    }
    public function filterportcase(Request $res)
    {
      if($res->fromdate == '//'||$res->todate == '//'||$res->blockid == '')
      {
        return '';
      }
      $blockid = $res->blockid;
      $checkunderblock = $res->underblock;
      $fromdate = $res->fromdate;
      $todate = $res->todate;
      if($checkunderblock == 1)
      {
        $datacontoller = New DataController();
        $blockstartid = $res->blockid;
        $underblock = $datacontoller->findunderblock($blockstartid);
        $block = Block::with(['Cases','Structure','belongtoblock'])->whereIn('id',$underblock)->get();
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$underblock)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {


          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }
        $cases = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$array)
        ->pluck('member_case_owner')->toArray();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->pluck('case_id')->toArray();

        $findmember = Cases::whereIn('id',$casemiddle)->pluck('member_case_owner')->toArray();

        $offer = Cases::rightjoin('persons','cases.member_case_owner','persons.id')
          ->rightjoin('portfolio','portfolio.member_id','persons.id')
          ->rightjoin('block','portfolio.block_id','block.id')
          ->whereIn('cases.id',$array)
          ->select([DB::raw("COUNT(member_case_owner) as total_case"),'block.name as block_port_name','portfolio.id as port_id','portfolio.type as port_name','persons.name','persons.lname'])
          ->groupBy('portfolio.id')->orderBy('total_case','DESC')
          ->get();
        return $offer;
      }
      else
      {
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->where('service_user_block_id',$res->blockid)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {
          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }
        $block = Block::with(['Cases','Structure','belongtoblock'])->where('id',$blockid)->get();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->pluck('case_id')->toArray();
        $findmember = Cases::whereIn('id',$casemiddle)->pluck('member_case_owner')->toArray();
        $member = Person::whereIn('id',$findmember)->get();
        $offer =  Cases::rightjoin('persons','cases.member_case_owner','persons.id')
          ->rightjoin('portfolio','portfolio.member_id','persons.id')
          ->rightjoin('block','portfolio.block_id','block.id')
          ->whereIn('cases.id',$array)
          ->select([DB::raw("COUNT(member_case_owner) as total_case"),'block.name as block_port_name','portfolio.id as port_id','portfolio.type as port_name','persons.name','persons.lname'])
          ->groupBy('portfolio.id')->orderBy('total_case','DESC')
          ->get();
        return $offer;
      }
    }
    public function filtercustomercase(Request $res)
    {
      if($res->fromdate == '//'||$res->todate == '//'||$res->blockid == '')
      {
        return '';
      }
      $blockid = $res->blockid;
      $checkunderblock = $res->underblock;
      $fromdate = $res->fromdate;
      $todate = $res->todate;
      if($checkunderblock == 1)
      {
        $datacontoller = New DataController();
        $blockstartid = $res->blockid;
        $underblock = $datacontoller->findunderblock($blockstartid);
        $block = Block::with(['Cases','Structure','belongtoblock'])->whereIn('id',$underblock)->get();
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$underblock)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {


          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }
        array_unique($array);
        $cases = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$array)
        ->pluck('member_case_owner')->toArray();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->pluck('case_id')->toArray();
        $findmember = Cases::whereIn('id',$casemiddle)->pluck('member_case_owner')->toArray();
        $offer = Cases::rightjoin('persons','cases.member_case_owner','persons.id')
        ->whereIn('cases.id',$array)
        ->select([DB::raw("COUNT(member_case_owner) as total_case"),'persons.name','persons.lname'])
          ->groupBy('persons.id')->orderBy('total_case','DESC')
          ->get();
        return $offer;
      }
      else
      {
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->where('service_user_block_id',$res->blockid)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {
          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }
        $block = Block::with(['Cases','Structure','belongtoblock'])->where('id',$blockid)->get();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->pluck('case_id')->toArray();
        $findmember = Cases::whereIn('id',$casemiddle)->pluck('member_case_owner')->toArray();
        $member = Person::whereIn('id',$findmember)->get();
        $offer =  Cases::rightjoin('persons','cases.member_case_owner','persons.id')
          ->whereIn('cases.id',$array)
          ->select([DB::raw("COUNT(member_case_owner) as total_case"),'persons.name','persons.lname'])
          ->groupBy('persons.id')->orderBy('total_case','DESC')
          ->get();
        return $offer;
      }
    }
    public function filterusercase(Request $res)
    {
      if($res->fromdate == '//'||$res->todate == '//'||$res->blockid == '')
      {
        return '';
      }
      $blockid = $res->blockid;
      $checkunderblock = $res->underblock;
      $fromdate = $res->fromdate;
      $todate = $res->todate;
      if($checkunderblock == 1)
      {
        $datacontoller = New DataController();
        $blockstartid = $res->blockid;
        $underblock = $datacontoller->findunderblock($blockstartid);
        $block = Block::with(['Cases','Structure','belongtoblock'])->whereIn('id',$underblock)->get();
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$underblock)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {


          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }
        array_unique($array);
        $cases = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->whereIn('service_user_block_id',$array)
        ->pluck('member_case_owner')->toArray();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->pluck('case_id')->toArray();
        $findmember = Cases::whereIn('id',$casemiddle)->pluck('member_case_owner')->toArray();
        $offer =  Cases::rightjoin('block','cases.service_user_block_id','block.id')
        ->rightjoin('structure','block.structure_id','structure.id')
        ->rightjoin('block as block_under','block.under_block','block_under.id')
        ->whereIn('cases.id',$array)
        ->select([DB::raw("COUNT(service_user_block_id) as total_case"),'structure.name as structure_name','block.id as block_id','block.name','block_under.name as block_under_name'])
          ->groupBy('block.id')->orderBy('total_case','DESC')
          ->get();
        return $offer;
      }
      else
      {
        $array =[];
        $casesfind = Cases::with(['Person','Stage','Cases','Block.belongtoblock','Block.structure','Partner_block','CaseType','CaseSubType','Asset','match_id','CaseStatus','coordiantor','CaseChannel'])->where('service_user_block_id',$res->blockid)
        ->get();
        $fromdate = explode('/',$fromdate);
        $fromdate = $fromdate[2].$fromdate[1].$fromdate[0];
        $todate = explode('/',$todate);
        $todate = $todate[2].$todate[1].$todate[0];
        foreach($casesfind as $ca)
        {
          $dateindb = explode('/',$ca->finish_date);
          if($ca->finish_date == NULL ||$ca->finish_date == '' ||$ca->finish_date == 0 ||$ca->finish_date == '//')
          {
            $dateindb =99999999999999999;
          }
          else
          {
            $dateindb = $dateindb[2].$dateindb[1].$dateindb[0];
          }
          if($dateindb >= $fromdate && $dateindb <= $todate)
          {
            array_push($array,$ca->id);
          }
        }
        $block = Block::with(['Cases','Structure','belongtoblock'])->where('id',$blockid)->get();
        $casemiddle = Casemiddledata::with(['offer','cases','cases.person'])->whereIn('case_id',$array)->pluck('case_id')->toArray();
        $findmember = Cases::whereIn('id',$casemiddle)->pluck('member_case_owner')->toArray();
        $member = Person::whereIn('id',$findmember)->get();
        $offer =  Cases::rightjoin('block','cases.service_user_block_id','block.id')
        ->rightjoin('structure','block.structure_id','structure.id')
        ->rightjoin('block as block_under','block.under_block','block_under.id')
        ->whereIn('cases.id',$array)
        ->select([DB::raw("COUNT(service_user_block_id) as total_case"),'structure.name as structure_name','block.id as block_id','block.name','block_under.name as block_under_name'])
          ->groupBy('block.id')->orderBy('total_case','DESC')
          ->get();
        return $offer;
      }
    }
    public function customer(Request $res)
    {
      if($res->blockid == '')
      {
        return '';
      }
      $blockid = $res->blockid;
      $checkunderblock = $res->underblock;
      if($checkunderblock == 1)
      {
        $datacontoller = New DataController();
        $blockstartid = $res->blockid;
        $underblock = $datacontoller->findunderblock($blockstartid);
        $userauth = User_auth::with(['block','user'])->whereIn('block_id',$underblock)->get();
        return $userauth;
      }
      else
      {
        $userauth = User_auth::with(['block','user'])->where('block_id',$blockid)->get();
        return $userauth;
      }
    }
    public function userauth(Request $res)
    {
      if($res->blockid == '')
      {
        return '';
      }
      $blockid = $res->blockid;
      $checkunderblock = $res->underblock;
      if($checkunderblock == 1)
      {
        $datacontoller = New DataController();
        $blockstartid = $res->blockid;
        $underblock = $datacontoller->findunderblock($blockstartid);
        $userauth = User_auth::with(['block','user'])->whereIn('block_id',$underblock)->get();
        return $userauth;
      }
      else
      {
        $userauth = User_auth::with(['block','user'])->where('block_id',$blockid)->get();
        return $userauth;
      }
    }

    public function customerranking()
    {
      return view('system-mgmt/insurance/misreport/customerranking');
    }
    public function userranking()
    {
      return view('system-mgmt/insurance/misreport/userranking');
    }
    public function distributioninsight()
    {
      return view('system-mgmt/insurance/misreport/distributioninsight');
    }
    public function customerport()
    {
      return view('system-mgmt/insurance/misreport/customerport');
    }
    public function customerportcase()
    {
      return view('system-mgmt/insurance/misreport/customerportcase');
    }
    public function customercase()
    {
      return view('system-mgmt/insurance/misreport/customercase');
    }
    public function usercase()
    {
      return view('system-mgmt/insurance/misreport/userrankingcase');
    }
    public function customerperfomance()
    {
      return view('system-mgmt/insurance/misreport/customerperfomance');
    }
}
