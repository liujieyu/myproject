package com.example.table.controller;


import com.example.table.entity.AlarmParam;
import com.example.table.entity.StAlarminfo;
import com.example.table.service.StAlarminfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author liujieyu
 * @since 2019-09-19
 */
@RestController
@RequestMapping("/alarm")
public class StAlarminfoController {
    @Autowired
    StAlarminfoService stAlarminfoService;

    @ResponseBody
    @RequestMapping(value="/sitealarm",method = RequestMethod.GET)
    public Map<String,Object> getAlarmInfo(AlarmParam alarmParam){
        if(alarmParam.getOrderBy()!=null){
            if(alarmParam.getOrderBy().equals("STNM")){
                alarmParam.setOrderBy("b.STNM");
            }
            if(alarmParam.getOrderBy().equals("TYPENAME")){
                alarmParam.setOrderBy("(select stuff((select ',' + type from ST_STBPRP_F f where f.STCD =b.STCD for xml path('')),1,1,''))");
            }
            if(alarmParam.getOrderBy().equals("TMSTR")){
                alarmParam.setOrderBy("a.TM");
            }
            if(alarmParam.getOrderBy().equals("ALARMNAME")){
                alarmParam.setOrderBy("a.Alarm");
            }
            if(alarmParam.getOrderBy().equals("CONTENTS")){
                alarmParam.setOrderBy("a.CONTENTS");
            }
            if(alarmParam.getOrderBy().equals("MV")){
                alarmParam.setOrderBy("a.MV");
            }
            if(alarmParam.getOrderBy().equals("AlARMV")){
                alarmParam.setOrderBy("a.AlARMV");
            }
            if(alarmParam.getOrderBy().equals("ADNM")){
                alarmParam.setOrderBy("b.ADDVCD");
            }
        }
        Integer count=stAlarminfoService.selectWarmInfoByCount(alarmParam);
        List<StAlarminfo> list=stAlarminfoService.selectWarmInfoByPage(alarmParam);
        Map<String,Object> map=new HashMap<>();
        map.put("rows",list);
        map.put("total",count);
        return map;
    }
}
