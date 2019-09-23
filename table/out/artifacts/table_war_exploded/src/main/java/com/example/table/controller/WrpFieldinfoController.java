package com.example.table.controller;


import com.example.table.entity.StHpC;
import com.example.table.service.WrpFieldinfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author liujieyu
 * @since 2019-09-20
 */
@RestController
@RequestMapping("/fieldinfo")
public class WrpFieldinfoController {
    @Autowired
    WrpFieldinfoService wrpFieldinfoService;
    @RequestMapping(value="/common/{formid}&{fieldid}",method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String,Object>> fieldinfo(@PathVariable("formid") String formid, @PathVariable("fieldid") String fieldid){
        return wrpFieldinfoService.selectWrpFieldinfoByFormIDAndFieldID(formid,fieldid);
    }
}
