package com.example.table.service;

import com.example.table.entity.WrpFieldinfo;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author liujieyu
 * @since 2019-09-20
 */
public interface WrpFieldinfoService extends IService<WrpFieldinfo> {
    //获取基础数据配置信息
    List<Map<String,Object>> selectWrpFieldinfoByFormIDAndFieldID(String formid, String fieldid);
}
