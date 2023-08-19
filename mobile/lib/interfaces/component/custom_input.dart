import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile/interfaces/utils/constant.dart';

class CustomInput extends StatelessWidget {
  const CustomInput(
      {super.key,
      this.label,
      this.controller,
      this.keyboardType,
      this.validator,
      this.maxLength,
      this.obscureText,
      this.onFieldSubmitted,
      this.focusNode,
      this.onChanged,
      this.style,
      this.contentPadding,
      this.cursorHeight,
      this.autofocus});
  final String? label;
  final TextEditingController? controller;
  final TextInputType? keyboardType;
  final bool? autofocus;
  final bool? obscureText;
  final int? maxLength;
  final FocusNode? focusNode;
  final TextStyle? style;
  final double? cursorHeight;
  final EdgeInsetsGeometry? contentPadding;
  final void Function(String)? onFieldSubmitted;
  final void Function(String)? onChanged;

  final String? Function(String?)? validator;
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (label != null) ...[
          Padding(
            padding: const EdgeInsets.only(top: kpadding, left: kpadding / 8),
            child: Text(
              label!,
              style: getTextTheme(context)
                  .bodyMedium!
                  .copyWith(fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(
            height: kpadding / 4,
          )
        ],
        TextFormField(
          controller: controller,
          autocorrect: false,
          autofocus: autofocus ?? false,
          focusNode: focusNode,
          onChanged: onChanged,
          keyboardType: keyboardType,
          // maxLengthEnforcement: MaxLengthEnforcement.enforced,
          onFieldSubmitted: onFieldSubmitted,
          validator: validator,
          maxLength: maxLength,
          cursorHeight: cursorHeight,
          obscureText: obscureText ?? false,
          style: style,
          textAlign: TextAlign.center,
          decoration: InputDecoration(
              isDense: false,
              contentPadding: contentPadding ??
                  const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
              fillColor:
                  getTheme(context).colorScheme.onBackground.withOpacity(.04),
              filled: true,
              counterText: "",
              border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(kpadding / 4),
                  borderSide: BorderSide(
                      color: getTheme(context)
                          .colorScheme
                          .onBackground
                          .withOpacity(.09))),
              enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(kpadding / 4),
                  borderSide: BorderSide(
                      color: getTheme(context)
                          .colorScheme
                          .onBackground
                          .withOpacity(.02))),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(kpadding / 4),
                borderSide: const BorderSide(color: kprimary, width: 2),
              )),
        ),
      ],
    );
  }
}
