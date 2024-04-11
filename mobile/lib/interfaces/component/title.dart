import 'package:flutter/cupertino.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/style.dart';

import '../../utils/helper/assets_svg.dart';
import '../../utils/helper/svg_icon.dart';

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
          color: ColorResources.PRIMARY_APP_COLOR,
        ),
        Text(
          "$title",
          textScaleFactor: 1.6,
          style: AppStyle.poppinsBold(),
        )
      ],
    );
  }
}
