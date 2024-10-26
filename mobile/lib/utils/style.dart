/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'package:flutter/material.dart';
import 'package:mobile/utils/color_ressources.dart';

import 'dimensions.dart';

class AppStyle {
  static TextStyle montserratRegular({
    double? fontSize,
    Color? color,
    TextDecoration decoration = TextDecoration.none,
  }) {
    return TextStyle(
        color: color ?? ColorResources.BLACK_COLOR,
        fontSize: fontSize ?? Dimensions.FONT_SIZE_DEFAULT,
        fontFamily: 'Montserrat-Regular',
        decoration: decoration);
  }

  static TextStyle montserratBold({
    double? fontSize,
    Color? color,
    TextDecoration decoration = TextDecoration.none,
  }) {
    return TextStyle(
        color: color ?? ColorResources.BLACK_COLOR,
        fontFamily: 'Montserrat-Bold',
        fontSize: fontSize ?? Dimensions.FONT_SIZE_DEFAULT,
        decoration: decoration);
  }

  static TextStyle montserratSemiBold({
    double? fontSize,
    Color? color,
    TextDecoration decoration = TextDecoration.none,
  }) {
    return TextStyle(
        color: color ?? ColorResources.BLACK_COLOR,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: fontSize ?? Dimensions.FONT_SIZE_DEFAULT,
        decoration: decoration);
  }

  static TextStyle poppinsRegular({
    double? fontSize,
    Color? color,
    TextDecoration decoration = TextDecoration.none,
  }) =>
      TextStyle(
        color: color ?? ColorResources.BLACK_COLOR,
        fontSize: fontSize ?? Dimensions.FONT_SIZE_DEFAULT,
        fontFamily: 'Poppins-Regular',
        decoration: decoration,
      );

  static poppinsBold({double? fontSize, Color? color}) => TextStyle(
      color: color ?? ColorResources.BLACK_COLOR,
      fontSize: fontSize ?? Dimensions.FONT_SIZE_DEFAULT,
      fontFamily: 'Poppins-Bold');

  static poppinsSemiBold({
    double? fontSize,
    Color? color,
    TextDecoration decoration = TextDecoration.none,
  }) =>
      TextStyle(
          color: color ?? ColorResources.BLACK_COLOR,
          fontSize: fontSize ?? Dimensions.FONT_SIZE_DEFAULT,
          fontFamily: 'Poppins-SemiBold',
          decoration: decoration);
}
