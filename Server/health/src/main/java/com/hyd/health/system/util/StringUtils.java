package com.hyd.health.system.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class StringUtils {

    /**
     *
     * @param originString 源字符串
     * @param subString 子串
     * @param next 部分匹配表, 是子串对应的部分匹配表
     * @return 如果是-1 就是没有匹配到，否则返回第一个匹配的位置
     */
    public static int kmpSearch(String originString, String subString, int[] next) {
        for (int i = 0, j = 0; i < originString.length(); i++) {
            while (j > 0 && originString.charAt(i) != subString.charAt(j)) {
                j = next[j - 1];
            }
            if (originString.charAt(i) == subString.charAt(j)) {
                j++;
            }
            if (j == subString.length()) {
                return i - j + 1;
            }
        }
        return -1;
    }

    /**
     *获取到一个字符串(子串) 的部分匹配值表(前缀、后缀共同元素的长度)
     * @param dest 子串
     * @return
     */
    public static int[] kmpNext(String dest) {
        //创建一个 next 数组保存部分匹配值
        int[] next = new int[dest.length()];
        //如果字符串是长度为 1 部分匹配值就是 0
        next[0] = 0;
        for (int i = 1, j = 0; i < dest.length(); i++) {
            while (j > 0 && dest.charAt(i) != dest.charAt(j)) {
                j = next[j - 1];
            }
            //当 dest.charAt(i) == dest.charAt(j) 满足时，部分匹配值就是+1
            if(dest.charAt(i) == dest.charAt(j)) {
                j++;
            }
            next[i] = j;
        }
        return next;
    }

    /**
     *
     * @param originString
     * @param unknownList
     * @return
     */
    public static boolean matcherResult(String originString, List<String> unknownList) {
        boolean unknown = false;
        for (String unknownConclusion : unknownList) {
            int[] kmpNext = kmpNext(originString);
            int index = kmpSearch(originString, unknownConclusion, kmpNext);
            if (index != -1) {
                unknown = true;
                break;
            }
        }
        return unknown;
    }



    /**
     * 获取获取当前时间格式字符串
     * @return
     */
    public static String getDateStr(){
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return df.format(new Date());
    }

    /**
     * 传入时间格式，返回当前日期的字符串
     * @param pattern yyyMMDD
     * @return
     */
    public static String getDateStr(String pattern){
        if(StringUtils.isEmpty(pattern)){
            return null;
        }
        SimpleDateFormat df = new SimpleDateFormat(pattern);
        return df.format(new Date());
    }

    /**
     * 传入日期，格式化为 指定格式字符串
     * @param dateStr 传入的时间字符串
     * @param pattern 期望转换的时间格式
     * @return 转换后的时间格式字符串
     */
    public static String getDateStr(String dateStr, String pattern) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        Date date = format.parse(dateStr.replaceAll("/","-"));
        return format.format(date);
    }

    /**
     * 字符串拼接
     * @param strs
     * @return
     */
    public static String addStr(String...strs){
        StringBuffer stringBuffer = new StringBuffer();
        for(String str: strs){
            stringBuffer.append(str);
        }
        return new String(stringBuffer);
    }

    /**
     * 字符串切割(不包含切割字符中的空字符)
     * @param str
     * @param separatorChars
     * @return
     */
    public static String[] split(String str, String separatorChars){
        return StringUtils.split(str, separatorChars);
    }



    /**
     * 字符串相除
     * @param dividor
     * @param dividend
     * @return
     */
    public static String divide(String dividor, String dividend){
        return null;
    }



    /**
     * 判断字符串是否为空(不含空格字符)
     * @param cs
     * @return
     */
    public static boolean isEmpty(final CharSequence cs){
        return cs == null || cs.length() == 0;
    }

    /**
     * 判断字符串是否不为空(不含空格字符串)
     * @param cs
     * @return
     */
    public static boolean isNotEmpty(final CharSequence cs) {
        return !isEmpty(cs);
    }

    /**
     * 判断字符串是否为空(含空格字符)
     * @param cs
     * @return
     */
    public static boolean isBlank(final CharSequence cs) {
        int strLen;
        if (cs == null || (strLen = cs.length()) == 0) {
            return true;
        }
        for (int i = 0; i < strLen; i++) {
            if (!Character.isWhitespace(cs.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    /**
     *
     * 判断字符串是否不为空(含空格字符)
     * @param cs
     * @return
     */
    public static boolean isNotBlank(final CharSequence cs) {
        return !isBlank(cs);
    }

    /**
     * 字符串补位方法,将位数不足size位的字符串从右补入指定字符串
     * @param str 原字符串
     * @param size 补位后长度
     * @param padStr 补位字符
     * @return
     */
    public static String leftPad(String str, int size, String padStr) {
        return StringUtils.leftPad(str, size, padStr);
    }

    /**
     * 字符串补位方法, 将位数不足Size位的字符串从左补入指定字符串
     * @param str 原字符串
     * @param size 补位后长度
     * @param padStr 补位字符串
     * @return
     */
    public static String rightPad(String str, int size, String padStr){
        return StringUtils.rightPad(str, size, padStr);
    }


}
