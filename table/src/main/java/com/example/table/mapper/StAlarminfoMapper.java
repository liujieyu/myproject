package com.example.table.mapper;

import com.example.table.entity.AlarmParam;
import com.example.table.entity.StAlarminfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author liujieyu
 * @since 2019-09-19
 */
@Component
public interface StAlarminfoMapper extends BaseMapper<StAlarminfo> {
    //站点预警信息统计
    Integer selectWarmInfoByCount(AlarmParam alarmParam);
    //分页查询站点预警信息
    List<StAlarminfo> selectWarmInfoByPage(AlarmParam alarmParam);

}
