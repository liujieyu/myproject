package com.example.table.entity;

import java.util.Date;

/**
 * <p>
 *预警参数类
 * </p>
 *
 * @author liujieyu
 * @since 2019-09-19
 */
public class AlarmParam {
    //开始时间
    private String begintime;
    //结束时间
    private String endtime;
    //行政区划编码
    private String adcd;
    //预警等级
    private Integer alarmlevel;
    //站点名称
    private String sitename;
    //分页开始记录数
    private int begincount=1;
    //分页结束记录数
    private int endcount=20;
    //平台标识 1 省级平台  2 市级平台  3 县级平台
    private int plantsign=3;
    //排序字段
    private String orderBy="a.TM";
    //排序顺序
    private String sequence="desc";

    public String getBegintime() {
        return begintime;
    }

    public void setBegintime(String begintime) {
        this.begintime = begintime;
    }

    public String getEndtime() {
        return endtime;
    }

    public void setEndtime(String endtime) {
        this.endtime = endtime;
    }

    public String getAdcd() {
        return adcd;
    }

    public void setAdcd(String adcd) {
        this.adcd = adcd;
    }

    public Integer getAlarmlevel() {
        return alarmlevel;
    }

    public void setAlarmlevel(Integer alarmlevel) {
        this.alarmlevel = alarmlevel;
    }

    public String getSitename() {
        return sitename;
    }

    public void setSitename(String sitename) {
        this.sitename = sitename;
    }

    public int getBegincount() {
        return begincount;
    }

    public void setBegincount(int begincount) {
        this.begincount = begincount;
    }

    public int getEndcount() {
        return endcount;
    }

    public void setEndcount(int endcount) {
        this.endcount = endcount;
    }

    public int getPlantsign() {
        return plantsign;
    }

    public void setPlantsign(int plantsign) {
        this.plantsign = plantsign;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    public String getSequence() {
        return sequence;
    }

    public void setSequence(String sequence) {
        this.sequence = sequence;
    }
}
