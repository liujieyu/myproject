package com.example.table.service.impl;

import com.example.table.entity.AlarmParam;
import com.example.table.entity.StAlarminfo;
import com.example.table.mapper.StAlarminfoMapper;
import com.example.table.service.StAlarminfoService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author liujieyu
 * @since 2019-09-19
 */
@Service
public class StAlarminfoServiceImpl extends ServiceImpl<StAlarminfoMapper, StAlarminfo> implements StAlarminfoService {
    @Autowired
    StAlarminfoMapper stAlarminfoMapper;
    //站点预警信息统计
    public Integer selectWarmInfoByCount(AlarmParam alarmParam){
        return stAlarminfoMapper.selectWarmInfoByCount(alarmParam);
    }
    //分页查询站点预警信息
    public List<StAlarminfo> selectWarmInfoByPage(AlarmParam alarmParam){
        return stAlarminfoMapper.selectWarmInfoByPage(alarmParam);
    }
}
