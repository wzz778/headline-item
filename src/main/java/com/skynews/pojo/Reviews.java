package com.skynews.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reviews {
    private int reviewsID;
    private int commentID;
    private int userID;
    private String contain;

    public Reviews(int commentID, int userID, String contain) {
        this.commentID = commentID;
        this.userID = userID;
        this.contain = contain;
    }
}
