package com.example.table.service.impl;

import com.example.table.entity.WrpFieldinfo;
import com.example.table.mapper.WrpFieldinfoMapper;
import com.example.table.service.WrpFieldinfoService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author liujieyu
 * @since 2019-09-20
 */
@Service
public class WrpFieldinfoServiceImpl extends ServiceImpl<WrpFieldinfoMapper, WrpFieldinfo> implements WrpFieldinfoService {
    @Autowired
    WrpFieldinfoMapper wrpFieldinfoMapper;
    //获取基础数据配置信息
    public List<Map<String,Object>> selectWrpFieldinfoByFormIDAndFieldID(String formid, String fieldid){
        return wrpFieldinfoMapper.selectWrpFieldinfoByFormIDAndFieldID(formid,fieldid);
    }
}
