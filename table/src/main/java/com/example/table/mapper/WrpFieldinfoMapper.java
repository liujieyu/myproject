package com.example.table.mapper;

import com.example.table.entity.WrpFieldinfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author liujieyu
 * @since 2019-09-20
 */
@Component
public interface WrpFieldinfoMapper extends BaseMapper<WrpFieldinfo> {
    //获取基础数据配置信息
    List<Map<String,Object>> selectWrpFieldinfoByFormIDAndFieldID(@Param("formid") String formid,@Param("fieldid")  String fieldid);
}
