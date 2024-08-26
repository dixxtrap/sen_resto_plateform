import 'package:flutter/cupertino.dart';
import 'package:flutter_svg/flutter_svg.dart';

class SvgIcon extends StatelessWidget {
  const SvgIcon(this.value,
      {super.key, this.size, this.color, this.isColored = false});
  final double? size;
  final String value;
  final Color? color;
  final bool isColored;
  @override
  Widget build(BuildContext context) {
    return SvgPicture.asset(
      value,
      height: size ?? 24,
      width: size ?? 24,
      colorFilter: color != null
          ? ColorFilter.mode(
              color!,
              BlendMode.srcIn,
            )
          : null,
      matchTextDirection: true,
      theme: SvgTheme(fontSize: 100, xHeight: 290),
    );
  }
}
