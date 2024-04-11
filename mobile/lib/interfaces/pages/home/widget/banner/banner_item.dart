import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:mobile/cores/model/banner_data.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/assets_img.dart';
import 'package:mobile/utils/helper/cached_img.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/style.dart';

class BannerItem extends StatelessWidget {
  const BannerItem({super.key, required this.banner});
  final BannerData banner;
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(kSpaceM),
      margin: EdgeInsets.all(kSpaceS),
      decoration: BoxDecoration(color: ColorResources.WHITE_COLOR),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Text(banner.imageUrl!)
          SizedBox(
            height: 80,
            child: CachedImage(
              identifier: '$APP_NAME-banner-${banner.id!}',
              placeHolder: AssetImg.restaurant,
              url: banner.imageUrl!,
              fit: BoxFit.fill,
            ),
          ),
          SizedBox(
            width: kSpaceS,
          ),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                DecoratedBox(
                  decoration: BoxDecoration(
                      color: ColorResources.SECONDARY_APP_COLOR,
                      borderRadius: BorderRadius.circular(kSpaceS)),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                        vertical: kSpaceS / 3, horizontal: kSpaceS),
                    child: Text(
                      banner.title!,
                      style: AppStyle.poppinsBold(
                          color: ColorResources.WHITE_COLOR),
                    ),
                  ),
                ),
                SizedBox(
                  height: kSpaceS,
                ),
                Text(
                  banner.description!,
                  maxLines: 4,
                  softWrap: true,
                  overflow: TextOverflow.visible,
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
