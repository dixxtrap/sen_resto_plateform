import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/utils/color_ressources.dart';

import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/style.dart';

import '../../utils/helper/assets_svg.dart';
import '../../utils/helper/svg_icon.dart';

class CustomAppBar extends StatelessWidget
    implements ObstructingPreferredSizeWidget {
  const CustomAppBar({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      toolbarOpacity: 0.57,
      automaticallyImplyLeading: true,
      title: Text('Sen Rest\' 0', style: AppStyle.poppinsBold(fontSize: 20)),
      actions: [
        IconButton(
            padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 0),
            style: IconButton.styleFrom(
              minimumSize: const Size(0, 0),
              fixedSize: const Size(35, 35),
              padding: const EdgeInsets.all(0),
            ),
            onPressed: () {},
            icon: const SvgIcon(
              AssetSvg.bell,
              color: ColorResources.PRIMARY_APP_COLOR,
              size: 25,
            ))
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(50);

  @override
  bool shouldFullyObstruct(BuildContext context) {
    // TODO: implement shouldFullyObstruct
    return true;
  }
}
