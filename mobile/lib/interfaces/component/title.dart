import 'package:flutter/cupertino.dart';
import 'package:mobile/interfaces/utils/constant.dart';

import '../utils/assets_svg.dart';
import '../utils/svg_icon.dart';

class CustomTitle extends StatelessWidget {
  const CustomTitle({Key? key, this.title}) : super(key: key);
  final String? title;
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const SvgIcon(
          size: 20,
          AssetSvg.chevronFill,
          color: kprimary,
        ),
        Text(
          "$title",
          style: getTextTheme(context)
              .bodyMedium!
              .copyWith(fontWeight: FontWeight.bold),
        )
      ],
    );
  }
}
