package com.hyd.health.login.domain;

import com.hyd.health.menu.domain.Exam;
import lombok.Data;

/**
 * Created by xieshuai on 2020/7/21 上午 10:41
 */
@Data
public class LoginInfo extends Exam {

    private String loginAccount;

    private String passWord;
}
