import 'package:flutter/material.dart';

import '../utils/constant.dart';

class CustomBox extends StatelessWidget {
  CustomBox({Key? key, required this.child, this.margin, this.padding})
      : super(key: key);
  final Widget child;
  final EdgeInsetsGeometry? margin;
  final EdgeInsetsGeometry? padding;
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.maxFinite,
      margin: margin ??
          EdgeInsets.symmetric(horizontal: kpadding, vertical: kpadding / 2),
      padding: padding ?? EdgeInsets.all(kpadding / 3),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(kpadding / 4),
          border: Border.all(
              color:
                  getTheme(context).colorScheme.onBackground.withOpacity(.07)),
          boxShadow: [
            BoxShadow(
                color: getTheme(context).dividerColor,
                blurRadius: 10,
                blurStyle: BlurStyle.outer)
          ],
          color: getTheme(context).colorScheme.onBackground.withOpacity(.07)),
      child: child,
    );
  }
}

class RowItemBetween extends StatelessWidget {
  const RowItemBetween({Key? key, this.label, this.value}) : super(key: key);
  final String? label;
  final String? value;
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [Text(label!), Spacer(), Text(value!)],
    );
  }
}
