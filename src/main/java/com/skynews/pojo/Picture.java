package com.skynews.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Picture {
    @ApiModelProperty(value="用户id")
    private int UserId;
    @ApiModelProperty(value="用户账号")
    private String account;
    @ApiModelProperty(value="图片")
    private String userImg;
    @ApiModelProperty(value="图片描述")
    private String userDepiction;
    @ApiModelProperty(value="审核状态")
    private int status;
}
