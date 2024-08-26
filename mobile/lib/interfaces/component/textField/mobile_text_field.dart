/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:intl_phone_field/country_picker_dialog.dart';
import 'package:intl_phone_field/intl_phone_field.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/formatter/app_formatter.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/style.dart';

class MobileTextField extends StatelessWidget {
  final TextEditingController? controller;
  final bool obscureText;
  final String? hintTxt;
  final int maxLength;
  final int maxLine;
  final FocusNode? focusNode;
  final FocusNode? nextNode;
  final TextInputAction textInputAction;
  final FormFieldValidator<String>? validator;
  final GlobalKey<FormState>? fieldKey;
  final Function(String value)? onChanged;
  final Widget? prefixWidget;
  final Widget? suffixIcon;
  final String? heading;
  final String? helperText;
  final TextStyle? style;
  final TextStyle? prefixStyle;
  final bool readOnly;
  final bool? enabled;
  final GestureTapCallback? onTap;
  final Color? focusedColor;
  final bool? enabledColor;
  final bool? copyPaste;
  final String? initialValue;
  final EdgeInsets? contentPadding;
  final TextInputType? keyboardType;

  MobileTextField({
    this.controller,
    this.obscureText = false,
    this.maxLength = 256,
    this.hintTxt,
    this.maxLine = 1,
    this.focusNode,
    this.nextNode,
    this.validator,
    this.textInputAction = TextInputAction.next,
    this.keyboardType,
    this.fieldKey,
    this.prefixWidget,
    this.suffixIcon,
    this.heading,
    this.readOnly = false,
    this.enabled,
    this.onTap,
    this.style,
    this.helperText,
    this.focusedColor,
    this.enabledColor,
    this.onChanged,
    this.initialValue,
    this.prefixStyle,
    this.contentPadding,
    this.copyPaste,
  });

  @override
  Widget build(context) {
    return Form(
      key: fieldKey,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      child: TextFormField(
        controller: controller,
        readOnly: readOnly,
        enableInteractiveSelection: copyPaste ?? true,
        enabled: enabled,
        style:
            style ?? AppStyle.poppinsRegular(color: ColorResources.BLACK_COLOR),
        obscureText: obscureText,
        textCapitalization: TextCapitalization.none,
        maxLines: maxLine,
        cursorColor: ColorResources.PRIMARY_COLOR,
        textAlignVertical: TextAlignVertical.center,
        focusNode: focusNode,
        keyboardType: keyboardType ?? TextInputType.number,
        initialValue: initialValue,
        textInputAction: textInputAction,
        onFieldSubmitted: (v) {
          FocusScope.of(context).requestFocus(nextNode);
        },
        onChanged: (text) {
          Future.delayed(const Duration(milliseconds: 100), () {
            fieldKey!.currentState!.validate();
          });
          if (onChanged != null) onChanged!(text);
        },
        inputFormatters: AppFormatter.mobileNumberFormatter(),
        validator: validator ??
            (value) {
              if (value!.isEmpty) {
                return tr("Required");
              } else if (value.length < maxMobileLength) {
                return tr("message_mobile_validation",
                    args: [maxMobileLength.toString()]);
              }
              return null;
            },
        decoration: InputDecoration(
          helperText: helperText,
          hintText: hintTxt ?? '',
          alignLabelWithHint: true,
          contentPadding: contentPadding ??
              const EdgeInsets.symmetric(
                vertical: 15,
                horizontal: 20,
              ),
          isDense: true,
          hintStyle: AppStyle.poppinsRegular().copyWith(
            color: ColorResources.GRAY_COLOR,
            fontSize: 14,
            height: 1.6,
          ),
          suffixIcon: suffixIcon ?? null,
          prefixText: '+221 ',
          prefixStyle: prefixStyle ??
              AppStyle.poppinsRegular(color: ColorResources.BLACK_COLOR),
          prefixIcon: prefixWidget != null
              ? Padding(
                  padding: const EdgeInsets.only(left: 10, right: 10),
                  child: prefixWidget)
              : null,
          labelStyle: AppStyle.poppinsRegular(
              color: ColorResources.GRAY_COLOR, fontSize: 13),
          floatingLabelStyle: AppStyle.poppinsRegular(
              color: ColorResources.PRIMARY_APP_COLOR, fontSize: 15),
          labelText: heading,
          focusedErrorBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: ColorResources.RED_COLOR),
            borderRadius: BorderRadius.circular(8),
          ),
          errorBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: ColorResources.RED_COLOR),
            borderRadius: BorderRadius.circular(8),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide:
                const BorderSide(color: ColorResources.PRIMARY_APP_COLOR),
            borderRadius: BorderRadius.circular(8),
          ),
          enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(
                color: enabledColor == true
                    ? ColorResources.PRIMARY_APP_COLOR
                    : ColorResources.GREY300_COLOR),
            borderRadius: BorderRadius.circular(8),
          ),
          filled: true,
          fillColor: ColorResources.WHITE_COLOR,
        ),
        textAlign: TextAlign.start,
        onTap: onTap,
      ),
    );
  }
}

class MobileTextFieldV2 extends StatelessWidget {
  final TextEditingController? controller;
  final bool obscureText;
  final String? hintTxt;
  final int maxLength;
  final int maxLine;
  final FocusNode? focusNode;
  final FocusNode? nextNode;
  final TextInputAction textInputAction;
  final FormFieldValidator<String>? validator;
  final GlobalKey<FormState>? fieldKey;
  final Function(String value)? onChanged;
  final Widget? prefixWidget;
  final Widget? suffixIcon;
  final Widget? heading;
  final String? helperText;
  final TextStyle? style;
  final TextStyle? prefixStyle;
  final bool readOnly;
  final bool? enabled;
  final GestureTapCallback? onTap;
  final Color? focusedColor;
  final bool? enabledColor;
  final bool? copyPaste;
  final String? initialValue;
  final EdgeInsets? contentPadding;
  final TextInputType? keyboardType;

  MobileTextFieldV2({
    this.controller,
    this.obscureText = false,
    this.maxLength = 256,
    this.hintTxt,
    this.maxLine = 1,
    this.focusNode,
    this.nextNode,
    this.validator,
    this.textInputAction = TextInputAction.next,
    this.keyboardType,
    this.fieldKey,
    this.prefixWidget,
    this.suffixIcon,
    this.heading,
    this.readOnly = false,
    this.enabled,
    this.onTap,
    this.style,
    this.helperText,
    this.focusedColor,
    this.enabledColor,
    this.onChanged,
    this.initialValue,
    this.prefixStyle,
    this.contentPadding,
    this.copyPaste,
  });

  @override
  Widget build(context) {
    return Form(
      key: fieldKey,
      child: TextFormField(
        controller: controller,
        readOnly: readOnly,
        enableInteractiveSelection: copyPaste ?? true,
        enabled: enabled,
        style:
            style ?? AppStyle.poppinsRegular(color: ColorResources.BLACK_COLOR),
        obscureText: obscureText,
        textCapitalization: TextCapitalization.none,
        maxLines: maxLine,
        cursorColor: ColorResources.PRIMARY_COLOR,
        textAlignVertical: TextAlignVertical.center,
        focusNode: focusNode,
        keyboardType: keyboardType ?? TextInputType.number,
        initialValue: initialValue,
        textInputAction: textInputAction,
        onFieldSubmitted: (v) {
          FocusScope.of(context).requestFocus(nextNode);
        },
        onChanged: (text) {
          Future.delayed(const Duration(milliseconds: 100), () {
            fieldKey!.currentState!.validate();
          });
          if (onChanged != null) onChanged!(text);
        },
        inputFormatters: AppFormatter.mobileNumberFormatter(),
        validator: validator ??
            (value) {
              if (value!.isEmpty) {
                return tr("Required");
              } else if (value.length < maxMobileLength) {
                return tr("message_mobile_validation",
                    args: [maxMobileLength.toString()]);
              }
              return null;
            },
        decoration: InputDecoration(
          helperText: helperText,
          hintText: hintTxt ?? '',
          alignLabelWithHint: true,
          contentPadding: contentPadding ??
              const EdgeInsets.symmetric(
                vertical: 15,
                horizontal: 20,
              ),
          isDense: true,
          hintStyle: AppStyle.poppinsRegular().copyWith(
            color: ColorResources.GRAY_COLOR,
            fontSize: 14,
            height: 1.6,
          ),
          suffixIcon: suffixIcon ?? null,
          prefixText: '+221 ',
          prefixStyle: prefixStyle ??
              AppStyle.poppinsRegular(color: ColorResources.BLACK_COLOR),
          prefixIcon: prefixWidget != null
              ? Padding(
                  padding: const EdgeInsets.only(left: 10, right: 10),
                  child: prefixWidget)
              : null,
          labelStyle: AppStyle.poppinsRegular(
              color: ColorResources.GRAY_COLOR, fontSize: 13),
          floatingLabelStyle: AppStyle.poppinsRegular(
              color: ColorResources.PRIMARY_APP_COLOR, fontSize: 15),
          label: heading,
          focusedErrorBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: ColorResources.RED_COLOR),
            borderRadius: BorderRadius.circular(8),
          ),
          errorBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: ColorResources.RED_COLOR),
            borderRadius: BorderRadius.circular(8),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide:
                const BorderSide(color: ColorResources.PRIMARY_APP_COLOR),
            borderRadius: BorderRadius.circular(8),
          ),
          enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(
                color: enabledColor == true
                    ? ColorResources.PRIMARY_APP_COLOR
                    : ColorResources.GREY300_COLOR),
            borderRadius: BorderRadius.circular(8),
          ),
          filled: true,
          fillColor: ColorResources.WHITE_COLOR,
        ),
        textAlign: TextAlign.start,
        onTap: onTap,
      ),
    );
  }
}

class flagInputField extends StatelessWidget {
  const flagInputField({
    super.key,
    required GlobalKey<FormState> keyMobile,
    required TextEditingController controllerMobile,
    this.onChanged,
  })  : keyMobile = keyMobile,
        _controllerMobile = controllerMobile;

  final GlobalKey<FormState> keyMobile;
  final TextEditingController _controllerMobile;
  final Function()? onChanged;

  @override
  Widget build(BuildContext context) {
    return Form(
      key: keyMobile,
      onChanged: onChanged,
      child: IntlPhoneField(
        controller: _controllerMobile,
        cursorColor: ColorResources.PRIMARY_COLOR,
        // keyboardType: TextInputType.none,
        autofocus: true,
        initialCountryCode: 'SN',
        invalidNumberMessage: "message_mobile_validation".tr(),
        dropdownIconPosition: IconPosition.trailing,
        flagsButtonMargin: const EdgeInsets.only(left: 15),
        style: AppStyle.poppinsRegular(color: ColorResources.BLACK_COLOR),
        decoration: InputDecoration(
          labelText: tr('Mobile'),
          counterText: "",
          isDense: true,
          hintStyle: AppStyle.poppinsRegular().copyWith(
            color: ColorResources.GRAY_COLOR,
            fontSize: 14,
            height: 1.6,
          ),
          labelStyle: AppStyle.poppinsRegular(
              color: ColorResources.GRAY_COLOR, fontSize: 13),
          floatingLabelStyle: AppStyle.poppinsRegular(
              color: ColorResources.PRIMARY_APP_COLOR, fontSize: 15),
          focusedErrorBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: ColorResources.RED_COLOR),
            borderRadius: BorderRadius.circular(8),
          ),
          errorBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: ColorResources.RED_COLOR),
            borderRadius: BorderRadius.circular(8),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide:
                const BorderSide(color: ColorResources.PRIMARY_APP_COLOR),
            borderRadius: BorderRadius.circular(8),
          ),
          enabledBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: ColorResources.GREY300_COLOR),
            borderRadius: BorderRadius.circular(8),
          ),
          filled: true,
          fillColor: ColorResources.WHITE_COLOR,
        ),
        pickerDialogStyle:
            PickerDialogStyle(backgroundColor: ColorResources.WHITE_COLOR),
      ),
    );
  }
}

class MobileTextFieldV3 extends StatelessWidget {
  final TextEditingController? controller;
  final bool obscureText;
  final String? hintTxt;
  final int maxLength;
  final int maxLine;
  final FocusNode? focusNode;
  final FocusNode? nextNode;
  final TextInputAction textInputAction;
  final FormFieldValidator<String>? validator;
  final GlobalKey<FormState>? fieldKey;
  final Function(String value)? onChanged;
  final Widget? prefixWidget;
  final Widget? suffixIcon;
  final String? heading;
  final String? helperText;
  final TextStyle? style;
  final TextStyle? prefixStyle;
  final bool readOnly;
  final bool? enabled;
  final GestureTapCallback? onTap;
  final Color? focusedColor;
  final Color? filledColor;
  final bool? enabledColor;
  final bool? copyPaste;
  final String? initialValue;
  final EdgeInsets? contentPadding;
  final TextInputType? keyboardType;

  MobileTextFieldV3({
    this.controller,
    this.obscureText = false,
    this.maxLength = 256,
    this.hintTxt,
    this.maxLine = 1,
    this.focusNode,
    this.nextNode,
    this.validator,
    this.textInputAction = TextInputAction.next,
    this.keyboardType,
    this.fieldKey,
    this.prefixWidget,
    this.suffixIcon,
    this.heading,
    this.readOnly = false,
    this.enabled,
    this.filledColor,
    this.onTap,
    this.style,
    this.helperText,
    this.focusedColor,
    this.enabledColor,
    this.onChanged,
    this.initialValue,
    this.prefixStyle,
    this.contentPadding,
    this.copyPaste,
  });

  @override
  Widget build(context) {
    return Form(
      key: fieldKey,
      child: TextFormField(
        controller: controller,
        readOnly: readOnly,
        enableInteractiveSelection: copyPaste ?? true,
        enabled: enabled,
        style:
            style ?? AppStyle.poppinsRegular(color: ColorResources.BLACK_COLOR),
        obscureText: obscureText,
        textCapitalization: TextCapitalization.none,
        maxLines: maxLine,
        cursorColor: ColorResources.PRIMARY_COLOR,
        textAlignVertical: TextAlignVertical.center,
        focusNode: focusNode,
        keyboardType: keyboardType ?? TextInputType.number,
        initialValue: initialValue,
        textInputAction: textInputAction,
        onFieldSubmitted: (v) {
          FocusScope.of(context).requestFocus(nextNode);
        },
        onChanged: (text) {
          Future.delayed(const Duration(milliseconds: 100), () {
            fieldKey!.currentState!.validate();
          });
          if (onChanged != null) onChanged!(text);
        },
        inputFormatters: AppFormatter.mobileNumberFormatter(),
        validator: validator ??
            (value) {
              if (value!.isEmpty) {
                return tr("Required");
              } else if (value.length < maxMobileLength) {
                return tr("message_mobile_validation",
                    args: [maxMobileLength.toString()]);
              }
              return null;
            },
        decoration: InputDecoration(
          helperText: helperText,
          hintText: hintTxt ?? '',
          alignLabelWithHint: true,
          border: const UnderlineInputBorder(
            borderSide:
                BorderSide(color: ColorResources.BLUE_COLOR, width: 1.5),
          ),
          contentPadding: contentPadding ??
              const EdgeInsets.symmetric(
                vertical: 15,
                horizontal: 20,
              ),
          isDense: true,
          hintStyle: AppStyle.poppinsRegular().copyWith(
            color: ColorResources.GRAY_COLOR,
            fontSize: 14,
            height: 1.6,
          ),
          suffixIcon: suffixIcon ?? null,
          prefixText: '+221 ',
          prefixStyle: prefixStyle ??
              AppStyle.poppinsRegular(color: ColorResources.BLACK_COLOR),
          prefixIcon: prefixWidget != null
              ? Padding(
                  padding: const EdgeInsets.only(left: 10, right: 10),
                  child: prefixWidget)
              : null,
          labelStyle: AppStyle.poppinsRegular(
              color: ColorResources.GRAY_COLOR, fontSize: 13),
          floatingLabelStyle: AppStyle.poppinsRegular(
              color: ColorResources.PRIMARY_APP_COLOR, fontSize: 15),
          labelText: heading,
          focusedErrorBorder: const UnderlineInputBorder(
            borderSide: BorderSide(color: ColorResources.RED_COLOR, width: 1.5),
          ),
          errorBorder: const UnderlineInputBorder(
            borderSide: BorderSide(color: ColorResources.RED_COLOR, width: 1.5),
          ),
          focusedBorder: const UnderlineInputBorder(
            borderSide:
                BorderSide(color: ColorResources.PRIMARY_APP_COLOR, width: 1.5),
          ),
          enabledBorder: UnderlineInputBorder(
            borderSide: BorderSide(
                color: enabledColor == true
                    ? ColorResources.PRIMARY_APP_COLOR
                    : ColorResources.GREY300_COLOR,
                width: 1.5),
          ),
          filled: true,
          fillColor: filledColor ?? ColorResources.WHITE_COLOR,
        ),
        textAlign: TextAlign.start,
        onTap: onTap,
      ),
    );
  }
}
