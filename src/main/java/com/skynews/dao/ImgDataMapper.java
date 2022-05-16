package com.skynews.dao;


import com.skynews.pojo.Picture;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper

public interface ImgDataMapper {
    //上传图片库
    int ImgDates(Picture img);
//    通过账号获取图片库信息
    Picture getImg(String account);
    //模糊查询图片库
    List<Picture> vagueQueryPicture(@Param("thing") String thing);
    //通过分页查询图片库
    List<Picture> saveImgPages(@Param("column") int column,@Param("total") int total);
    //对模糊查询的数据进行分页
    List<Picture> vagueSaveImgPages(@Param("thing") String thing,@Param("column") int column,@Param("total") int total);
    //查询未审核的照片，也就是status为0的照片
    List<Picture> downPicture();
    //查询所有审核过的照片，也就是status为1的照片
    List<Picture> passPicture();
    //对照片进行审核
    int auditPicture(int UserId);
//    查询图片库所以图片
    List<Picture> allPicture();

}

