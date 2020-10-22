package com.hyd.health.system.util;


/**
 * Created by xieshuai on 2020/8/18 上午 9:26
 */
public class SortUtils {

    /**
     * 冒泡排序
     * @param array
     * @return
     */
    public static int[] bubbleSort(int[] array){
        int length = array.length;
        for(int i=0; i<length-1; i++){
            for(int j=0; j<length-1-i; j++){
                if(array[j+1]<array[j]){
                    int temp = array[j+1];
                    array[j+1] = array[j];
                    array[j] = temp;
                }
            }
        }
        return array;
    }
    public static int[] bubbleSortByReverseorder(int[] array){
        int length = array.length;
        for(int i=0; i<length-1; i++){
            for(int j=0; j<length-1-i; j++){
                if(array[j+1]>array[j]){
                    int temp = array[j+1];
                    array[j+1] = array[j];
                    array[j] = temp;
                }
            }
        }
        return array;
    }
}
