import 'package:flutter/material.dart';
import 'package:mobile/utils/helper/constant.dart';

class CustomButton extends StatelessWidget {
  const CustomButton(
      {super.key,
      this.onPressed,
      this.child,
      this.btnText,
      this.disabled = false});
  final void Function()? onPressed;
  final Widget? child;
  final String? btnText;
  final bool disabled;
  @override
  Widget build(BuildContext context) {
    return FilledButton(
        style: FilledButton.styleFrom(
            padding: const EdgeInsets.symmetric(
                vertical: kSpaceM, horizontal: kSpaceM * 1.5),
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(kpadding / 4))),
        onPressed: disabled ? null : onPressed,
        child: child ?? Text((btnText ?? 'Valider').tr()));
  }
}
