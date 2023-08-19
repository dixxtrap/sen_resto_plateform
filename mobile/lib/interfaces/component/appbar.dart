import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/interfaces/utils/constant.dart';

import '../utils/assets_svg.dart';
import '../utils/svg_icon.dart';

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
      title: Text('Sen Resto',
          style: getTextTheme(context)
              .titleMedium!
              .copyWith(fontWeight: FontWeight.bold)),
      actions: [
        IconButton(
            padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 0),
            style: IconButton.styleFrom(
              minimumSize: Size(0, 0),
              fixedSize: Size(35, 35),
              padding: EdgeInsets.all(0),
            ),
            onPressed: () {},
            icon: SvgIcon(
              AssetSvg.bell,
              color: kprimary,
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
