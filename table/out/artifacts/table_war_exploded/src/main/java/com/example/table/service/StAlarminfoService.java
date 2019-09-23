package com.example.table.service;

import com.example.table.entity.AlarmParam;
import com.example.table.entity.StAlarminfo;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author liujieyu
 * @since 2019-09-19
 */
public interface StAlarminfoService extends IService<StAlarminfo> {
    //站点预警信息统计
    Integer selectWarmInfoByCount(AlarmParam alarmParam);
    //分页查询站点预警信息
    List<StAlarminfo> selectWarmInfoByPage(AlarmParam alarmParam);
}
