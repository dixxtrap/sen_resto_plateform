/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'package:flutter/services.dart';
import 'package:mobile/utils/formatter/non_zero_formatter.dart';
import '../helper/constant.dart';

class AppFormatter {
  static List<TextInputFormatter> amountFormatter(
      {int length = amountFieldMaxLength}) {
    return [
      LengthLimitingTextInputFormatter(length),
      NonZeroFormatter(),
      FilteringTextInputFormatter.allow(RegExp(r'^\d+\,?\d{0,2}'))
    ];
  }

  static List<TextInputFormatter> numericFormatter(
      {int length = regularFieldMaxLength}) {
    return [
      LengthLimitingTextInputFormatter(length),
      FilteringTextInputFormatter.digitsOnly,
    ];
  }

  static List<TextInputFormatter> mobileNumberFormatter(
      {int length = maxMobileLength}) {
    return [
      LengthLimitingTextInputFormatter(length),
      FilteringTextInputFormatter.digitsOnly
    ];
  }

  static List<TextInputFormatter> alphaNumericFormatter(
      {int length = regularFieldMaxLength, String? regexFormat}) {
    return [
      LengthLimitingTextInputFormatter(length),
      FilteringTextInputFormatter.allow(
          RegExp('[0-9a-zA-ZÀ-ÿ-.|@|.|\\ |$regexFormat]')),
    ];
  }

  static List<TextInputFormatter> nameFormatter(
      {int length = regularFieldMaxLength, String? regexFormat}) {
    return [
      LengthLimitingTextInputFormatter(length),
      FilteringTextInputFormatter.allow(RegExp('^[a-zA-Z][a-zA-Z- ]*')),
    ];
  }

  static String spaceFormatNumber(int number) {
    String result = '';
    int digit = 1;
    while (number > 0) {
      if (digit > 1 && digit % 3 == 1) {
        result = '${number % 10} $result';
      } else {
        result = (number % 10).toString() + result;
      }

      digit++;
      number = number ~/ 10;
    }
    return result;
  }

  static String removeCountryCode(String codeNumber) {
    if (codeNumber.startsWith("221")) {
      String newCodeNumber =
          codeNumber.substring(3); // Remove the first 3 characters
      return newCodeNumber;
    } else {
      return codeNumber;
    }
  }
}

class NumberFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
      TextEditingValue oldValue, TextEditingValue newValue) {
    var text = newValue.text;

    if (newValue.selection.baseOffset == 0) {
      return newValue;
    }

    var buffer = StringBuffer();
    for (int i = 0; i < text.length; i++) {
      buffer.write(text[i]);
      var nonZeroIndex = i + 1;

      if (nonZeroIndex <= 2) {
        if (nonZeroIndex % 2 == 0 && nonZeroIndex != text.length) {
          buffer.write('-');
        }
      } else if (nonZeroIndex >= 3 && nonZeroIndex <= 5) {
        if (nonZeroIndex % 5 == 0 && nonZeroIndex != text.length) {
          buffer.write('-');
        }
      } else {
        if (nonZeroIndex % 2 == 1 && nonZeroIndex != text.length) {
          buffer.write('-');
        }
      }
    }

    var string = buffer.toString();
    return newValue.copyWith(
        text: string,
        selection: TextSelection.collapsed(offset: string.length));
  }
}
