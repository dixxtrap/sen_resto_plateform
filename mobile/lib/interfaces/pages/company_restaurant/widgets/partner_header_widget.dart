import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/cores/model/company.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/assets_img.dart';
import 'package:mobile/utils/helper/cached_img.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/style.dart';

class PartnerHeaderWidget extends StatelessWidget {
  const PartnerHeaderWidget({Key? key, required this.partner})
      : super(key: key);
  final Company partner;
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(kSpaceM),
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Text(
              partner.shortname!,
              style: AppStyle.poppinsBold(fontSize: 28),
            ),
            Text(
              partner.name!,
              style: AppStyle.poppinsRegular(
                  fontSize: 10, color: ColorResources.BLACK47_COLOR),
            ),
            const SizedBox(
              height: kSpaceM * 2,
            ),
            Row(
              children: [
                SizedBox(
                  width: 120,
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(kSpaceS),
                    child: CachedImage(
                        identifier: '$APP_NAME-$COMPANY_TYPE-${partner.id}',
                        placeHolder: AssetImg.plat,
                        url: partner.imagePath!),
                  ),
                ),
                const SizedBox(
                  width: kSpaceM,
                ),
                Expanded(
                    child: Text(
                  partner.description!,
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                  style: AppStyle.poppinsRegular(
                      fontSize: 13, color: ColorResources.BLACK47_COLOR),
                ))
              ],
            ),
            const SizedBox(
              height: kSpaceM * 2,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: kSpaceM, vertical: kSpaceS),
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(kSpaceS),
                      color:
                          ColorResources.SECONDARY_APP_COLOR.withOpacity(.4)),
                  child: Row(
                    children: [
                      const Icon(
                        CupertinoIcons.phone_fill,
                        size: kSpaceS * 2,
                      ),
                      const SizedBox(
                        width: kSpaceS,
                      ),
                      Text(
                        partner.phone!,
                        style: AppStyle.poppinsSemiBold(
                            color: ColorResources.BLACK_COLOR),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: kSpaceM, vertical: kSpaceS),
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(kSpaceS),
                      color: ColorResources.PRIMARY_APP_COLOR.withOpacity(.4)),
                  child: Row(
                    children: [
                      const Icon(
                        CupertinoIcons.calendar,
                        size: kSpaceS * 2,
                      ),
                      const SizedBox(
                        width: kSpaceS,
                      ),
                      Text(
                        '${partner.openingTime!.substring(0, 5)!}/${partner.closingTime!.substring(0, 5)!}',
                        style: AppStyle.poppinsSemiBold(
                            color: ColorResources.BLACK_COLOR),
                      ),
                    ],
                  ),
                )
              ],
            )
          ]),
    );
  }
}
